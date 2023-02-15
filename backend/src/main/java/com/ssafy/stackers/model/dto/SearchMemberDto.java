package com.ssafy.stackers.model.dto;

import lombok.Getter;

@Getter
public class SearchMemberDto {
    private Long id;
    private String imgPath;
    private String username;
    private String nickname;
    private String teamName;

    public SearchMemberDto(Long id, String imgPath, String username, String nickname, String teamName) {
        this.id = id;
        this.imgPath = imgPath;
        this.username = username;
        this.nickname = nickname;
        this.teamName = teamName;
    }
}
