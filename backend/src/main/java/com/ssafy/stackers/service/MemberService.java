package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.utils.S3Uploader;
import com.ssafy.stackers.utils.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    @Autowired
    private final MemberRepository memberRepository = null;
    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder = null;
    private final S3Uploader s3Uploader;

    @Transactional
    public void userJoin(JoinDto joinDto) {
        checkUsernameDuplication(joinDto.getUsername());

        Member m = Member.builder().username(joinDto.getUsername())
            .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
            .roles("ROLE_USER")
            .nickname(joinDto.getUsername())
            .email(joinDto.getEmail())
            .bio("")
            .imgPath("path")
            .imgName("name")
            .isResign(false)
            .build();

        memberRepository.save(m);
    }

    @Transactional(readOnly = true)
    public void checkUsernameDuplication(String username) {
        boolean usernameDuplicate = memberRepository.existsByUsername(username);
        if (usernameDuplicate) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXIST);
        }
    }

    @Transactional(readOnly = true)
    public void checkUsernameAndEmail(String username, String email) {
        boolean exists = memberRepository.existsByUsernameAndEmail(username, email);
        if (!exists) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }

    public Member findByUsername(String username) {
        return memberRepository.findByUsername(username)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public Member findById(Long id) {
        return memberRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public Member getLoginMember(String loginUsername) throws CustomException {
        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        Member loginMember = memberRepository.findByUsername(loginUsername)
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return loginMember;
    }

    @Transactional
    public void setNewPassword(String username, String randomCode) {
        Member member = findByUsername(username);
        member.updatePassword(bCryptPasswordEncoder.encode(randomCode));
    }

    public String updateProfileToS3(MultipartFile file) throws Exception{
        return s3Uploader.uploadFiles(file, "static/profile");
    }

}
