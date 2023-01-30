package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "video_path", nullable = false)
    private String videoPath;

    @Column(name = "video_name", nullable = false)
    private String videoName;

    @Column(name = "video_ori_name", nullable = false)
    private String videoOriName;

    @Column(name = "thumbnail_path")
    private String thumbnailPath;
}
