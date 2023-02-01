package com.ssafy.stackers.config.jwt;

public interface JwtProperties {

    String SECRET = "I am very very very very very important key i am top secret"; // 우리 서버만 알고 있는 비밀값
    String TOKEN_PREFIX = "Bearer ";
    String AUTHORIZATION_HEADER = "Authorization";
    String REFRESH_HEADER = "Refresh";

}
