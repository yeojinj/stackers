package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.config.jwt.JwtProperties;
import com.ssafy.stackers.model.dto.LoginDto;
import com.ssafy.stackers.model.dto.TokenDto;
import com.ssafy.stackers.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "Auth", description = "인증 관련 API")
@RestController
@RequestMapping("api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletResponse response,
        @RequestBody LoginDto loginDto) {
        TokenDto tokenDto = authService.login(loginDto);
        response.setHeader(JwtProperties.AUTHORIZATION_HEADER,
            tokenDto.getGrantType() + tokenDto.getAccessToken());
        response.setHeader(JwtProperties.REFRESH_HEADER,
            tokenDto.getGrantType() + tokenDto.getRefreshToken());
        return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
    }

    @PostMapping("/accessToken")
    public ResponseEntity<?> reissueAccessToken(HttpServletResponse response,
        HttpServletRequest request) {

        String jwt = resolveToken(request, JwtProperties.AUTHORIZATION_HEADER);
        String refresh = resolveToken(request, JwtProperties.REFRESH_HEADER);
        TokenDto requestTokenDto = TokenDto.builder()
            .accessToken(jwt)
            .refreshToken(refresh).build();

        TokenDto tokenDto = authService.reissueAccessToken(requestTokenDto);
        response.setHeader(JwtProperties.AUTHORIZATION_HEADER,
            tokenDto.getGrantType() + tokenDto.getAccessToken());
        response.setHeader(JwtProperties.REFRESH_HEADER,
            tokenDto.getGrantType() + tokenDto.getRefreshToken());
        return new ResponseEntity<>("access token 재발행 성공", HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal PrincipalDetails principal,
        HttpServletRequest request) {

        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();

        String jwt = resolveToken(request, JwtProperties.AUTHORIZATION_HEADER);
        String refresh = resolveToken(request, JwtProperties.REFRESH_HEADER);

        if (jwt == null || refresh == null) {
            return new ResponseEntity<>("로그아웃 실패.", HttpStatus.BAD_REQUEST);
        }

        logoutValueOperations.set(jwt, jwt);
        logoutValueOperations.set(refresh, refresh);

        log.info("로그아웃 유저 아이디 : '{}'", principal.getUsername());
        return new ResponseEntity<>("로그아웃 성공.", HttpStatus.OK);
    }

    private String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if (bearerToken != null && bearerToken.startsWith(JwtProperties.TOKEN_PREFIX)) {
            return bearerToken.substring(JwtProperties.TOKEN_PREFIX.length());
        }
        return null;
    }

}
