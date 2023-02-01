package com.ssafy.stackers.service;

import com.ssafy.stackers.config.jwt.JwtTokenProvider;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.RefreshToken;
import com.ssafy.stackers.model.TokenInfo;
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
    public TokenInfo login(String memberId, String password) {
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            memberId, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = new TokenInfo("Bearer",
            jwtTokenProvider.createAccessToken(authentication),
            jwtTokenProvider.issueRefreshToken(authentication));

        return tokenInfo;
    }

    @Transactional
    public void userJoin(Member member) {
        Member m = Member.builder().username(member.getUsername())
            .password(bCryptPasswordEncoder.encode(member.getPassword()))
            .roles("ROLE_USER").build();
        memberRepository.save(m);
    }

    @Transactional(readOnly = true)
    public void checkUsernameDuplication(Member member) {
        boolean usernameDuplicate = memberRepository.existsByUsername(member.getUsername());
        if (usernameDuplicate) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
        }
    }


    @Transactional(readOnly = true)
    public TokenInfo reissueAccessToken(String token) {

        //token 앞에 "Bearer-" 제거
        String resolveToken = resolveToken(token);

        //토큰 검증 메서드
        //실패시 jwtTokenProvider.validateToken(resolveToken) 에서 exception을 리턴함
        jwtTokenProvider.validateToken(resolveToken);

        Authentication authentication = jwtTokenProvider.getAuthentication(resolveToken);
        // 디비에 있는게 맞는지 확인
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(
            authentication.getName()).get();
        System.out.println(refreshToken);

        // 토큰이 같은지 확인
        if (!resolveToken.equals(refreshToken.getToken())) {
            throw new RuntimeException("not equals refresh token");
        }

        // 재발행해서 저장
        String newToken = jwtTokenProvider.createRefreshToken(authentication);
        RefreshToken newRefreshToken = RefreshToken.createToken(authentication.getName(),
            newToken);
        refreshTokenRepository.save(newRefreshToken);

        // accessToken과 refreshToken 모두 재발행
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = new TokenInfo("Bearer",
            jwtTokenProvider.createAccessToken(authentication),
            jwtTokenProvider.issueRefreshToken(authentication));

        return tokenInfo;
    }

    //token 앞에 "Bearer-" 제거
    private String resolveToken(String token) {
        System.out.println(token);
        if (token.startsWith("Bearer-")) {
            return token.substring(7);
        }
        throw new RuntimeException("not valid refresh token !!");
    }
}
