package com.ssafy.stackers.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("RefreshToken")
public class RefreshRedisToken {

    @Id
    private String memberId;
    private String token;

    private RefreshRedisToken(String memberId, String token) {
        this.memberId = memberId;
        this.token = token;
    }

    public static RefreshRedisToken createToken(String memberId, String token) {
        return new RefreshRedisToken(memberId, token);
    }

    public void reissue(String token) {
        this.token = token;
    }

}
