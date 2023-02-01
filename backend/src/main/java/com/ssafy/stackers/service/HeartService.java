package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Heart;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.repository.HeartRespository;
import com.ssafy.stackers.repository.StationRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional(readOnly = true)
public class HeartService {
    @Autowired
    private HeartRespository heartRespository;
    @Autowired
    private StationRepository stationRepository;

    @Transactional
    public void save(Heart heart){
        heartRespository.save(heart);
    }

    @Transactional
    public void update(final Long id, int heartCnt){
        Station station = stationRepository.findById(id).orElseThrow(() -> new CustomException(
            ErrorCode.ENTITY_NOT_FOUND));
        station.updateHeart(heartCnt + 1);
    }

}
