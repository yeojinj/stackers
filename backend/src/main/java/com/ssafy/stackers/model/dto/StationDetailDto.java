package com.ssafy.stackers.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StationDetailDto {

    private Long id;                // [게시글] 아이디
    private Long writerId;        // [작성자] 회원 번호 o
    private String writerUsername;        // [작성자] 아이디 o
    private String writerNickname;        // [작성자] 닉네임 o
    private String writerImgPath;         // [작성자] 프로필 사진 경로 o
    private String writerImgName;         // [작성자] 프로필 사진 파일명
    private String content;         // [게시글] 설명 x
    private List<String> tags;            // [게시글] 태그 목록 x
    private LocalDateTime regTime;           // [게시글] 게시 시간
    private boolean isPublic;       // [게시글] 공개 여부 x
    private boolean isComplete;     // [게시글] 완성 여부 x
    private boolean isDelete;       // [게시글] 삭제 여부 x
    private int heartCnt;           // [게시글] 좋아요 수 x
    private int remainDepth;        // [게시글] 남은 깊이 x
    private String music;           // [게시글] 곡 제목 x
    private Long leadInstrumentId;      // [게시글] (최종 연주자의) 악기 아이디
    private String leadInstrumentName;  // [게시글] (최종 연주자의) 악기명
    private List<MusicianDto> musicianList;     // [연주자(악기 아이디, 악기명, 연주자 아이디, 연주자 프사)] 목록
    private List<CommentDetailDto> commentList; // [댓글(댓글 작성자 아이디, 댓글 작성자 프사, 내용, 작성 날짜)] 목록
    private int commentCnt;         // [게시글] 댓글 수
    private Long prevStationId;     // [게시글] 이전 게시글 아이디 x

    // TODO: 로그인 한 사람(토큰)과 게시글 작성자 비교해서 본인/팔로우 X/팔로우 O 비교해서 버튼 변경해야 함

}
