package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Follow;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.repository.FollowRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FollowService {

    @Autowired
    private FollowRepository followRepository;
    @Autowired
    private MemberService memberService;

    @Transactional
    public void save(Long followerId, Long followingId){
        if (followerId == followingId) {
            throw new CustomException(ErrorCode.CANNOT_FOLLOW_MYSELF);
        }

        Follow follow =
            Follow.builder()
                .follower(memberService.findById(followerId))
                .following(memberService.findById(followingId))
                .build();
        followRepository.save(follow);
    }

    @Transactional
    public void delete(Long followerId, Long followingId){
        Follow follow =
            Follow.builder()
                .follower(memberService.findById(followerId))
                .following(memberService.findById(followingId))
                .build();

        if (!followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            throw new CustomException(ErrorCode.NOT_FOLLOW);
        }
        followRepository.deleteByFollowerIdAndFollowingId(followerId, followingId);
    }

}
