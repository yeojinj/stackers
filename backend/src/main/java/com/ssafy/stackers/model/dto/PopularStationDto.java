package com.ssafy.stackers.model.dto;

import com.ssafy.stackers.model.Video;
import lombok.Getter;

@Getter
public class PopularStationDto {
    private Long id;
    private Video video;
    private int heartCnt;

    public PopularStationDto(Long id, Video video, int heartCnt) {
        this.id = id;
        this.video = video;
        this.heartCnt = heartCnt;
    }
}
