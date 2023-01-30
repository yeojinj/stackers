package com.ssafy.stackers.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "content", length = 300, nullable = false)
    private String content;

    @Column(name = "reg_time", nullable = false)
    private LocalDateTime regTime;

    @Column(name = "music")
    private String music;

    @Column(name = "heart_cnt")
    @ColumnDefault("0")
    private int heartCnt;

    @Column(name = "remain_depth")
    @ColumnDefault("4")
    private int remainDepth;

    @Column(name = "is_public")     // default value 설정
    private boolean isPublic;

    @Column(name = "is_complete")
    private boolean isComplete;

    @Column(name = "is_delete")
    private boolean isDelete;

    @ManyToOne    // 스테이션 당 무조건 1명의 writer 만 가짐, column 이름은 어떻게?
    @JoinColumn(name = "writer", referencedColumnName = "id")
    private Member member;

    @OneToOne           // Video는 스테이션 당 무조건 1개
    private Video video;
}
