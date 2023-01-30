package com.ssafy.stackers.controller;

import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.service.VideoService;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("video")
public class VideoController {
    @Autowired
    VideoService videoService;

    @PostMapping("/upload")
    public String uploadVideo(@RequestPart MultipartFile file) throws IOException {
        Video video = new Video();

        String sourceVideoName = file.getOriginalFilename();
        String sourceVideoNameExtension = FilenameUtils.getExtension(sourceVideoName).toLowerCase();
        FilenameUtils.removeExtension(sourceVideoName);

        File destinationFile;
        String destinationFileName;
        String videoPath = "/Users/sennie/Desktop/S08P12C210/backend/src/main/resources/static/videos";

        do {
            destinationFileName = RandomStringUtils.randomAlphanumeric(32)+"."+sourceVideoNameExtension;
            destinationFile = new File(videoPath + destinationFileName);
        } while(destinationFile.exists());

        destinationFile.getParentFile().mkdirs();
        file.transferTo(destinationFile);

        video.setVideoName(destinationFileName);
        video.setVideoOriName(sourceVideoName);
        video.setVideoPath(videoPath);

        System.out.println(video.getVideoName() + " " + video.getVideoPath() + " " + video.getVideoOriName());
        videoService.save(video);

       return "SUCCESS";
    }

    @GetMapping("/hello")
    public String test(){
        return "hello";
    }
}
