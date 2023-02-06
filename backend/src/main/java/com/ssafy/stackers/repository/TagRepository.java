package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Tag;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findById(Long id);
    boolean existsByName(String name);
    Optional<Tag> findByName(String s);
}
