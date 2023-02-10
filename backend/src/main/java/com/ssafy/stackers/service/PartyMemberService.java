package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.PartyMember;
import com.ssafy.stackers.model.Party;
import com.ssafy.stackers.repository.PartyMemberRepository;
import com.ssafy.stackers.repository.PartyRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.util.Optional;
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

    public String getParty(Long id) {
        Optional<PartyMember> partyMember = partyMemberRepository.findByMemberId(id);
        if (partyMember.isPresent()) {
            return partyMember.get().getParty().getName();
        }
        return null;
    }

    public void deleteByMemberId(Member member) {
        partyMemberRepository.deleteByMemberId(member.getId());
    }

}
