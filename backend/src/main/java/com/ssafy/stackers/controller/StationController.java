package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Member;
import com.ssafy.stackers.model.Station;
import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.service.StationService;
import com.ssafy.stackers.service.VideoService;
import java.io.File;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("station")
public class StationController {

    @Autowired
    private StationService stationService;
    @Autowired
    private VideoService videoService;

    @Secured("ROLE_USER")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadStation(@RequestPart Station station,
                                        @RequestPart(required = true) MultipartFile video) throws IOException {

        Video saveVideo = uploadVideo(video);     // 비디오 저장
        // 로그인 되어 있는 유저 정보 가져오기 -> 로그인 되어 있지 않다면 오류 반환
        stationService.saveWithMember(station, saveVideo); // 스테이션 저장

        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    public Video uploadVideo(MultipartFile file) throws IOException {
        String sourceVideoName = file.getOriginalFilename();
        String sourceVideoNameExtension = FilenameUtils.getExtension(sourceVideoName).toLowerCase();
        FilenameUtils.removeExtension(sourceVideoName);

        File destinationFile;
        String destinationFileName;
//        String videoPath = "C:\\stackers\\videos\\";          // 비디오 저장 폴더를 프로젝트 외부로 꺼내기
        String videoPath = "/Users/sennie/stackers/videos";

        do {
            destinationFileName =
                RandomStringUtils.randomAlphanumeric(64) + "." + sourceVideoNameExtension;
            destinationFile = new File(videoPath + destinationFileName);
        } while (destinationFile.exists());

        destinationFile.getParentFile().mkdirs();
        file.transferTo(destinationFile);

        Video video = Video.builder().videoName(destinationFileName).videoOriName(sourceVideoName)
            .videoPath(videoPath).build();

        return video;
    }

}
