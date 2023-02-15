package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
public class MusicianDto {

    private Long instrumentId;      // 악기 아이디
    private String instrumentName;  // 악기명
    private String username;    // 연주자 아이디
    private String profileImg;     // 연주자 프로필 사진 경로

    public MusicianDto(Long instrumentId, String instrumentName, String username,
        String profileImg) {
        this.instrumentId = instrumentId;
        this.instrumentName = instrumentName;
        this.username = username;
        this.profileImg = profileImg;
    }
}
