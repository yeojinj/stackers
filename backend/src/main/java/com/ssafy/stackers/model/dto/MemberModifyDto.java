package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberModifyDto {

    private String nickname;
    private String bio;
    private List<String> instruments;
    private String party;

}
