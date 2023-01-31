package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Video;
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
    public void saveWithMember(Station station, Video video) {
        Station s = Station.builder().content(station.getContent()).music(station.getMusic())
            .regTime(station.getRegTime()).remainDepth(3).isPublic(true).video(video).member(new Member()).build();

        stationRepository.save(s);
    }
}
