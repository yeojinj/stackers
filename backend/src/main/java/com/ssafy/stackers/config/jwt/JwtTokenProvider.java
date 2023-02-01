package com.ssafy.stackers.config.jwt;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.RefreshToken;
import com.ssafy.stackers.model.TokenInfo;
import com.ssafy.stackers.repository.RefreshTokenRepository;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@NoArgsConstructor
public class JwtTokenProvider implements InitializingBean {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private String secretKey = "djflksd58324rjewf32irje fdger iretjg eriukjre i fkdzx";
    private long tokenValidityInMs = 30 * 1000;
    private long refreshTokenValidityInMs = 300 * 1000;

    public JwtTokenProvider(
        RefreshTokenRepository refreshTokenRepository) {
        this.secretKey = "djflksd58324rjewf32irje fdger iretjg eriukjre i fkdzx";//secretKey;
        this.tokenValidityInMs = 30 * 1000;
        this.refreshTokenValidityInMs = 3000000 * 1000;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception {  // init()
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        key = Keys.hmacShaKeyFor(encodedKey.getBytes());
        // https://budnamu.tistory.com/entry/JWT 참고
    }

    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityInMs);

        return Jwts.builder()
            .setSubject(authentication.getName())
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
//
//    public Authentication getAuthentication(String token) {
//        Claims claims = Jwts.parserBuilder()
//            .setSigningKey(key)
//            .build()
//            .parseClaimsJws(token)
//            .getBody();
//
//        UserDetails userDetails = memberService.loadUserByUsername(claims.getSubject());
//        return new UsernamePasswordAuthenticationToken(userDetails, token,
//            userDetails.getAuthorities());
//    }

    public JwtCode validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtCode.ACCESS;
        } catch (ExpiredJwtException e) {
            // 만료된 경우에는 refresh token을 확인하기 위해
            return JwtCode.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("jwtException : {}", e);
        }
        return JwtCode.DENIED;
    }

    @Transactional
    public String reissueRefreshToken(String refreshToken) throws RuntimeException {
        // refresh token을 디비의 그것과 비교해보기
        Authentication authentication = getAuthentication(refreshToken);
        RefreshToken findRefreshToken = refreshTokenRepository.findByUserId(
                authentication.getName())
            .orElseThrow(() -> new UsernameNotFoundException(
                "userId : " + authentication.getName() + " was not found"));

        if (findRefreshToken.getToken().equals(refreshToken)) {
            // 새로운거 생성
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


    public static enum JwtCode {
        DENIED,
        ACCESS,
        EXPIRED;
    }

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
        RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        System.out.println(secretKey);
//        this.key = Keys.hmacShaKeyFor(keyBytes);
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        this.key = Keys.hmacShaKeyFor(encodedKey.getBytes());
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    public TokenInfo generateToken(Authentication authentication) {
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + 100000);// 86400000);
        String accessToken = Jwts.builder()
            .setSubject(authentication.getName())
            .claim("auth", authorities)
            .setExpiration(accessTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
            .setExpiration(new Date(now + 1000000)) //86400000))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        return TokenInfo.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }


    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String token) {
        System.out.println("!!!!!!!!!!!!!!!!!!!");
        System.out.println(token);
        // 토큰 복호화
//        Claims claims = parseClaims(accessToken);

//        if (claims.get("auth") == null) {
//            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
//        }

        // 클레임에서 권한 정보 가져오기
//        String authority = claims.get("auth").toString();

        System.out.println(token);
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();

        PrincipalDetails principalDetails = new PrincipalDetails(
            Member.builder().username(claims.getSubject()).roles("ROLE_USER").build());
        return new UsernamePasswordAuthenticationToken(principalDetails, null,
            principalDetails.getAuthorities());
    }

    // 토큰 정보를 검증하는 메서드
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//            return true;
//        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//            log.info("Invalid JWT Token", e);
//            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
//        } catch (ExpiredJwtException e) {
//            log.info("Expired JWT Token", e);
//            throw new CustomException(ErrorCode.EXPIRED_AUTH_TOKEN);
//        } catch (UnsupportedJwtException e) {
//            log.info("Unsupported JWT Token", e);
//        } catch (IllegalArgumentException e) {
//            log.info("JWT claims string is empty.", e);
//        }
//        return false;
//    }
//

//    private Claims parseClaims(String accessToken) {
//        try {
//            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken)
//                .getBody();
//        } catch (ExpiredJwtException e) {
//            return e.getClaims();
//        }
//    }
}

