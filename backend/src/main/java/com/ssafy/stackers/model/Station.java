package com.ssafy.stackers.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = 300, nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "reg_time", updatable = false)
    private LocalDateTime regTime;

    @Column(name = "music")
    private String music;

    @Column(name = "heart_cnt")
    @ColumnDefault("0")
    private int heartCnt;

    @Column(name = "remain_depth", updatable = false)
    @ColumnDefault("3")
    private int remainDepth;

    @Column(name = "is_public", updatable = false, columnDefinition = "tinyint(1) default 1")
    private boolean isPublic = true;

    @Column(name = "is_complete", columnDefinition = "tinyint(1) default 0")
    private boolean isComplete = false;

    @Column(name = "is_delete", columnDefinition = "tinyint(1) default 0")
    private boolean isDelete = false;

//    @ManyToOne    // 스테이션 당 무조건 1명의 writer 만 가짐, column 이름은 어떻게?
//    @JoinColumn(name = "writer_id")
//    private Member member;

    @OneToOne(cascade= CascadeType.ALL)   // Video는 스테이션 당 무조건 1개
    @JoinColumn(name = "video_id")
    private Video video;

    @Builder
    public Station(Long id, String content, LocalDateTime regTime, String music, int heartCnt,
        int remainDepth, boolean isPublic, boolean isComplete, boolean isDelete, Member member,
        Video video) {
        this.id = id;
        this.content = content;
        this.regTime = regTime;
        this.music = music;
        this.heartCnt = heartCnt;
        this.remainDepth = remainDepth;
        this.isPublic = isPublic;
        this.isComplete = isComplete;
        this.isDelete = isDelete;
//        this.member = member;
        this.video = video;
    }
}
