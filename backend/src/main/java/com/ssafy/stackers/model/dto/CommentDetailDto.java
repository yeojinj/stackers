package com.ssafy.stackers.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetailDto {

    private String commenterUsername;   // 댓글 작성자 아이디
    private String commenterImgPath;    // 댓글 작성자 프사
    private String commentContent;      // 댓글 내용
    private LocalDateTime commentRegTime;        // 댓글 작성 날짜

}
