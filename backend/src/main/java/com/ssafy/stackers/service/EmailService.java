package com.ssafy.stackers.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;
    private String authNum;

    private void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) (random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) (random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    private String setContext(String code) {
        StringBuffer msg = new StringBuffer();

        msg.append("<div style='margin:100px;'>")
            .append("<h1> 안녕하세요</h1>")
            .append("<br>")
            .append("<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>")
            .append("<br>")
            .append("<div align='center' style='border:1px solid black; font-family:verdana';>")
            .append("<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>")
            .append("<div style='font-size:130%'>")
            .append("CODE : <strong>")
            .append(authNum)
            .append("</string></div>");
        return msg.toString();
    }

    private MimeMessage createEmailForm(String email)
        throws MessagingException {
        createCode();
        String setFrom = "sb030329@gmail.com";      // 수정
        String toEmail = email;
        String title = "Stackers 회원가입 인증 번호";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);
        message.setFrom(setFrom);
        message.setText(setContext(authNum), "utf-8", "html");
        return message;
    }

    public String sendEmail(String toEmail)
        throws MessagingException {
        MimeMessage emailForm = createEmailForm(toEmail);
        emailSender.send(emailForm);
        return authNum;
    }

}
