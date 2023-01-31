package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository  extends JpaRepository<Video, Long> {
    Optional<Video> findById(Long id);
}
