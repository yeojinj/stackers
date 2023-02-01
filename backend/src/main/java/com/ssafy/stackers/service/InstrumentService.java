package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.repository.InstrumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class InstrumentService {
    @Autowired
    private InstrumentRepository instrumentRepository;

    @Transactional
    public void save(Instrument instrument){
        Instrument i = Instrument.builder().name(instrument.getName()).build();
        instrumentRepository.save(i);
    }

    public Instrument findById(Long id){
        return instrumentRepository.findById(id).get();
    }

}
