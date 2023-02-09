package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.MainStationDto;
import com.ssafy.stackers.model.dto.StationDetailDto;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.service.*;
import com.ssafy.stackers.utils.error.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Tag(name = "Station", description = "스테이션 관련 API")
@RestController
@RequestMapping("api/station")
public class StationController {

    @Autowired
    private StationService stationService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private HeartService heartService;

    /**
     * 스테이션 업로드
     */
    @Operation(summary = "스테이션 업로드")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "성공"),
        @ApiResponse(responseCode = "404", description = "포함되어 있는 엔티티를 찾을 수 없음"),
        @ApiResponse(responseCode = "400", description = "잘못된 요청"),
        @ApiResponse(responseCode = "500", description = "서버 오류...마젠타 호출 요청...")
    })
    @Secured("ROLE_USER")
    @PostMapping(path = "/upload", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadStation(
        @RequestPart(value = "info", required = true) StationDto stationDto,
        @RequestPart(value = "file", required = true) MultipartFile file,
        @AuthenticationPrincipal PrincipalDetails principal)
        throws Exception {

        // 이전 스테이션 정보가 있는지 확인
        if (stationDto.getPrevStationId() != -1) {
            if (!stationService.existsById(stationDto.getPrevStationId())) {
                return new ResponseEntity<>("이전 스테이션이 존재하지 않음", HttpStatus.NOT_FOUND);
            }
        }

        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        Member loginMember = null;
        try {
            loginMember = memberService.findByUsername(principal.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.INVALID_AUTH_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 스테이션 저장
        stationService.save(stationDto, file, loginMember);
        return new ResponseEntity<>("스테이션 업로드 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 삭제
     * isDelete = 1로 처리 & S3 비디오 정보 삭제
     */
    @DeleteMapping("/{stationid}")
    public ResponseEntity<?> deleteStation(@PathVariable("stationid") int stationId) throws Exception{
        stationService.deleteStation(stationId);
        return new ResponseEntity<>("스테이션 삭제 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 수정
     */




    /**
     * 완성 컨테이너 조회 로그인이 되지 않았을 경우에는 stackers 로 사용 -> stackers 막아놔야 됨
     */
    @GetMapping("/completed/{username}")
    public List<MainStationDto> getCompletedStation(@PathVariable("username") String username) {
        List<Station> stations = null;

        if (username.trim().equals("stackers")) {
            stations = stationService.findByIsPublicAndIsComplete(true, true);
        } else {
            Member member = memberService.findByUsername(username.trim());
            stations = stationService.findByIsPublicAndIsCompleteAndMember(true, true, member);
        }

        return stationService.getStationShortDetail(stations);
    }

    /**
     * 미완성 컨테이너 조회 로그인이 되지 않았을 경우에는 stackers 로 사용 -> stackers 막아놔야 됨
     */
    @GetMapping("/uncompleted/{username}")
    public List<MainStationDto> getUnCompletedStation(@PathVariable("username") String username) {
        List<Station> stations = null;

        if (username.trim().equals("stackers")) {
            stations = stationService.findByIsPublicAndIsComplete(true, false);
        } else {
            Member member = memberService.findByUsername(username.trim());
            stations = stationService.findByIsPublicAndIsCompleteAndMember(true, false, member);
        }

        return stationService.getStationShortDetail(stations);
    }

    /**
     * 상위 10개 컨테이너 조회
     */
    @GetMapping("/popular")
    public List<MainStationDto> getPopularStation() {
        List<Station> stations = stationService.findTop10Station(true);
        return stationService.getStationShortDetail(stations);
    }

    /**
     * 마이 페이지 공개 스테이션
     */
    @GetMapping("/public")
    public List<MainStationDto> getPublicStation(
        @AuthenticationPrincipal PrincipalDetails principal) {
        List<Station> stations = stationService.findMyStation(true,
            memberService.getLoginMember(principal.getUsername()));
        return stationService.getStationShortDetail(stations);
    }

    /**
     * 마이 페이지 바공개 스테이션
     */
    @GetMapping("/private")
    public List<MainStationDto> getPrivateStation(
        @AuthenticationPrincipal PrincipalDetails principal) {
        List<Station> stations = stationService.findMyStation(false,
            memberService.getLoginMember(principal.getUsername()));
        return stationService.getStationShortDetail(stations);
    }

    /**
     * 스테이션 댓글 달기
     */
    @PostMapping("/{stationid}/comment")
    public ResponseEntity<?> writeComment(@PathVariable("stationid") int stationId,
        @RequestBody Comment comment, @AuthenticationPrincipal PrincipalDetails principal) {
        Station station = stationService.findById((long) stationId);

        Comment saveComment = Comment.builder().content(comment.getContent()).station(station)
            .member(memberService.findByUsername(principal.getUsername())).build();
        commentService.save(saveComment);

        return new ResponseEntity<>("댓글 작성 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 댓글 삭제
     */
    @DeleteMapping("/comment/{commentid}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentid") int commentId) {
        System.out.println();
        if (commentService.delete((long) commentId)) {
            return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("댓글 삭제 실패", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     * 스테이션 좋아요 작성
     */
    @PostMapping("/{stationid}/heart")
    public ResponseEntity<?> writeHeart(@PathVariable("stationid") int stationId,
        @AuthenticationPrincipal PrincipalDetails principal) {
        Station station = stationService.findById((long) stationId);

        Heart saveHeart = Heart.builder().station(station)
            .member(memberService.getLoginMember(principal.getUsername())).build();
        heartService.save(saveHeart);

        // station 좋아요 cnt 업데이트
        heartService.update((long) stationId, station.getHeartCnt());
        return new ResponseEntity<>("좋아요 작성 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 좋아요 삭제
     */
    @DeleteMapping("/{stationid}/heart")
    public ResponseEntity<?> deleteHeart(@PathVariable("stationid") int stationId,
        @AuthenticationPrincipal PrincipalDetails principal) {
        heartService.deleteHeart(stationService.findById((long) stationId),
            memberService.findByUsername(
                principal.getUsername()));
        return new ResponseEntity<>("좋아요 삭제 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 상세 조회 정보
     * @param stationId : 조회할 스테이션 아이디
     * @return
     */
    @GetMapping("/{stationid}")
    public ResponseEntity<StationDetailDto> getStationDetail(@PathVariable("stationid") int stationId){
        StationDetailDto station = stationService.getStationDetail((long) stationId);
        return new ResponseEntity<>(station, HttpStatus.OK);
    }

    /**
     * S3 파일 삭제 테스트 컨트롤러
     */
    @PostMapping("/video/{videoid}")
    public ResponseEntity<?> deleteVideoFromS3(@PathVariable("videoid") int videoId) throws Exception{
        Video video = videoService.findById((long) videoId);
        videoService.deleteVideoFromS3(video.getVideoPath());
        return new ResponseEntity<>("S3 삭제 완료", HttpStatus.OK);
    }
}
