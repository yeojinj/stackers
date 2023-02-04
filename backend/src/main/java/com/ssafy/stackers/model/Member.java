package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Member {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, updatable = false, nullable = false, length = 50)
    private String username;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "roles", nullable = false, length = 30)
    private String roles;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Column(name = "email", nullable = false, length = 30)
    private String email;

    @Column(name = "bio", nullable = false, length = 300)
    private String bio;

    @CreatedDate
    @Column(name = "reg_date", updatable = false, nullable = false)
    private LocalDateTime regDate;

    @CreatedDate
    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @Column(name = "img_path", nullable = false)
    private String imgPath;

    @Column(name = "img_name", nullable = false)
    private String imgName;

    @Column(name = "is_resign", nullable = false)
    private boolean isResign;

    public List<String> getRoleList() {
        if (this.roles != null && this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    @Builder
    public Member(Long id, String password, String roles, String username, String nickname,
        String email, String bio, LocalDateTime regDate, LocalDateTime lastLogin, String imgPath,
        boolean isResign) {
        this.id = id;
        this.password = password;
        this.roles = roles;
        this.username = username;
        this.nickname = nickname;
        this.email = email;
        this.bio = bio;
        this.regDate = regDate;
        this.lastLogin = lastLogin;
        this.imgPath = imgPath;
        this.isResign = isResign;
    }

}
