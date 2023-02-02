package com.ssafy.stackers.service;

import com.ssafy.stackers.repository.PrevStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PrevStationService {
    @Autowired
    PrevStationRepository prevStationRepository;

}
