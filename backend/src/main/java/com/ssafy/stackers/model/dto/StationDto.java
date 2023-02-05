package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StationDto {
    private String content;
    private String music;
    private Long instrumentId;
    private int heartCnt;
    private int remainDepth;
    private int isPublic;
    private int isComplete;
    private boolean isDelete;
    private List<String> tags;
    private Long prevStationId;
}
