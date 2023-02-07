package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.PartyMember;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface PartyMemberRepository extends JpaRepository<PartyMember, Long> {

    boolean existsByMemberIdAndPartyId(Long memberId, Long partyId);

    @Modifying
    @Transactional
    void deleteByMemberIdAndPartyId(Long memberId, Long partyId);

    List<PartyMember> findByMemberId(Long memberId);

}
