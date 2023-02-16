package com.ssafy.stackers.service;

import com.ssafy.stackers.exception.CustomException;
import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.dto.JoinDto;
import com.ssafy.stackers.model.dto.MemberModifyDto;
import com.ssafy.stackers.repository.MemberRepository;
import com.ssafy.stackers.utils.S3Uploader;
import com.ssafy.stackers.utils.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@Slf4j
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
                .imgPath("https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg")
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
    public boolean isValidUsername(String username) {
        return !memberRepository.existsByUsername(username);
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

    @Transactional
    public void updateMember(String username, MemberModifyDto memberModifyDto, MultipartFile file) throws Exception {
        Member member = findByUsername(username);
        member.updateNickname(memberModifyDto.getNickname());
        member.updateBio(memberModifyDto.getBio());

        String originImgPath = member.getImgPath();
        log.info("[프로필 이미지 경로] : {}", originImgPath);

        if(file != null){
            member.updateImgPath(updateProfileToS3(file, username));
            if(!originImgPath.equals("https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg")) s3Uploader.deleteS3(originImgPath);
        }
    }

    public String updateProfileToS3(MultipartFile file, String username) throws Exception{
        String name = file.getName() + username;
        String profileImgName = Base64.getEncoder().withoutPadding().encodeToString(name.getBytes());
        log.info(profileImgName);
//        return  "";
        return s3Uploader.uploadFiles(file, "static/profile", profileImgName);
    }

}
