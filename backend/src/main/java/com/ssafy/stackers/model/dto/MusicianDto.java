package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MusicianDto {

    private Long instrumentId;      // 악기 아이디
    private String instrumentName;  // 악기명
    private String musicianUsername;    // 연주자 아이디
    private String musicianImgPath;     // 연주자 프로필 사진 경로
    private String musicianImgName;     // 연주자 프로필 사진 파일명

    public MusicianDto(Long instrumentId, String instrumentName, String musicianUsername,
        String musicianImgPath) {
        this.instrumentId = instrumentId;
        this.instrumentName = instrumentName;
        this.musicianUsername = musicianUsername;
        this.musicianImgPath = musicianImgPath;
    }
}
