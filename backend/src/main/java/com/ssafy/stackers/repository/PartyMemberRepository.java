package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.PartyMember;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface PartyMemberRepository extends JpaRepository<PartyMember, Long> {

    boolean existsByMemberId(Long memberId);

    boolean existsByMemberIdAndPartyId(Long memberId, Long partyId);

    @Modifying
    @Transactional
    void deleteByMemberIdAndPartyId(Long memberId, Long partyId);

    Optional<PartyMember> findByMemberId(Long memberId);

    void deleteByMemberId(Long memberId);

}
