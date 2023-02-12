package com.ssafy.stackers.model.dto;

import com.ssafy.stackers.model.Video;
import lombok.Getter;

import java.util.List;

@Getter
public class FollowersStationDto {
    private Long id;
    private String content;
    private List<String> tags;
    private Video video;
    private Long writerId;
    private String imgPath;
    private String username;

    public FollowersStationDto(Long id, String content, List<String> tags, Video video,
                               Long writerId, String imgPath, String username) {
        this.id = id;
        this.content = content;
        this.tags = tags;
        this.video = video;
        this.writerId = writerId;
        this.imgPath = imgPath;
        this.username = username;
    }
}
