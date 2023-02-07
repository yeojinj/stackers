package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Party;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface PartyRepository extends JpaRepository<Party, Long> {

    Optional<Party> findByName(String name);

    boolean existsByName(String name);

    @Modifying
    @Transactional
    void deleteByName(String name);

}
