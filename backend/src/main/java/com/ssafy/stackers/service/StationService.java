package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.model.dto.StationDto;
import com.ssafy.stackers.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    @Transactional
    public Long save(StationDto station, Video video, Member member, Instrument instrument) {
        Station s = Station.builder()
            .content(station.getContent())
            .music(station.getMusic())
            .heartCnt(0)
            .remainDepth(3)
            .isPublic(true)
            .member(member)
            .video(video)
            .instrument(instrument)
            .build();

        stationRepository.save(s);
        return s.getId();
    }

    public Station findById(Long id) {
        return stationRepository.findById(id).get();
    }

}
