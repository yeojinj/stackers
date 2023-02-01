package com.ssafy.stackers.model.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class StationDto {
    private String content;
    private String music;
    private Long instrumentId;
    private int heartCnt;
    private int remainDepth;
    private boolean isPublic;
    private boolean isComplete;
    private boolean isDelete;
    private List<String> tags;
}
