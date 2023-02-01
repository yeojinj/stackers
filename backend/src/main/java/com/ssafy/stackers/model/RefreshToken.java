package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "refresh_token_id")
    private Long id; // userId

    private String userId;
    private String token;


    private RefreshToken(String id, String token) {
        userId = id;
        this.token = token;
    }

    public static RefreshToken createToken(String userId, String token) {
        return new RefreshToken(userId, token);
    }

    public void changeToken(String token) {
        this.token = token;
    }
}
