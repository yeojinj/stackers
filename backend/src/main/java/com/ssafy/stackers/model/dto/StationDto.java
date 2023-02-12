package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.Getter;
import lombok.ToString;

@Getter
public class StationDto {
    private String content;
    private String music;
    private String instrument;
    private int heartCnt;
    private int remainDepth;
    private int isPublic;
    private int isComplete;
    private boolean isDelete;
    private List<String> tags;
    private Long prevStationId;
    private String videoName;

    public StationDto(String content, String music, int heartCnt, int remainDepth, int isPublic,
        int isComplete, boolean isDelete, List<String> tags, Long prevStationId, String videoName) {
        this.content = content;
        this.music = music;
        this.heartCnt = heartCnt;
        this.remainDepth = remainDepth;
        this.isPublic = isPublic;
        this.isComplete = isComplete;
        this.isDelete = isDelete;
        this.tags = tags;
        this.prevStationId = prevStationId;
        this.videoName = videoName;
    }
}
