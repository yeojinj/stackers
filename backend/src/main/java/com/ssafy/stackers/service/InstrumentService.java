package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.repository.InstrumentRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        Instrument instrument = instrumentRepository.findById(id).orElseThrow(() -> new CustomException(
            ErrorCode.ENTITY_NOT_FOUND));

        return instrument;
    }

    public Instrument findByName(String name){
        Instrument instrument = instrumentRepository.findByName(name).orElseThrow(() -> new CustomException(
            ErrorCode.ENTITY_NOT_FOUND));

        return instrument;
    }

    public List<Instrument> getInstrument(){
        return instrumentRepository.findAll();
    }

}
