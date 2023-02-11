package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.repository.InstrumentRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InstrumentService {
    @Autowired
    private InstrumentRepository instrumentRepository;

    @Transactional
    public Instrument save(String instrumentname){
        System.out.println(instrumentname);
        Instrument i = Instrument.builder().name(instrumentname).build();
        instrumentRepository.save(i);
        return i;
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

    public Instrument addInstrument(String name){
       if(instrumentRepository.existsByName(name)){
           return findByName(name);
       }
       return save(name);
    }
}
