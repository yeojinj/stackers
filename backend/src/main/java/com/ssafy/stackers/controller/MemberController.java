package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.model.dto.ChangePasswordDto;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.model.dto.LoginMemberDto;
import com.ssafy.stackers.model.dto.MemberModifyDto;
import com.ssafy.stackers.model.dto.UserInfoDto;
import com.ssafy.stackers.service.FollowService;
import com.ssafy.stackers.service.InstrumentService;
import com.ssafy.stackers.service.MemberService;
import com.ssafy.stackers.service.PartyMemberService;
import com.ssafy.stackers.service.PartyService;
import com.ssafy.stackers.service.PlayableInstrumentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Tag(name = "Member", description = "멤버 관련 API")
@RestController
@RequestMapping("api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private InstrumentService instrumentService;
    @Autowired
    private PartyService partyService;
    @Autowired
    private PlayableInstrumentService playableInstrumentService;
    @Autowired
    private PartyMemberService partyMemberService;
    @Autowired
    private FollowService followService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody @Valid JoinDto joinDto) {
        memberService.checkUsernameDuplication(joinDto.getUsername());
        memberService.userJoin(joinDto);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        return new ResponseEntity<>(memberService.isValidUsername(username),
            HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody @Valid ChangePasswordDto changePasswordDto,
                                            @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        memberService.setNewPassword(member.getUsername(), changePasswordDto.getPassword());
        return new ResponseEntity<>("비밀번호 변경 완료", HttpStatus.OK);
    }

    // user 권한만 접근 가능
    @GetMapping("/user")
    public ResponseEntity<?> user(
            @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        LoginMemberDto loginMemberDto = LoginMemberDto.builder()
                .username(member.getUsername())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .bio(member.getBio())
                .imgPath(member.getImgPath())
                .instruments(playableInstrumentService.getInstruments(member.getId()))
                .party(partyMemberService.getParty(member.getId()))
                .build();
        return new ResponseEntity<>(loginMemberDto, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserInfo(@PathVariable String username) {
        Member member = memberService.getLoginMember(username);
        UserInfoDto loginMemberDto = UserInfoDto.builder()
            .username(member.getUsername())
            .nickname(member.getNickname())
            .email(member.getEmail())
            .bio(member.getBio())
            .imgPath(member.getImgPath())
            .instruments(playableInstrumentService.getInstruments(member.getId()))
            .party(partyMemberService.getParty(member.getId()))
            .followingCnt(followService.countByFollowingId(member.getId()))
            .followerCnt(followService.countByFollowerId(member.getId()))
            .build();
        return new ResponseEntity<>(loginMemberDto, HttpStatus.OK);
    }

    /**
     * 프로필 수정 : user 권한만 접근 가능
     */
    @PostMapping(path = "/user", consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> upadateUser(
            @RequestPart(value = "info", required = false) MemberModifyDto memberModifyDto,
            @RequestPart(value = "profile", required = false) MultipartFile file,
            @AuthenticationPrincipal PrincipalDetails principal) throws Exception {
        Member member = memberService.getLoginMember(principal.getUsername());
        // 바이오, 이름, 사진 업데이트
        memberService.updateMember(member.getUsername(), memberModifyDto, file);

        // 연주 악기 삭제 -> 새로운 연주 악기 등록
        playableInstrumentService.deleteByMemberId(member);
        for (String instrumentName: memberModifyDto.getInstruments()) {
            Instrument instrument = instrumentService.addInstrument(instrumentName);
            playableInstrumentService.save(member, instrument);
        }

        // 소속 팀 삭제 -> 새로운 팀 등록
        partyMemberService.deleteByMemberId(member);
        Party party = partyService.addPartyOrReturn(memberModifyDto.getParty());
        partyMemberService.save(member, party);

        return new ResponseEntity<>("멤버 수정 완료", HttpStatus.OK);
    }

    // admin 권한만 접근 가능
    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

}
