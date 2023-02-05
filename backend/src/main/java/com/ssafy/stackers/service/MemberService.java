package com.ssafy.stackers.service;

import com.ssafy.stackers.auth.PrincipalDetails;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            .imgName("name")
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
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(authenticationToken);

        TokenDto tokenDto = new TokenDto(
            JwtProperties.TOKEN_PREFIX + jwtTokenProvider.createAccessToken(authentication),
            JwtProperties.TOKEN_PREFIX + jwtTokenProvider.issueRefreshToken(authentication));

        setLastLogin(loginDto.getUsername());
        return tokenDto;
    }

    @Transactional
    public TokenDto reissueAccessToken(String token) {
        String resolveToken = resolveToken(token);

        jwtTokenProvider.validateToken(resolveToken);       //토큰 검증

        Authentication authentication = jwtTokenProvider.getAuthenticationWithNoAuth(resolveToken);
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(
            authentication.getName()).get();

        if (!resolveToken.equals(refreshToken.getToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String newToken = jwtTokenProvider.createRefreshToken(authentication);
        refreshToken.changeToken(newToken);

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

    public Member getLoginMember(String loginUsername) throws CustomException {
        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        Member loginMember = memberRepository.findByUsername(loginUsername)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return loginMember;
    }

}
