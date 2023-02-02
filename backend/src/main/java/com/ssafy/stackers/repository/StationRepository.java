package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Station;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    Optional<Station> findById(Long id);

    @Override
    boolean existsById(Long id);
}
