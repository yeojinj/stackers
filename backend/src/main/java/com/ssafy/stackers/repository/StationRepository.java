package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    Optional<Station> findById(Long id);

    // 로그인 된 회원의 완성 스테이션
    // List<Station> findByPublicAndCompleteAndMemberIsNot(Member loginId);

    // 로그인 안 된 회원의 완성 스테이션
     List<Station> findByIsPublicAndIsComplete(boolean isPublic, boolean isComplete);


    @Override
    boolean existsById(Long id);
}
