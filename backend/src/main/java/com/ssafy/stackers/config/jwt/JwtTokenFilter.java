package com.ssafy.stackers.config.jwt;


import com.ssafy.stackers.config.jwt.JwtTokenProvider.JwtCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String jwt = resolveToken(request, JwtProperties.AUTHORIZATION_HEADER);

        if (jwt != null && jwtTokenProvider.validateToken(jwt) == JwtCode.ACCESS) {     // access token check
            Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("set Authentication to security context for '{}', uri: {}",
                authentication.getName(), request.getRequestURI());
        } else if (jwt != null && jwtTokenProvider.validateToken(jwt) == JwtCode.EXPIRED) {     // refresh token check
            String refresh = resolveToken(request, JwtProperties.REFRESH_HEADER);
            if (refresh != null && jwtTokenProvider.validateToken(refresh) == JwtCode.ACCESS) {
                String newRefresh = jwtTokenProvider.reissueRefreshToken(refresh);
                if (newRefresh != null) {
                    response.setHeader(JwtProperties.REFRESH_HEADER, JwtProperties.TOKEN_PREFIX + newRefresh);

                    Authentication authentication = jwtTokenProvider.getAuthenticationWithNoAuth(refresh);
                    response.setHeader(JwtProperties.AUTHORIZATION_HEADER,
                        JwtProperties.TOKEN_PREFIX + jwtTokenProvider.createAccessToken(authentication));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info("reissue refresh Token & access Token");
                }
            }
        } else {
            log.info("no valid JWT token found, uri: {}", request.getRequestURI());
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if (bearerToken != null && bearerToken.startsWith(JwtProperties.TOKEN_PREFIX)) {
            return bearerToken.substring(JwtProperties.TOKEN_PREFIX.length());
        }
        return null;
    }
}
