package com.ssafy.stackers.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {

        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);

        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null) {//&& jwtTokenProvider.validateToken(token)) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.ssafy.stackers.auth.PrincipalDetails;
//import com.ssafy.stackers.model.Member;
//import com.ssafy.stackers.repository.MemberRepository;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//// 시큐리티가 filter 가지고 있는데 그 필터 중에 BasicAuthenticationFilter라는 것이 있음.
//// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
//// 만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안타요.
//@Slf4j
//public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
//
//    private MemberRepository memberRepository;
//
//    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,
//        MemberRepository memberRepository) {
//        super(authenticationManager);
//        this.memberRepository = memberRepository;
//    }
//
//    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//        FilterChain chain)
//        throws IOException, ServletException {
//        log.info("[JwtAuthorizationFilter] doFilterInternal");
//        String jwtHeader = request.getHeader("Authorization");
//
//        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
//        if (jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
//            chain.doFilter(request, response);
//            return;
//        }
//
//        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
//        String jwtToken = request.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, "");
//
//        String username =
//            JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
//                .getClaim("username")
//                .asString();
//
//        // 서명이 정상적으로 됨
//        if (username != null) {
//            Member memberEntity = memberRepository.findByUsername(username);
//            PrincipalDetails principalDetails = new PrincipalDetails(memberEntity);
//
//            // Jwt 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어준다.
//            Authentication authentication =
//                new UsernamePasswordAuthenticationToken(principalDetails, null,
//                    principalDetails.getAuthorities());
//
//            // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장.
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//
//        chain.doFilter(request, response);
//    }
//
//}
