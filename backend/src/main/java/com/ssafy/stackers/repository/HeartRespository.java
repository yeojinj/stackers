package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Heart;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartRespository extends JpaRepository<Heart, Long> {
    void deleteByStationAndMember(Station station, Member member);

    boolean existsByStation_IdAndMember_Id(Long stationId, Long memberId);
}
