package com.ssafy.stackers.config.jwt;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.RefreshToken;
import com.ssafy.stackers.repository.RefreshTokenRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@NoArgsConstructor
public class JwtTokenProvider implements InitializingBean {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private final long tokenValidityInMs = 1000 * 60 * 5;
    private final long refreshTokenValidityInMs = 1000 * 60 * 30;

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception {
        String encodedKey = Base64.getEncoder().encodeToString(JwtProperties.SECRET.getBytes());
        key = Keys.hmacShaKeyFor(encodedKey.getBytes());
    }

    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityInMs);

        String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

        return Jwts.builder()
            .setSubject(authentication.getName())
            .claim("auth", authorities)
            .setIssuedAt(now) // 발행시간
            .signWith(key, SignatureAlgorithm.HS512) // 암호화
            .setExpiration(validity) // 만료
            .compact();
    }

    public String createRefreshToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidityInMs);

        return Jwts.builder()
            .setSubject(authentication.getName())
            .setIssuedAt(now)
            .signWith(key, SignatureAlgorithm.HS512)
            .setExpiration(validity)
            .compact();
    }

    @Transactional
    public String reissueRefreshToken(String refreshToken) throws RuntimeException {
        Authentication authentication = getAuthentication(refreshToken);

        RefreshToken findRefreshToken = refreshTokenRepository.findByUserId(
                authentication.getName())
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if (findRefreshToken.getToken().equals(refreshToken)) {
            String newRefreshToken = createRefreshToken(authentication);
            findRefreshToken.changeToken(newRefreshToken);
            return newRefreshToken;
        } else {
            log.info("refresh 토큰이 일치하지 않습니다. ");
            return null;
        }
    }

    @Transactional
    public String issueRefreshToken(Authentication authentication) {
        String newRefreshToken = createRefreshToken(authentication);

        // 기존것이 있다면 바꿔주고, 없다면 만들어줌
        refreshTokenRepository.findByUserId(authentication.getName())
            .ifPresentOrElse(
                r -> {
                    r.changeToken(newRefreshToken);
                    log.info("issueRefreshToken method | change token ");
                },
                () -> {
                    RefreshToken token = RefreshToken.createToken(authentication.getName(),
                        newRefreshToken);
                    log.info(" issueRefreshToken method | save tokenID : {}, token : {}",
                        token.getUserId(), token.getToken());
                    refreshTokenRepository.save(token);
                });

        return newRefreshToken;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

        if (claims.get("auth") == null) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        }

        String authority = claims.get("auth").toString();

        PrincipalDetails principalDetails = new PrincipalDetails(
            Member.builder().username(claims.getSubject()).roles(authority).build());
        return new UsernamePasswordAuthenticationToken(principalDetails, null,
            principalDetails.getAuthorities());
    }

    public Authentication getAuthenticationWithNoAuth(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

        PrincipalDetails principalDetails = new PrincipalDetails(
            Member.builder().username(claims.getSubject()).build());
        return new UsernamePasswordAuthenticationToken(principalDetails, null,
            principalDetails.getAuthorities());
    }

    public JwtCode validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtCode.ACCESS;
        } catch (ExpiredJwtException e) {
            return JwtCode.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("jwtException : {}", e);
        }
        return JwtCode.DENIED;
    }

    public static enum JwtCode {
        DENIED,
        ACCESS,
        EXPIRED;
    }


}

