package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LoginMemberDto {

//    아이디, 닉네임, 이메일, 소개(바이오), 프로필 사진, 악기, 소속

    String username;
    String nickname;
    String email;
    String bio;
    String imgPath;

}
