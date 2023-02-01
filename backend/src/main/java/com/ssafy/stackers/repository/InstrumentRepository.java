package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Instrument;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepository extends JpaRepository<Instrument, Long> {
    Optional<Instrument> findById(Long id);
}