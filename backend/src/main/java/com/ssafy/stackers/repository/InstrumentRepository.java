package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Instrument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentRepository extends JpaRepository<Instrument, Long> {

}
