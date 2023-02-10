package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UserInfoDto {

    private String username;
    private String nickname;
    private String email;
    private String bio;
    private String imgPath;
    private List<String> instruments;
    private String party;
    private Long followingCnt;
    private Long followerCnt;

}
