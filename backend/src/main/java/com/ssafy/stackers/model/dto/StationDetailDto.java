package com.ssafy.stackers.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class StationDetailDto {
    // 게시글 고유 id
    private Long id;
    private StationDto stationInfo;
    private LocalDateTime regTime;
    private String videoPath;
    // 작성자 관련 정보
    private LoginMemberDto writer;
    private int commentCnt;
    // 댓글 정보
    private List<CommentDetailDto> comments;
    // 연주자 관련 정보
    private List<MusicianDto> musicians;

    public StationDetailDto(Long id, StationDto stationInfo, LocalDateTime regTime, String videoPath,
        int commentCnt, List<CommentDetailDto> comments, List<MusicianDto> musicians, LoginMemberDto writer) {
        this.id = id;
        this.stationInfo = stationInfo;
        this.regTime = regTime;
        this.videoPath = videoPath;
        this.commentCnt = commentCnt;
        this.comments = comments;
        this.musicians = musicians;
        this.writer = writer;
    }
}
