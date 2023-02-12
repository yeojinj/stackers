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
    // 댓글 정보
    private List<CommentDetailDto> comments;
    private int commentCnt;
    // 연주자 관련 정보
    private List<MusicianDto> musicians;
    // 팔로잉 여부 정보
    private boolean isFollowing;
    // 좋아요 여부 정보
    private boolean isHeart;

    public StationDetailDto(Long id, StationDto stationInfo, LocalDateTime regTime, String videoPath,
                            LoginMemberDto writer, int commentCnt, List<CommentDetailDto> comments,
                            List<MusicianDto> musicians, boolean isFollowing, boolean isHeart) {
        this.id = id;
        this.stationInfo = stationInfo;
        this.regTime = regTime;
        this.videoPath = videoPath;
        this.writer = writer;
        this.commentCnt = commentCnt;
        this.comments = comments;
        this.musicians = musicians;
        this.isFollowing = isFollowing;
        this.isHeart = isHeart;
    }
}
