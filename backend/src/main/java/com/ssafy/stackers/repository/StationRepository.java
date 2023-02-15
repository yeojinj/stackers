package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    Optional<Station> findById(Long id);
    Optional<Station> findTop1ByMemberAndIsPublicOrderByRegTimeDesc(Member member, boolean isPublic);
    List<Station> findByIsPublicAndIsComplete(boolean isPublic, boolean isComplete);
    List<Station> findByIsPublicAndIsCompleteAndMemberIsNot(boolean isPublic, boolean isComplete, Member member);
    List<Station> findTop10ByIsPublicOrderByHeartCntDescRegTimeAsc(boolean isPublic);
    List<Station> findByIsPublicAndMember(boolean isPublic, Member member);
    List<Station> findByContentContainingOrMusicContainingOrderByHeartCntDesc(String keyword1, String keyword2);
    List<Station> findByMemberAndIsPublic(Member member, boolean isPublic);
    @Override
    boolean existsById(Long id);
}
