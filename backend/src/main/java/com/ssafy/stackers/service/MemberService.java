package com.ssafy.stackers.service;

import com.ssafy.stackers.config.jwt.JwtProperties;
import com.ssafy.stackers.config.jwt.JwtTokenProvider;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.RefreshToken;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.model.dto.LoginDto;
import com.ssafy.stackers.model.dto.TokenDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.repository.RefreshTokenRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MemberService {

    @Autowired
    private final MemberRepository memberRepository = null;
    @Autowired
    private final RefreshTokenRepository refreshTokenRepository = null;
    @Autowired
    private final AuthenticationManagerBuilder authenticationManagerBuilder = null;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider = null;
    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder = null;

    @Transactional
    public void userJoin(JoinDto joinDto) {
        checkUsernameDuplication(joinDto.getUsername());

        Member m = Member.builder().username(joinDto.getUsername())
            .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
            .roles("ROLE_USER")
            .nickname(joinDto.getUsername())
            .email(joinDto.getEmail())
            .bio("")
            .imgPath("path")
            .isResign(false)
            .build();
        memberRepository.save(m);
    }

    @Transactional(readOnly = true)
    public void checkUsernameDuplication(String username) {
        boolean usernameDuplicate = memberRepository.existsByUsername(username);
        if (usernameDuplicate) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
        }
    }

    @Transactional
    public TokenDto login(LoginDto loginDto) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = new TokenDto(
            JwtProperties.TOKEN_PREFIX + jwtTokenProvider.createAccessToken(authentication),
            JwtProperties.TOKEN_PREFIX + jwtTokenProvider.issueRefreshToken(authentication));

        // lastLogin 갱신
        setLastLogin(loginDto.getUsername());

        return tokenDto;
    }

    @Transactional
    public TokenDto reissueAccessToken(String token) {
        String resolveToken = resolveToken(token);

        //토큰 검증 메서드
        //실패시 jwtTokenProvider.validateToken(resolveToken) 에서 exception을 리턴함
        jwtTokenProvider.validateToken(resolveToken);

        Authentication authentication = jwtTokenProvider.getAuthenticationWithNoAuth(resolveToken);
        // 디비에 있는게 맞는지 확인
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(
            authentication.getName()).get();

        // 토큰이 같은지 확인
        if (!resolveToken.equals(refreshToken.getToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 재발행해서 저장
        String newToken = jwtTokenProvider.createRefreshToken(authentication);
        refreshToken.changeToken(newToken);
//        refreshTokenRepository.save(refreshToken);

        // 3. 인증 정보를 기반으로 JWT 토큰
        TokenDto tokenDto = new TokenDto(
            JwtProperties.TOKEN_PREFIX + jwtTokenProvider.createAccessToken(authentication),
            JwtProperties.TOKEN_PREFIX + newToken);

        return tokenDto;
    }

    private String resolveToken(String token) {
        if (token.startsWith(JwtProperties.TOKEN_PREFIX)) {
            return token.substring(JwtProperties.TOKEN_PREFIX.length());
        }
        throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
    }

    public Member findByUsername(String username) {
        return memberRepository.findByUsername(username)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    private void setLastLogin(String username) {
        memberRepository.setLastLogin(username);
    }
}
