package com.ssafy.stackers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

// TODO: exclude 부분 DB 연결 후 삭제할 것
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class StackersApplication {

    public static void main(String[] args) {
        SpringApplication.run(StackersApplication.class, args);
    }

}
