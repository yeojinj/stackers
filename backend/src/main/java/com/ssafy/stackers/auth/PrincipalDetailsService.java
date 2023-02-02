package com.ssafy.stackers.auth;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("[PrincipalDetailsService] loadUserByUsername {}", username);
        Member memberEntity = memberRepository.findByUsername(username)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return new PrincipalDetails(memberEntity);
    }

}
