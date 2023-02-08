package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.model.dto.LoginMemberDto;
import com.ssafy.stackers.model.dto.MemberModifyDto;
import com.ssafy.stackers.service.InstrumentService;
import com.ssafy.stackers.service.MemberService;
import com.ssafy.stackers.service.PartyMemberService;
import com.ssafy.stackers.service.PlayableInstrumentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private PlayableInstrumentService playableInstrumentService;
    @Autowired
    private PartyMemberService partyMemberService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinDto joinDto) {
        memberService.checkUsernameDuplication(joinDto.getUsername());
        memberService.userJoin(joinDto);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> map,
                                            @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        memberService.setNewPassword(member.getUsername(), map.get("password"));
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
                .parties(partyMemberService.getParties(member.getId()))
                .build();
        return new ResponseEntity<>(loginMemberDto, HttpStatus.OK);
    }

    // user 권한만 접근 가능
    @PutMapping("/user")
    public ResponseEntity<?> upadateUser(@RequestBody MemberModifyDto memberModifyDto,
                                         @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        memberService.updateMember(member.getUsername(), memberModifyDto);
        return new ResponseEntity<>("멤버 수정 완료", HttpStatus.OK);
    }

    // admin 권한만 접근 가능
    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

    @PostMapping("/playable-instrument")
    public ResponseEntity<?> createPlayableInstrument(@RequestBody Map<String, String> map,
                                                      @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        Instrument instrument = instrumentService.findByName(map.get("instrument"));
        playableInstrumentService.save(member, instrument);
        return new ResponseEntity<>("연주 가능 악기 등록 완료", HttpStatus.OK);
    }

    @DeleteMapping("/playable-instrument")
    public ResponseEntity<?> deletePlayableInstrument(@RequestBody Map<String, String> map,
                                                      @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        Instrument instrument = instrumentService.findByName(map.get("instrument"));
        playableInstrumentService.delete(member, instrument);
        return new ResponseEntity<>("연주 가능 악기 삭제 완료", HttpStatus.OK);
    }

    @PostMapping("/party-member")
    public ResponseEntity<?> createPartyMember(@RequestBody Map<String, String> map,
                                               @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        Party party = partyMemberService.findByName(map.get("party"));
        partyMemberService.save(member, party);
        return new ResponseEntity<>("그룹 멤버 등록 완료", HttpStatus.OK);
    }

    @DeleteMapping("/party-member")
    public ResponseEntity<?> deletePartyMember(@RequestBody Map<String, String> map,
                                               @AuthenticationPrincipal PrincipalDetails principal) {
        Member member = memberService.getLoginMember(principal.getUsername());
        Party party = partyMemberService.findByName(map.get("party"));
        partyMemberService.delete(member, party);
        return new ResponseEntity<>("그룹 멤버 삭제 완료", HttpStatus.OK);
    }

}
