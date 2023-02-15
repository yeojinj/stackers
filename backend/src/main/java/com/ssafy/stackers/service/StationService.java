package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.*;
import com.ssafy.stackers.repository.HeartRespository;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.utils.error.ErrorCode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@Transactional(readOnly = true)
public class StationService {

    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private TagService tagService;
    @Autowired
    private TagListService tagListService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private VideoService videoService;
    @Autowired
    private FollowService followService;
    @Autowired
    private HeartRespository heartRespository;

    public Station findById(Long id) {
        stationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return stationRepository.findById(id).get();
    }

    public Station findTop1ByMemberAndIsPublicOrderByRegTimeDesc(Member member, boolean isPublic) {
        return stationRepository.findTop1ByMemberAndIsPublicOrderByRegTimeDesc(member, isPublic).get();
    }

    public boolean existsById(Long id) {
        return stationRepository.existsById(id);
    }

    /**
     * 스테이션 업로드
     */
    @Transactional
    public Station save(StationDto stationDto, MultipartFile file, Member member, Instrument instrument) {
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

        Long prevStationId = s.getPrevStationId();
        String prevPath = null;
        // 이전 스테이션이 있을 경우 해당 스테이션의 비디오 경로 가져오기
        if (prevStationId != -1) {
            Station ps = findById(prevStationId);
            prevPath = ps.getVideo().getVideoPath();
        }

        // 비디오 저장
        Video video = null;
        try {
            video = videoService.uploadVideoToS3(file, stationDto.getVideoName(), s.getPrevStationId(), s.getRemainDepth(), prevPath);
            s.updateVideo(video);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return s;
    }

    /**
     * 스테이션 상세 조회
     */
    public StationDetailDto getStationDetail(Long id, Long loginMemberId) {

        Station s = findById(id);
        StationDto stationInfo = getStationDto(id);

        Member w = s.getMember();
        LoginMemberDto writer = new LoginMemberDto(w.getId(), w.getUsername(), w.getNickname(),
                w.getImgPath());

        List<CommentDetailDto> comments = commentService.getComments(s);
        List<MusicianDto> musicians = getMusicians(s);

        boolean isFollowing = followService.isFollowing(loginMemberId, w.getId());
        boolean isHeart = heartRespository.existsByStation_IdAndMember_Id(s.getId(), loginMemberId);

        return new StationDetailDto(id, stationInfo, s.getRegTime(), s.getVideo().getVideoPath(),
                writer, comments.size(), comments,
                musicians, isFollowing, isHeart);
    }

    /**
     * StationDto 추출 함수
     */
    public StationDto getStationDto(Long id) {
        Station s = findById(id);
        List<String> tags = tagService.findNameById(tagListService.findByStation(s));
        return new StationDto(s.getContent(), s.getMusic(), s.getHeartCnt(), s.getRemainDepth(),
                s.isPublic() ? 1 : 0, s.isComplete() ? 1 : 0, s.isComplete(), tags,
                s.getPrevStationId(), s.getVideo().getVideoName());
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

    public List<Station> findByMemberAndIsPublic(Member member, boolean isPublic){
        return stationRepository.findByMemberAndIsPublic(member, isPublic);
    }

    /**
     * Station List를 MainStationDto List로 변환하는 함수
     */
    public List<MainStationDto> getMainStationList(List<Station> stations) {
        List<MainStationDto> stationList = new ArrayList<>();

        for (int i = 0; i < stations.size(); i++) {
            Station s = stations.get(i);
            List<String> tags = tagService.findNameById(tagListService.findByStation(s));
            stationList.add(new MainStationDto(s.getId(), s.getContent(), tags, s.getVideo()));
        }
        return stationList;
    }

    /**
     * Station List를 PopularStationDto List로 변환하는 함수
     */

    public List<PopularStationDto> getPopularStationList(List<Station> stations) {
        List<PopularStationDto> stationList = new ArrayList<>();

        for (int i = 0; i < stations.size(); i++) {
            Station s = stations.get(i);
            stationList.add(new PopularStationDto(s.getId(), s.getVideo(), s.getHeartCnt()));
        }
        return stationList;
    }

    /**
     * 로그인 된 회원이 팔로우하는 가장 최근의 스테이션 리스트 가져오기
     */
    public List<FollowersStationDto> getFollowersStation(Long id) {
        List<FollowersStationDto> stationList = new ArrayList<>();
        List<FollowInfoDto> followings = followService.getFollowingList(id);

        log.info(String.valueOf(followings.size()));

        for (int i = 0; i < followings.size(); i++) {
            Member m = memberService.findByUsername(followings.get(i).getUsername());
            try {
                Station s = findTop1ByMemberAndIsPublicOrderByRegTimeDesc(m, true);
                List<String> tags = tagService.findNameById(tagListService.findByStation(s));
                stationList.add(new FollowersStationDto(s.getId(), s.getContent(), tags, s.getVideo(),
                        s.getMember().getId(), s.getMember().getImgPath(), s.getMember().getUsername()));
            } catch (Exception e) {

            }
        }
        return stationList;
    }

    /**
     * 연주자 목록 추출 메서드
     */
    public List<MusicianDto> getMusicians(Station start) {
        List<MusicianDto> musicians = new ArrayList<>();
        while (true) {
            Member m = start.getMember();
            musicians.add(new MusicianDto(start.getInstrument().getId(), start.getInstrument().getName(), m.getUsername(), m.getImgPath()));

            if (start.getPrevStationId() == -1) break;
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
