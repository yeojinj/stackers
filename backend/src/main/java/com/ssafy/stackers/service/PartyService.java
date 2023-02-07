package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.repository.PartyRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PartyService {

    @Autowired
    private PartyRepository partyRepository;

    @Transactional
    public void save(String name){
        if (partyRepository.existsByName(name)) {
            throw new CustomException(ErrorCode.PARTY_ALREADY_EXIST);
        }

        Party party =
            Party.builder()
                .name(name)
                .build();
        partyRepository.save(party);
    }

    @Transactional
    public void delete(String name){
        if (!partyRepository.existsByName(name)) {
            throw new CustomException(ErrorCode.ENTITY_NOT_FOUND);
        }
        partyRepository.deleteByName(name);
    }

}
