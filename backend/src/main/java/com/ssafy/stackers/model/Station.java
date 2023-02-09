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

    @Column(name = "prev_station_id", nullable = false)
    private Long prevStationId;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @Column(name = "is_complete", nullable = false)
    private boolean isComplete;

    @Column(name = "is_delete", nullable = false)
    private boolean isDelete = false;

    @ManyToOne(fetch = FetchType.LAZY)    // 스테이션 당 무조건 1명의 writer 만 가짐, column 이름은 어떻게?
    @JoinColumn(name = "writer_id")
    private Member member;

    @OneToOne(cascade = CascadeType.ALL)   // Video는 스테이션 당 무조건 1개
    @JoinColumn(name = "video_id")
    private Video video;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instrument_id")
    private Instrument instrument;

    @Builder
    public Station(String content, String music, int heartCnt, int remainDepth, Long prevStationId, boolean isPublic,
        boolean isComplete, boolean isDelete, Member member, Video video, Instrument instrument) {
        this.content = content;
        this.music = music;
        this.heartCnt = heartCnt;
        this.remainDepth = remainDepth;
        this.prevStationId = prevStationId;
        this.isPublic = isPublic;
        this.isComplete = isComplete;
        this.isDelete = isDelete;
        this.member = member;
        this.video = video;
        this.instrument = instrument;
    }

    public void updateHeart(int heartCnt){
        this.heartCnt = heartCnt;
    }
    public void deleteHeart(int heartCnt) {this.heartCnt = heartCnt;}
    public void updateVideo(Video video){
        this.video = video;
    }
    public void deleteStation(boolean isDelete){
        this.isDelete = isDelete;
    }
}
