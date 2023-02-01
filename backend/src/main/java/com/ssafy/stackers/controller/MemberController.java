package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Member;
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
    public TokenDto login(@RequestBody Member member) {
        String memberId = member.getUsername();
        String password = member.getPassword();
        TokenDto tokenDto = memberService.login(memberId, password);
        return tokenDto;
    }

    @PostMapping("join")
    public ResponseEntity<String> join(@RequestBody Member member) {
        memberService.checkUsernameDuplication(member);

        memberService.userJoin(member);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @PostMapping("accessToken")
    public TokenDto reissueAccessToken(@RequestBody Map<String, String> map) {
        TokenDto tokenDto = memberService.reissueAccessToken(map.get("token"));
        return tokenDto;
    }

    // user 권한만 접근 가능
    @GetMapping("/api/v1/user")
    public String user(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    // admin 권한만 접근 가능
    @GetMapping("/api/v1/admin")
    public String admin() {
        return "admin";
    }

}
