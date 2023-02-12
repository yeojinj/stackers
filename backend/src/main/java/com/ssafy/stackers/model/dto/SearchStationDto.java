package com.ssafy.stackers.model.dto;

import com.ssafy.stackers.model.Video;
import lombok.Getter;

import java.util.List;

@Getter
public class SearchStationDto {
    private Long id;
    private String content;
    private List<String> tags;
    private Video video;
    private int heartCnt;
    private boolean isComplete;
    private Long writerId;
    private String imgPath;
    private String username;

    public SearchStationDto(Long id, String content, List<String> tags, Video video, int heartCnt, boolean isComplete, Long writerId, String imgPath, String username) {
        this.id = id;
        this.content = content;
        this.tags = tags;
        this.video = video;
        this.heartCnt = heartCnt;
        this.isComplete = isComplete;
        this.writerId = writerId;
        this.imgPath = imgPath;
        this.username = username;
    }
}
