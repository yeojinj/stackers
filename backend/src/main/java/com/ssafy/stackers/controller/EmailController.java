package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.dto.FindPasswordDto;
import com.ssafy.stackers.service.EmailService;
import com.ssafy.stackers.service.MemberService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/mail")
public class EmailController {

    private final MemberService memberService;
    private final EmailService emailService;

    @PostMapping("/mail-confirm")
    public ResponseEntity<?> mailConfirm(@RequestBody Map<String, String> map) // dto로 변경?
        throws MessagingException {
        MimeMessage message = emailService.createEmailConfirmForm(map.get("email"));
        String randomCode = emailService.sendEmail(message);
        return new ResponseEntity<>(randomCode, HttpStatus.OK);
    }

    @PostMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody FindPasswordDto findPasswordDto)
        throws MessagingException {
        memberService.checkUsernameAndEmail(findPasswordDto.getUsername(),
            findPasswordDto.getEmail());        // 회원 정보 확인
        MimeMessage message = emailService.createFindPasswordForm(findPasswordDto.getEmail());
        String randomCode = emailService.sendEmail(message);
        memberService.setNewPassword(findPasswordDto.getUsername(), randomCode);
        return new ResponseEntity<>("임시 비밀번호 발송 성공", HttpStatus.OK);
    }

}
