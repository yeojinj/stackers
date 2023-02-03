package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Tag;
import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.model.dto.StationDetailDto;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
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
            .heartCnt(0)
            .remainDepth(3)
            .prevStationId((Long) stationDto.getPrevStationId())
            .isPublic(true)
            .member(member)
            .video(video)
            .instrument(instrument)
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
        StationDetailDto stationDetailDto = new StationDetailDto();
        stationRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        // 스테이션 엔티티
        Station station = stationRepository.findById(id).get();

        // 동영상 엔티티

        // 작성자 엔티티

        // 태그 엔티티 -> List<String>

        // 이전 게시글 작성자 -> List<MusicianDto>

        // 이전 게시글 악기 -> List<MusicianDto>

        // 댓글 엔티티 -> List<CommentDetailDto>

        // 댓글 수


        return null;
    }

}
