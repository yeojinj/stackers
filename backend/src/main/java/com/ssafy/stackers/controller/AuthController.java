package com.ssafy.stackers.controller;

import com.ssafy.stackers.config.jwt.JwtProperties;
import com.ssafy.stackers.model.dto.LoginDto;
import com.ssafy.stackers.model.dto.TokenDto;
import com.ssafy.stackers.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "Auth", description = "인증 관련 API")
@RestController
@RequestMapping("api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletResponse response,
        @RequestBody LoginDto loginDto) {
        TokenDto tokenDto = authService.login(loginDto);
        response.setHeader(JwtProperties.AUTHORIZATION_HEADER, tokenDto.getAccessToken());
        response.setHeader(JwtProperties.REFRESH_HEADER, tokenDto.getRefreshToken());

//        return new ResponseEntity<>(tokenDto, HttpStatus.OK);
        return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
    }

//    @PostMapping("/accessToken")
//    public TokenDto reissueAccessToken(@RequestBody Map<String, String> map) {
//        TokenDto tokenDto = authService.reissueAccessToken(map.get("token"));
//        return tokenDto;
//    }

}
