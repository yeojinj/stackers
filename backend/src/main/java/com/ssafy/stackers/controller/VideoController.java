package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("video")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload")
    public String uploadVideo(@RequestPart MultipartFile file) throws IOException {
        String sourceVideoName = file.getOriginalFilename();
        String sourceVideoNameExtension = FilenameUtils.getExtension(sourceVideoName).toLowerCase();
        FilenameUtils.removeExtension(sourceVideoName);

        File destinationFile;
        String destinationFileName;
        String videoPath = "C:\\stackers\\videos\\";          // 비디오 저장 폴더를 프로젝트 외부로 꺼내기

        do {
            destinationFileName =
                RandomStringUtils.randomAlphanumeric(64) + "." + sourceVideoNameExtension;
            destinationFile = new File(videoPath + destinationFileName);
        } while (destinationFile.exists());

        destinationFile.getParentFile().mkdirs();
        file.transferTo(destinationFile);

        Video video = Video.builder().videoName(destinationFileName).videoOriName(sourceVideoName)
            .videoPath(videoPath).build();

        log.info("[비디오 경로] {}{}", video.getVideoPath(), video.getVideoName());
        videoService.save(video);

        return "video upload success";
    }
}
