package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class FollowInfoDto {

    String username;
    String nickname;
    String imgPath;
    String party;

}
