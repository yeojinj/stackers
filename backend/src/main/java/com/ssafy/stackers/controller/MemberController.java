package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.model.dto.LoginDto;
import com.ssafy.stackers.model.dto.LoginMemberDto;
import com.ssafy.stackers.model.dto.TokenDto;
import com.ssafy.stackers.service.MemberService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto loginDto) {
        TokenDto tokenDto = memberService.login(loginDto);
        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
    }

    @PostMapping("join")
    public ResponseEntity<String> join(@RequestBody JoinDto joinDto) {
        memberService.checkUsernameDuplication(joinDto.getUsername());

        memberService.userJoin(joinDto);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @PostMapping("accessToken")
    public TokenDto reissueAccessToken(@RequestBody Map<String, String> map) {
        TokenDto tokenDto = memberService.reissueAccessToken(map.get("token"));
        return tokenDto;
    }

    // user 권한만 접근 가능
    @GetMapping("/api/v1/user")
    public ResponseEntity<LoginMemberDto> user(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Member member = memberService.findByUsername(principal.getUsername());
        LoginMemberDto loginMemberDto =
            LoginMemberDto.builder().username(member.getUsername())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .bio(member.getBio())
                .imgPath(member.getImgPath())
                .build();
        System.out.println(loginMemberDto);
        return new ResponseEntity<>(loginMemberDto, HttpStatus.OK);
    }

    // admin 권한만 접근 가능
    @GetMapping("/api/v1/admin")
    public String admin() {
        return "admin";
    }

}
