package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "video_path", nullable = false)
    private String videoPath;

    @Column(name = "video_name")
    private String videoName;

    @Column(name = "video_ori_name", nullable = false)
    private String videoOriName;

    @Column(name = "thumbnail_path")
    private String thumbnailPath;

    @Builder
    public Video(String videoPath, String videoName, String videoOriName,
        String thumbnailPath) {
        this.videoPath = videoPath;
        this.videoName = videoName;
        this.videoOriName = videoOriName;
        this.thumbnailPath = thumbnailPath;
    }

    @Builder
    public Video(String videoPath, String videoOriName, String thumbnailPath) {
        this.videoPath = videoPath;
        this.videoOriName = videoOriName;
        this.thumbnailPath = thumbnailPath;
    }
}
