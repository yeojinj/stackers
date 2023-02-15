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
    private String randomCode;

    private void createCode(int size) {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < size; i++) {
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
        randomCode = key.toString();
    }

    private String setEmailConfirmContext(String code) {
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
            .append(randomCode)
            .append("</string></div>");
        return msg.toString();
    }

    private String setFindPasswordContext(String code) {
        StringBuffer msg = new StringBuffer();

        msg.append("<div style='margin:100px;'>")
            .append("<h1> 안녕하세요</h1>")
            .append("<br>")
            .append("<p>아래 임시 비밀번호를 사용하여 로그인해주시기 바랍니다<p>")
            .append("<br>")
            .append("<div align='center' style='border:1px solid black; font-family:verdana';>")
            .append("<h3 style='color:blue;'>임시 비밀번호입니다.</h3>")
            .append("<div style='font-size:130%'>")
            .append("CODE : <strong>")
            .append(randomCode)
            .append("</string></div>");
        return msg.toString();
    }

    public MimeMessage createEmailConfirmForm(String email)
        throws MessagingException {
        createCode(8);
        String setFrom = "www.stackers.site@gmail.com";
        String toEmail = email;
        String title = "Stackers 회원가입 인증 번호";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);
        message.setFrom(setFrom);
        message.setText(setEmailConfirmContext(randomCode), "utf-8", "html");
        return message;
    }

    public MimeMessage createFindPasswordForm(String email)
        throws MessagingException {
        createCode(10);
        String setFrom = "www.stackers.site@gmail.com";
        String toEmail = email;
        String title = "Stackers 임시 비밀번호";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);
        message.setFrom(setFrom);
        message.setText(setFindPasswordContext(randomCode), "utf-8", "html");
        return message;
    }

    public String sendEmail(MimeMessage emailForm) {
        emailSender.send(emailForm);
        return randomCode;
    }

}
