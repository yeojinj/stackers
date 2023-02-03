package com.ssafy.stackers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class StackersApplication {

    public static void main(String[] args) {
        SpringApplication.run(StackersApplication.class, args);
    }


}
