package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberModifyDto {

    String nickname;
    String bio;
    String imgPath;

}
