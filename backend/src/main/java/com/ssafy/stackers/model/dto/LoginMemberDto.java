package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LoginMemberDto {

//    아이디, 닉네임, 이메일, 소개(바이오), 프로필 사진, 악기, 소속
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String bio;
    private String imgPath;

    public LoginMemberDto(Long id, String username, String nickname, String imgPath) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
        this.imgPath = imgPath;
    }
}
