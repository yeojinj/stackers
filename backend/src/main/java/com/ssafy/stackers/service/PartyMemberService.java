package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.PartyMember;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.repository.PartyMemberRepository;
import com.ssafy.stackers.repository.PartyRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PartyMemberService {

    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private PartyMemberRepository partyMemberRepository;

    @Transactional
    public void save(Member member, Party party) {
        PartyMember partyMember =
            PartyMember.builder()
                .member(member)
                .party(party)
                .build();
        partyMemberRepository.save(partyMember);
    }

    @Transactional
    public void delete(Member member, Party party) {
        if (!partyMemberRepository.existsByMemberIdAndPartyId(member.getId(),
            party.getId())) {
            throw new CustomException(ErrorCode.ENTITY_NOT_FOUND);
        }
        partyMemberRepository.deleteByMemberIdAndPartyId(member.getId(),
            party.getId());
    }

    public Party findByName(String partyName) {
        Party party = partyRepository.findByName(partyName).orElseThrow(()
            -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));

        return party;
    }

    public List<String> getParties(Long id) {
        List<String> parties =
            partyMemberRepository.findByMemberId(id).stream()
                .map(PartyMember::getParty)
                .map(Party::getName)
                .collect(Collectors.toList());
        return parties;
    }

}
