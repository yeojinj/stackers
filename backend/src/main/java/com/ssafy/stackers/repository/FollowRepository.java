package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Video, Long> {


}
