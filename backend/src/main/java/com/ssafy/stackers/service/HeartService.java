package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Heart;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.repository.HeartRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HeartService {
    @Autowired
    private HeartRespository heartRespository;
    @Autowired
    private StationService stationService;

    @Transactional
    public void save(Heart heart){
        heartRespository.save(heart);
    }

    @Transactional
    public void update(final Long id, int heartCnt){
        Station station = stationService.findById(id);
        station.updateHeart(heartCnt + 1);
    }

    @Transactional
    public boolean deleteHeart(Station station, Member member){
        try{
            heartRespository.deleteByStationAndMember(station, member);
            Station findStation = stationService.findById(station.getId());
            findStation.deleteHeart(findStation.getHeartCnt() - 1);
            return true;
        } catch (Exception e){
            return false;
        }
    }

}
