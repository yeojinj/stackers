package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Follow;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.dto.FollowInfoDto;
import com.ssafy.stackers.repository.FollowRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import java.util.List;
import java.util.stream.Collectors;
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
    @Autowired
    private PartyMemberService partyMemberService;

    @Transactional
    public void save(Long followerId, Long followingId) {
        if (followerId == followingId) {
            throw new CustomException(ErrorCode.CANNOT_FOLLOW_MYSELF);
        }

        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            throw new CustomException(ErrorCode.ALREADY_FOLLOWING);
        }

        Follow follow =
            Follow.builder()
                .follower(memberService.findById(followerId))
                .following(memberService.findById(followingId))
                .build();
        followRepository.save(follow);
    }

    @Transactional
    public void delete(Long followerId, Long followingId) {
        if (!followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            throw new CustomException(ErrorCode.NOT_FOLLOW);
        }
        followRepository.deleteByFollowerIdAndFollowingId(followerId, followingId);
    }

    public Long countByFollowerId(Long id) {
        return followRepository.countByFollowingId(id);
    }

    public Long countByFollowingId(Long id) {
        return followRepository.countByFollowerId(id);
    }

    public boolean isFollowing(Long followerId, Long followingId) {
        return followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
    }


    private FollowInfoDto getFollowInfo(Member member) {
        FollowInfoDto followInfoDto = FollowInfoDto
            .builder()
            .username(member.getUsername())
            .nickname(member.getNickname())
            .imgPath(member.getImgPath())
            .party(partyMemberService.getParty(member.getId()))
            .build();
        return followInfoDto;
    }

    public List<FollowInfoDto> getFollowerList(Long id) {
        List<FollowInfoDto> followerList =
            followRepository.findByFollowingId(id).stream()
                .map(Follow::getFollower)
                .map(member->getFollowInfo(member))
                .collect(Collectors.toList());
        return followerList;
    }

    public List<FollowInfoDto> getFollowingList(Long id) {
        List<FollowInfoDto> followingList =
            followRepository.findByFollowerId(id).stream()
                .map(Follow::getFollowing)
                .map(member->getFollowInfo(member))
                .collect(Collectors.toList());
        return followingList;
    }

}
