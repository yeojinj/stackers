package com.ssafy.stackers.config;

import com.ssafy.stackers.config.jwt.JwtAccessDeniedHandler;
import com.ssafy.stackers.config.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.stackers.config.jwt.JwtSecurityConfig;
import com.ssafy.stackers.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final RedisTemplate redisTemplate;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);       // 내 서버가 응답을 할 때 json을 자바스크립트에서 처리할 수 있게 할지를 설정하는 것
        config.addAllowedOriginPattern("*");    // 모든 ip에 응답을 허용하겠다.
        config.addAllowedHeader("*");           // 모든 header에 응답을 허용하겠다.
        config.addAllowedMethod("*");           // 모든 post, get, put, delete, patch 요청을 허용하겠다.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            /**401, 403 Exception 핸들링 */
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler)
            /**세션 사용하지 않음*/
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            /**JwtSecurityConfig 적용 */
            .and()
            .apply(new JwtSecurityConfig(jwtTokenProvider, redisTemplate))
            /**접근 제한 설정*/
            .and()
            .formLogin().disable()
            .httpBasic().disable()
            .addFilter(corsFilter())
            .authorizeRequests(authroize -> authroize.requestMatchers("/api/member/user/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .requestMatchers("/api/member/admin/**")
                .access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll())
            .build();
    }

}

