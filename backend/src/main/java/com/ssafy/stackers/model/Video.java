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

    @Column(name = "video_path", nullable = false, length = 500)
    private String videoPath;

    @Column(name = "video_name")
    private String videoName;

    @Builder
    public Video(String videoPath, String videoName) {
        this.videoPath = videoPath;
        this.videoName = videoName;
    }
}
