package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.*;
import com.ssafy.stackers.service.*;
import com.ssafy.stackers.utils.error.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Collections;
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
    @Autowired
    private InstrumentService instrumentService;

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

        // 악기 이름이 악기 배열에 없으면 추가, 있으면 기존 아이디 가져오기
        Instrument instrument = instrumentService.addInstrument(stationDto.getInstrument());

        // 스테이션 저장
        stationService.save(stationDto, file, loginMember, instrument);
        return new ResponseEntity<>("스테이션 업로드 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 삭제
     * isDelete = 1로 처리 & S3 비디오 정보 삭제
     */
    @Operation(summary = "스테이션 삭제")
    @DeleteMapping("/{stationid}")
    public ResponseEntity<?> deleteStation(@PathVariable("stationid") int stationId) throws Exception{
        stationService.deleteStation(stationId);
        return new ResponseEntity<>("스테이션 삭제 성공", HttpStatus.OK);
    }

    /**
     * 스테이션 수정 : [가능한 정보] content,
     */

    /**
     * 완성 스테이션 조회
     * 완성 스테이션 조회 로그인이 되지 않았을 경우에는 stackers 로 사용 -> stackers 막아놔야 됨
     */
    @Operation(summary = "완성 스테이션 조회")
    @GetMapping("/completed/{username}")
    public List<MainStationDto> getCompletedStation(@PathVariable("username") String username) {
        List<Station> stations = null;

        if (username.trim().equals("stackers")) {
            stations = stationService.findByIsPublicAndIsComplete(true, true);
        } else {
            Member member = memberService.findByUsername(username.trim());
            stations = stationService.findByIsPublicAndIsCompleteAndMember(true, true, member);
        }

        List<MainStationDto> mainStationList = stationService.getMainStationList(stations);
        Collections.shuffle(mainStationList);
        return mainStationList;
    }

    /**
     * 미완성 스테이션 조회
     * 미완성 스테이션 조회 로그인이 되지 않았을 경우에는 stackers 로 사용 -> stackers 막아놔야 됨
     */
    @Operation(summary = "미완성 스테이션 조회")
    @GetMapping("/uncompleted/{username}")
    public List<MainStationDto> getUnCompletedStation(@PathVariable("username") String username) {
        List<Station> stations = null;

        if (username.trim().equals("stackers")) {
            stations = stationService.findByIsPublicAndIsComplete(true, false);
        } else {
            Member member = memberService.findByUsername(username.trim());
            stations = stationService.findByIsPublicAndIsCompleteAndMember(true, false, member);
        }

        List<MainStationDto> mainStationList = stationService.getMainStationList(stations);
        Collections.shuffle(mainStationList);
        return mainStationList;
    }

    /**
     * 상위 10개 스테이션 조회
     */
    @Operation(summary = "상위 스테이션 조회")
    @GetMapping("/popular")
    public List<PopularStationDto> getPopularStation() {
        List<Station> stations = stationService.findTop10Station(true);
        return stationService.getPopularStationList(stations);
    }

    /**
     * 내가 팔로우한 사람들의 스테이션 리스트 조회
     */
    @GetMapping("/following")
    public List<FollowersStationDto> getFollowersStation(@AuthenticationPrincipal PrincipalDetails principal){
        Member member = memberService.getLoginMember(principal.getUsername());
        List<FollowersStationDto> followersStationList = stationService.getFollowersStation(member.getId());
        Collections.shuffle(followersStationList);
        return followersStationList;
    }

    /**
     * 마이 페이지 공개 스테이션
     */
    @Operation(summary = "마이페이지 공개 스테이션 조회")
    @GetMapping("/public")
    public List<MainStationDto> getPublicStation(
        @AuthenticationPrincipal PrincipalDetails principal) {
        List<Station> stations = stationService.findMyStation(true,
            memberService.getLoginMember(principal.getUsername()));
        return stationService.getMainStationList(stations);
    }

    /**
     * 마이 페이지 비공개 스테이션
     */
    @Operation(summary = "마이페이지 비공개 스테이션 조회")
    @GetMapping("/private")
    public List<MainStationDto> getPrivateStation(
        @AuthenticationPrincipal PrincipalDetails principal) {
        List<Station> stations = stationService.findMyStation(false,
            memberService.getLoginMember(principal.getUsername()));
        return stationService.getMainStationList(stations);
    }

    /**
     * 스테이션 댓글 달기
     */
    @Operation(summary = "스테이션에 댓글 작성")
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
    @Operation(summary = "스테이션에 댓글 삭제")
    @DeleteMapping("/comment/{commentid}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentid") int commentId) {
        if (commentService.delete((long) commentId)) {
            return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("댓글 삭제 실패", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     * 스테이션 좋아요 작성
     */
    @Operation(summary = "스테이션에 좋아요 작성")
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
    @Operation(summary = "스테이션에 좋아요 삭제")
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
     */
    @Operation(summary = "스테이션 상세 조회")
    @GetMapping("/{stationid}")
    public ResponseEntity<StationDetailDto> getStationDetail(@AuthenticationPrincipal PrincipalDetails principal,
                                                             @PathVariable("stationid") int stationId){
        Long loginMemberId = memberService.getLoginMember(principal.getUsername()).getId();
        StationDetailDto station = stationService.getStationDetail((long) stationId, loginMemberId);
        return new ResponseEntity<>(station, HttpStatus.OK);
    }

    @GetMapping("/{username}/public")
    public List<MainStationDto> getOtherPeoplePublic(@PathVariable("username") String username){
        Member member = memberService.findByUsername(username);
        List<Station> stations = stationService.findByMemberAndIsPublic(member, true);
        return stationService.getMainStationList(stations);
    }

    /**
     * S3 파일 삭제 테스트 컨트롤러 - 테스트용
     */
    @PostMapping("/video/{videoid}")
    public ResponseEntity<?> deleteVideoFromS3(@PathVariable("videoid") int videoId) throws Exception{
        Video video = videoService.findById((long) videoId);
        videoService.deleteVideoFromS3(video.getVideoPath());
        return new ResponseEntity<>("S3 삭제 완료", HttpStatus.OK);
    }

}
