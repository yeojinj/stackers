package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Instrument;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.PlayableInstrument;
import com.ssafy.stackers.repository.PlayableInstrumentRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PlayableInstrumentService {

    @Autowired
    private PlayableInstrumentRepository playableInstrumentRepository;

    @Transactional
    public void save(Member member, Instrument instrument) {
        PlayableInstrument playableInstrument =
            PlayableInstrument.builder()
                .member(member)
                .instrument(instrument)
                .build();
        playableInstrumentRepository.save(playableInstrument);
    }

    @Transactional
    public void delete(Member member, Instrument instrument) {
        if (!playableInstrumentRepository.existsByMemberIdAndInstrumentId(member.getId(),
            instrument.getId())) {
            throw new CustomException(ErrorCode.ENTITY_NOT_FOUND);
        }
        playableInstrumentRepository.deleteByMemberIdAndInstrumentId(member.getId(),
            instrument.getId());
    }

    public List<String> getInstruments(Long id) {
        List<String> instruments =
            playableInstrumentRepository.findByMemberId(id).stream()
                .map(PlayableInstrument::getInstrument)
                .map(Instrument::getName)
                .collect(Collectors.toList());
        return instruments;
    }

    public boolean existsByMemberIdAndInstrumentId(Member member, Instrument instrument) {
        return playableInstrumentRepository.existsByMemberIdAndInstrumentId(member.getId(),
            instrument.getId());
    }

    public void deleteByMemberId(Member member) {
        playableInstrumentRepository.deleteByMemberId(member.getId());
    }

}
