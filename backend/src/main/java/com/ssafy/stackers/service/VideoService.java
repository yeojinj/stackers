package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class VideoService {
    @Autowired
    VideoRepository videoRepository;

    @Transactional
    public void save(Video video){
        Video v = new Video();

        v.setVideoPath(video.getVideoPath());
        v.setVideoOriName(video.getVideoOriName());
        v.setVideoName(video.getVideoName());

        videoRepository.save(v);
    }
}
