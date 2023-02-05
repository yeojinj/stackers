package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.*;
import com.ssafy.stackers.model.dto.CommentDetailDto;
import com.ssafy.stackers.model.dto.StationDetailDto;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.CommentRepository;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.repository.VideoRepository;
import com.ssafy.stackers.utils.error.ErrorCode;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StationService {

    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private InstrumentService instrumentService;
    @Autowired
    private TagService tagService;
    @Autowired
    private TagListService tagListService;

    @Transactional
    public Station save(StationDto stationDto, Video video, Member member) {
        // 악기 찾기
        Instrument instrument = instrumentService.findById(stationDto.getInstrumentId());

        // 태그 저장
        List<Tag> tags = tagService.save(stationDto.getTags());

        // 스테이션 DB 저장
        Station s = Station.builder()
                .content(stationDto.getContent())
                .music(stationDto.getMusic())
                .remainDepth(stationDto.getRemainDepth())
                .prevStationId((Long) stationDto.getPrevStationId())
                .isPublic(stationDto.isPublic())
                .member(member)
                .video(video)
                .instrument(instrument)
                .isComplete(stationDto.getRemainDepth() == 0 ? true : false)
                .heartCnt(0)
                .isDelete(false)
                .build();

        stationRepository.save(s);
        tagListService.save(tags, s);

        return s;
    }

    public Station findById(Long id) {
        stationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        return stationRepository.findById(id).get();
    }

    public boolean existsById(Long id) {
        return stationRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public StationDetailDto findDetailById(Long id) {
        stationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        // 스테이션 엔티티, 동영상 엔티티, 작성자 엔티티
        Station station = stationRepository.findById(id).get();

        // 태그 엔티티 -> List<String>
        // TODO : 태그 목록 가져오는 함수 만들기

        // 이전 게시글 작성자(연주자) -> List<MusicianDto>

        // 이전 게시글 악기 -> List<MusicianDto>

        // 댓글 엔티티 List -> List<CommentDetailDto>
        List<Comment> comments = commentRepository.findByStation(station);
        // 댓글 수
        int commentCnt = comments.size();
        List<CommentDetailDto> commentDetails = new ArrayList<>();
        for(int i = 0; i < commentCnt; i++){
            CommentDetailDto commentDetailDto = CommentDetailDto.builder()
                    .commentContent(comments.get(i).getContent())
                    .commentRegTime(comments.get(i).getRegTime())
                    .commenterUsername(comments.get(i).getMember().getUsername())
                    .commenterImgPath(comments.get(i).getMember().getImgPath())
                    .build();

            commentDetails.add(commentDetailDto);
        }

        StationDetailDto stationDetailDto = StationDetailDto.builder()
                .id(station.getId())
                .writerId(station.getMember().getId())
                .writerUsername(station.getMember().getUsername())
                .writerImgPath(station.getMember().getImgPath())
                .writerImgName(station.getMember().getImgName())
                .content(station.getContent())
                .regTime(station.getRegTime())
                .isPublic(station.isPublic())       // 왜 Getter로 접근 안 하는지?
                .isComplete(station.isComplete())
                .isDelete(station.isDelete())
                .heartCnt(station.getHeartCnt())
                .remainDepth(station.getRemainDepth())
                .music(station.getMusic())
                .leadInstrumentId(station.getInstrument().getId())
                .leadInstrumentName(station.getInstrument().getName())
                .prevStationId(station.getPrevStationId())
                // 댓글
                .commentList(commentDetails)
                .commentCnt(commentCnt)
                .build();

        return stationDetailDto;
    }

}
