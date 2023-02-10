package com.ssafy.stackers.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.stackers.model.Video;
import lombok.Getter;

@Getter
public class MainStationDto {
    private Long id;
    private String content;
    private List<String> tags;
    private Video video;

    public MainStationDto(Long id, String content, List<String> tags, Video video) {
        this.id = id;
        this.content = content;
        this.tags = tags;
        this.video = video;
    }
}
