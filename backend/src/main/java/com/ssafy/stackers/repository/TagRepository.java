package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findById(Long id);
}
