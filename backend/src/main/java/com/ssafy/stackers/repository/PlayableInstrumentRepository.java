package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.PlayableInstrument;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface PlayableInstrumentRepository extends JpaRepository<PlayableInstrument, Long> {

    Optional<PlayableInstrument> findByMemberIdAndInstrumentId(Long memberId, Long instrumentId);

    boolean existsByMemberIdAndInstrumentId(Long memberId, Long instrumentId);

    @Modifying
    @Transactional
    void deleteByMemberIdAndInstrumentId(Long memberId, Long instrumentId);

    @Modifying
    @Transactional
    void deleteByMemberId(Long memberId);

    List<PlayableInstrument> findByMemberId(Long memberId);

}
