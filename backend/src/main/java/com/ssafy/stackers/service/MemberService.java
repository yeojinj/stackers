package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.utils.error.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder = null;

    @Transactional
    public void userJoin(Member member) {
        Member m = Member.builder().username(member.getUsername())
            .password(bCryptPasswordEncoder.encode(member.getPassword()))
            .roles("ROLE_USER").build();
        memberRepository.save(m);
    }

    @Transactional(readOnly = true)
    public void checkUsernameDuplication(Member member) {
        boolean usernameDuplicate = memberRepository.existsByUsername(member.getUsername());
        if (usernameDuplicate) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
        }
    }
}
