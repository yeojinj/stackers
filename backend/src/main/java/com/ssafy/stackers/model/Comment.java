package com.ssafy.stackers.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", nullable = false, length = 200)
    private String content;

    @CreatedDate
    @Column(name = "reg_time", updatable = false)
    private LocalDateTime regTime;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station staion;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
