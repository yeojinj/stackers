package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.TokenInfo;
import com.ssafy.stackers.service.MemberService;
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
    public TokenInfo login(@RequestBody Member member) {
        String memberId = member.getUsername();
        String password = member.getPassword();
        TokenInfo tokenInfo = memberService.login(memberId, password);
        return tokenInfo;
    }

    @PostMapping("join")
    public ResponseEntity<String> join(@RequestBody Member member) {
        memberService.checkUsernameDuplication(member);

        memberService.userJoin(member);
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @PostMapping("/api/v1/accessToken")
    public TokenInfo reissueAccessToken(@RequestBody String token) {
        TokenInfo tokenInfo = memberService.reissueAccessToken(token);
        return tokenInfo;
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
