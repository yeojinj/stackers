package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.MainStationDto;
import com.ssafy.stackers.model.dto.StationDetailDto;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.utils.error.ErrorCode;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Station save(StationDto stationDto, Video video, Member member) {
        // 악기 찾기 : 악기가 없을 경우가 있나요?
        Instrument instrument = instrumentService.findById(stationDto.getInstrumentId());

        // 태그 저장
        List<Tag> tags = tagService.save(stationDto.getTags());

        // 스테이션 DB 저장
        Station s = Station.builder()
            .content(stationDto.getContent())
            .music(stationDto.getMusic())
            .remainDepth(stationDto.getRemainDepth())
            .prevStationId((Long) stationDto.getPrevStationId())
            .isPublic(stationDto.isPublic())
            .member(member)
            .video(video)
            .instrument(instrument)
            .isComplete(stationDto.getRemainDepth() == 0? true : false)
            .heartCnt(0)
            .isDelete(false)
            .build();

        stationRepository.save(s);
        tagListService.save(tags, s);

        return s;
    }

    public Station findById(Long id) {
        stationRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return stationRepository.findById(id).get();
    }

    public boolean existsById(Long id) {
        return stationRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public StationDetailDto findDetailById(Long id) {
        StationDetailDto stationDetailDto = new StationDetailDto();
        stationRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        // 스테이션 엔티티
        Station station = stationRepository.findById(id).get();

        // 동영상 엔티티

        // 작성자 엔티티

        // 태그 엔티티 -> List<String>

        // 이전 게시글 작성자 -> List<MusicianDto>

        // 이전 게시글 악기 -> List<MusicianDto>

        // 댓글 엔티티 -> List<CommentDetailDto>

        // 댓글 수


        return null;
    }

    /**
     * 로그인 안 한 회원의 메인 페이지 스테이션 조회
     */
    public List<Station> findByIsPublicAndIsComplete(boolean isPublic, boolean isCompleted){
        return stationRepository.findByIsPublicAndIsComplete(isPublic, isCompleted);
    }

    /**
     * 로그인 한 회원의 메인 페이지 스테이션 조회
     */
    public List<Station> findByIsPublicAndIsCompleteAndMember(boolean isPublic, boolean isCompleted, Member member){
        return stationRepository.findByIsPublicAndIsCompleteAndMemberIsNot(isPublic, isCompleted, member);
    }

    /**
     * 상위 스테이션 조회
     */
    public List<Station> findTop10Station(boolean isPublic){
        return stationRepository.findTop10ByIsPublicOrderByHeartCntDescRegTimeAsc(isPublic);
    }

    /**
     * 마이페이지 리스트 조회
     */
    public List<Station> findMyStation(boolean isPublic, Member member){
        return stationRepository.findByIsPublicAndMember(isPublic, member);
    }

    /**
     * Station을 MainStationDto로 변환하는 함수
     */
    public List<MainStationDto> getStationShortDetail(List<Station> stations){
        List<MainStationDto> stationList = new ArrayList<>();

        for (int i = 0; i < stations.size(); i++) {
            Station s = stations.get(i);
            List<String> tags = tagService.findNameById(tagListService.findByStation(s));
            stationList.add(new MainStationDto(s.getId(), s.getContent(), tags, s.getVideo()));
        }

        return stationList;
    }
}
