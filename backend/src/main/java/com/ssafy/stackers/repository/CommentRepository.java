package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Comment;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByStation(Station station);
    Optional<Comment> findById(Long id);
    void deleteById(Long id);
}
