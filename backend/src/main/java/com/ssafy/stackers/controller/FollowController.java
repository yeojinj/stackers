package com.ssafy.stackers.controller;

import com.ssafy.stackers.auth.PrincipalDetails;
import com.ssafy.stackers.model.dto.FollowInfoDto;
import com.ssafy.stackers.service.FollowService;
import com.ssafy.stackers.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Follow", description = "팔로우 관련 API")
@RestController
@RequestMapping("api/follow")
public class FollowController {

    @Autowired
    private FollowService followService;
    @Autowired
    private MemberService memberService;

    @Operation(summary = "팔로우하기")
    @PostMapping
    public ResponseEntity<?> followMember(@AuthenticationPrincipal PrincipalDetails principal,
        @RequestBody Map<String, String> map) {
        Long followerId = memberService.getLoginMember(principal.getUsername()).getId();
        Long followingId = memberService.findByUsername(map.get("username")).getId();
        followService.save(followerId, followingId);
        return new ResponseEntity<>("팔로우 성공", HttpStatus.OK);
    }

    @Operation(summary = "팔로우 취소")
    @DeleteMapping
    public ResponseEntity<?> deleteFollowMember(@AuthenticationPrincipal PrincipalDetails principal,
        @RequestBody Map<String, String> map) {
        Long followerId = memberService.getLoginMember(principal.getUsername()).getId();
        Long followingId = memberService.findByUsername(map.get("username")).getId();
        followService.delete(followerId, followingId);
        return new ResponseEntity<>("팔로우 취소 성공", HttpStatus.OK);
    }

    @Operation(summary = "팔로워 리스트")
    @GetMapping("/follower/{username}")
    public ResponseEntity<?> getFollowerList(@PathVariable String username) {
        Long memberId = memberService.findByUsername(username).getId();
        List<FollowInfoDto> followerList = followService.getFollowerList(memberId);
        return new ResponseEntity<>(followerList, HttpStatus.OK);
    }

    @Operation(summary = "팔로잉 리스트")
    @GetMapping("/following/{username}")
    public ResponseEntity<?> getFollowingList(@PathVariable String username) {
        Long memberId = memberService.findByUsername(username).getId();
        List<FollowInfoDto> followingList = followService.getFollowingList(memberId);
        return new ResponseEntity<>(followingList, HttpStatus.OK);
    }

    @Operation(summary = "팔로잉 여부 조회")
    @GetMapping("isfollowing/{username}")
    public ResponseEntity<?> isFollowing(@AuthenticationPrincipal PrincipalDetails principal,
        @PathVariable String username) {
        Long followerId = memberService.getLoginMember(principal.getUsername()).getId();
        Long followingId = memberService.findByUsername(username).getId();
        return new ResponseEntity<>(followService.isFollowing(followerId, followingId),
            HttpStatus.OK);
    }

}
