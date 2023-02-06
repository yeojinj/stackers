package com.ssafy.stackers.controller;

import com.ssafy.stackers.service.EmailService;
import jakarta.mail.MessagingException;
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

    private final EmailService emailService;

    @PostMapping("mailConfirm")
    public ResponseEntity<?> mailConfirm(@RequestBody Map<String, String> map) // dto로 변경?
        throws MessagingException {

        String authCode = emailService.sendEmail(map.get("email"));
        return new ResponseEntity<>(authCode, HttpStatus.OK);
    }

}
