package com.ssafy.stackers.service;

import com.ssafy.stackers.config.jwt.JwtTokenProvider;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.RefreshRedisToken;
import com.ssafy.stackers.model.dto.LoginDto;
import com.ssafy.stackers.model.dto.TokenDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.repository.RefreshRedisRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final MemberRepository memberRepository;
    private final RefreshRedisRepository refreshRedisRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @Transactional
    public TokenDto login(LoginDto loginDto) {

        setLastLogin(loginDto.getUsername());

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(authenticationToken);

        TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        RefreshRedisToken newRedisToken = RefreshRedisToken.createToken(authentication.getName(),
            tokenDto.getRefreshToken());
        refreshRedisRepository.save(newRedisToken);

        return tokenDto;
    }

    @Transactional
    public TokenDto reissueAccessToken(TokenDto tokenDto) {

        if (!jwtTokenProvider.validateToken(tokenDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
        Authentication authentication = jwtTokenProvider.getAuthentication(tokenDto.getAccessToken());

        RefreshRedisToken refreshRedisToken = refreshRedisRepository.findById(authentication.getName())
            .orElseThrow(() -> new CustomException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));
        System.out.println(refreshRedisToken.getToken());
        System.out.println(refreshRedisToken.getMemberId());
        if (!refreshRedisToken.getToken().equals(tokenDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.MISMATCH_REFRESH_TOKEN);
        }

        tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(tokenDto.getAccessToken(), tokenDto.getAccessToken());

        RefreshRedisToken newRedisToken = RefreshRedisToken.createToken(authentication.getName(),
            tokenDto.getRefreshToken());
        refreshRedisRepository.save(newRedisToken);

        return tokenDto;
    }

    private void setLastLogin(String username) {
        memberRepository.setLastLogin(username);
    }

}
