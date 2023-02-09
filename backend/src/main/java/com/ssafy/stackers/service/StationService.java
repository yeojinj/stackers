package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.CommentDetailDto;
import com.ssafy.stackers.model.dto.LoginMemberDto;
import com.ssafy.stackers.model.dto.MainStationDto;
import com.ssafy.stackers.model.dto.MusicianDto;
import com.ssafy.stackers.model.dto.StationDetailDto;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.CommentRepository;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.repository.TagListRepository;
import com.ssafy.stackers.utils.error.ErrorCode;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
public class StationService {

    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private InstrumentService instrumentService;
    @Autowired
    private TagService tagService;
    @Autowired
    private TagListService tagListService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private VideoService videoService;

    public Station findById(Long id) {
        stationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return stationRepository.findById(id).get();
    }

    public boolean existsById(Long id) {
        return stationRepository.existsById(id);
    }

    /**
     * 스테이션 업로드
     */
    @Transactional
    public Station save(StationDto stationDto, MultipartFile file, Member member) throws Exception{
        // 악기 찾기
        Instrument instrument = instrumentService.findById(stationDto.getInstrumentId());

        // 태그 저장
        List<Tag> tags = tagService.save(stationDto.getTags());

        // 스테이션 DB 저장
        Station s = Station.builder()
                .content(stationDto.getContent())
                .music(stationDto.getMusic())
                .remainDepth(stationDto.getRemainDepth())
                .prevStationId((Long) stationDto.getPrevStationId())
                .member(member)
                .instrument(instrument)
                .isPublic(stationDto.getIsPublic() == 0 ? false : true)
                .isComplete(
                        stationDto.getRemainDepth() == 0 || stationDto.getIsComplete() == 1 ? true : false)
                .heartCnt(0)
                .isDelete(false)
                .build();

        stationRepository.save(s);
        tagListService.save(tags, s);

        // 비디오 저장
        Video video = videoService.uploadVideoToS3(file, stationDto.getVideoName());
        s.updateVideo(video);

        return s;
    }

    /**
     * 스테이션 상세 조회
     */
    public StationDetailDto getStationDetail(Long id) {

        Station s = findById(id);
        StationDto stationInfo = getStationShortInfo(id);

        Member w = s.getMember();
        LoginMemberDto writer = new LoginMemberDto(w.getId(), w.getUsername(), w.getNickname(),
                w.getImgPath());

        List<CommentDetailDto> comments = commentService.getComments(s);
        List<MusicianDto> musicians = getMusicians(s);

        return new StationDetailDto(id, stationInfo, s.getRegTime(), comments.size(), comments, musicians, writer);
    }

    /**
     * 로그인 안 한 회원의 메인 페이지 스테이션 조회
     */
    public List<Station> findByIsPublicAndIsComplete(boolean isPublic, boolean isCompleted) {
        return stationRepository.findByIsPublicAndIsComplete(isPublic, isCompleted);
    }

    /**
     * 로그인 한 회원의 메인 페이지 스테이션 조회
     */
    public List<Station> findByIsPublicAndIsCompleteAndMember(boolean isPublic, boolean isCompleted,
                                                              Member member) {
        return stationRepository.findByIsPublicAndIsCompleteAndMemberIsNot(isPublic, isCompleted,
                member);
    }

    /**
     * 상위 스테이션 조회
     */
    public List<Station> findTop10Station(boolean isPublic) {
        return stationRepository.findTop10ByIsPublicOrderByHeartCntDescRegTimeAsc(isPublic);
    }

    /**
     * 마이페이지 리스트 조회
     */
    public List<Station> findMyStation(boolean isPublic, Member member) {
        return stationRepository.findByIsPublicAndMember(isPublic, member);
    }

    /**
     * Station을 MainStationDto로 변환하는 함수
     */
    public List<MainStationDto> getStationShortDetail(List<Station> stations) {
        List<MainStationDto> stationList = new ArrayList<>();

        for (int i = 0; i < stations.size(); i++) {
            Station s = stations.get(i);
            List<String> tags = tagService.findNameById(tagListService.findByStation(s));
            stationList.add(new MainStationDto(s.getId(), s.getContent(), tags, s.getVideo()));
        }
        return stationList;
    }

    /**
     * 메인페이지에 뿌릴 dto 변환 함수
     */
    public StationDto getStationShortInfo(Long id) {
        Station s = findById(id);
        List<String> tags = tagService.findNameById(tagListService.findByStation(s));
        return new StationDto(s.getContent(), s.getMusic(), s.getHeartCnt(), s.getRemainDepth(),
                s.isPublic() ? 1 : 0, s.isComplete() ? 1 : 0, s.isComplete(), tags,
                s.getPrevStationId(), s.getVideo().getVideoName());
    }

    /**
     * 연주자 목록 추출 메서드
     */
    public List<MusicianDto> getMusicians(Station start){
        List<MusicianDto> musicians = new ArrayList<>();
        while (true){
            Member m = start.getMember();
            musicians.add(new MusicianDto(start.getInstrument().getId(), start.getInstrument().getName(), m.getUsername(), m.getImgPath()));

            if(start.getPrevStationId() == -1) break;
            start = findById(start.getPrevStationId());
        }
        return musicians;
    }

    @Transactional
    public void deleteStation(int stationId) throws Exception {
        Station station = findById((long) stationId);
        station.deleteStation(true);
        videoService.deleteVideoFromS3(station.getVideo().getVideoPath());
    }
}
