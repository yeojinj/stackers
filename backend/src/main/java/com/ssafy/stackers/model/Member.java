package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 30)
    private Long id;

    @Column(name = "password", nullable = false, length = 30)
    private String password;

    @Column(name = "nickname", nullable = false, length = 30)
    private String nickname;

    @Column(name = "roles", nullable = false, length = 30)
    private String roles;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Column(name = "bio", nullable = false, length = 300)
    private String bio;

    @Column(name = "reg_date", nullable = false)
    private LocalDateTime regDate;

    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @Column(name = "img_path", nullable = false)
    private String imgPath;

    @Column(name = "is_resign")
    private boolean isResign;

    @Builder
    public Member(Long id, String password, String nickname, String roles, String username,
        String email, String bio, LocalDateTime regDate, LocalDateTime lastLogin, String imgPath,
        boolean isResign) {
        this.id = id;
        this.password = password;
        this.nickname = nickname;
        this.roles = roles;
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.regDate = regDate;
        this.lastLogin = lastLogin;
        this.imgPath = imgPath;
        this.isResign = isResign;
    }
}
