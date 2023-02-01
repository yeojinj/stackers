package com.ssafy.stackers.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = 300, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "reg_time", updatable = false, nullable = false)
    private LocalDateTime regTime;

    @Column(name = "music")
    private String music;

    @Column(name = "heart_cnt", nullable = false)
    private int heartCnt;

    @Column(name = "remain_depth", nullable = false)
    private int remainDepth;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic = true;

    @Column(name = "is_complete", nullable = false)
    private boolean isComplete = false;

    @Column(name = "is_delete", nullable = false)
    private boolean isDelete = false;

    @ManyToOne    // 스테이션 당 무조건 1명의 writer 만 가짐, column 이름은 어떻게?
    @JoinColumn(name = "writer_id")
    private Member member;

    @OneToOne(cascade = CascadeType.ALL)   // Video는 스테이션 당 무조건 1개
    @JoinColumn(name = "video_id")
    private Video video;

    @Builder
    public Station(String content, String music, int heartCnt, int remainDepth, boolean isPublic,
        boolean isComplete, boolean isDelete, Member member, Video video) {
        this.content = content;
        this.music = music;
        this.heartCnt = heartCnt;
        this.remainDepth = remainDepth;
        this.isPublic = isPublic;
        this.isComplete = isComplete;
        this.isDelete = isDelete;
        this.member = member;
        this.video = video;
    }
}
