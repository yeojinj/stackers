package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
