package com.ssafy.stackers.repository;

import com.ssafy.stackers.model.Follow;
import com.ssafy.stackers.model.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    @Modifying
    @Transactional
    void deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);

}
