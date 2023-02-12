package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LoginMemberDto {

   private Long id;
    private String username;
    private String nickname;
    private String email;
    private String bio;
    private String imgPath;
    private List<String> instruments;
    private String party;

    public LoginMemberDto(Long id, String username, String nickname, String imgPath) {
        this.id = id;
        this.username = username;
        this.nickname = nickname;
        this.imgPath = imgPath;
    }
}
