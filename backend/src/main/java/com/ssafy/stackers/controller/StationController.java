package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Comment;
import com.ssafy.stackers.model.Heart;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.repository.PrevStationRepository;
import com.ssafy.stackers.service.CommentService;
import com.ssafy.stackers.service.HeartService;
import com.ssafy.stackers.service.InstrumentService;
import com.ssafy.stackers.service.PrevStationService;
import com.ssafy.stackers.service.StationService;
import com.ssafy.stackers.service.TagService;
import com.ssafy.stackers.service.VideoService;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("station")
public class StationController {


    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StationService stationService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private HeartService heartService;

    @Secured("ROLE_USER")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadStation(@RequestPart StationDto stationDto,
        @RequestPart(required = true) MultipartFile file, Authentication authentication)
        throws IOException {

        // 이전 스테이션 정보가 있는지 확인
        if(stationDto.getPrevStationId() != -1){
            Station prevStation = stationService.findById(stationDto.getPrevStationId());
            if(prevStation == null){
                return new ResponseEntity<>("이전 스테이션이 존재하지 않음", HttpStatus.NOT_FOUND);
            }
        }

        Member loginMember = null;

        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        try{
            loginMember = testForLoginMember(authentication);
        } catch (CustomException e){
            System.out.println(e.getClass().getName());
            return new ResponseEntity<>(ErrorCode.INVALID_AUTH_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 비디오 저장
        Video video = videoService.uploadVideo(file);
        // 스테이션 저장
        Station uploadedStation = stationService.save(stationDto, video, loginMember);

        // 태그 리스트 저장
        log.info("[스테이션 업로드] 저장된 : {}", uploadedStation);

        return new ResponseEntity<>("스테이션 업로드 성공", HttpStatus.OK);
    }

    @PostMapping("/{stationid}/comment")
    public ResponseEntity<?> writeComment(@PathVariable("stationid") int stationId,
        @RequestBody Comment comment, Authentication authentication) {
        Station station = stationService.findById((long) stationId);

        Comment saveComment = Comment.builder().content(comment.getContent()).station(station)
            .member(testForLoginMember(authentication)).build();
        commentService.save(saveComment);

        log.info("[['{}' 스테이션에 댓글 작성] : {}", station.getContent(), comment.getContent());
        return new ResponseEntity<>("댓글 작성 성공", HttpStatus.OK);
    }

    @PostMapping("/{stationid}/heart")
    public ResponseEntity<?> writeHeart(@PathVariable("stationid") int stationId,
        Authentication authentication) {
        Station station = stationService.findById((long) stationId);

        Heart saveHeart = Heart.builder().station(station)
            .member(testForLoginMember(authentication)).build();

        heartService.save(saveHeart);

        // station 좋아요 cnt 업데이트
        heartService.update((long) stationId, station.getHeartCnt());
        return new ResponseEntity<>("좋아요 작성 성공", HttpStatus.OK);
    }

    public Member testForLoginMember(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String loginUsername = principal.getUsername();

        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        Member loginMember = memberRepository.findByUsername(loginUsername)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return loginMember;
    }


}
