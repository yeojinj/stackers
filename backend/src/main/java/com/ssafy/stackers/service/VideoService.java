package com.ssafy.stackers.service;

import com.ssafy.stackers.model.Video;
import com.ssafy.stackers.repository.VideoRepository;
import java.io.File;
import java.io.IOException;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class VideoService {

    @Autowired
    VideoRepository videoRepository;

    @Transactional
    public void save(Video video) {
        Video v = Video.builder().videoName(video.getVideoName())
            .videoOriName(video.getVideoOriName()).videoPath(video.getVideoPath()).build();
        videoRepository.save(v);
    }

    public void exportThumbnail() throws IOException {
        // 영상 파일 경로
        String videoPath = "C:\\test\\videos\\test.mp4";

        // 썸네일 추출 절대 경로
        String thumbnailPath = "C:\\test\\thumbs\\";

        // ffmpeg 설치 파일 경로
        String ffmpegPath = "C:\\Program Files\\ffmpeg\\bin\\";
        FFmpeg ffmpeg = new FFmpeg(ffmpegPath + "ffmpeg");
        FFprobe ffprobe = new FFprobe(ffmpegPath + "ffprobe");

        // 썸네일 추출 명령어
        FFmpegBuilder builder = new FFmpegBuilder()
            .overrideOutputFiles(true)          // 썸네일 파일 존재할 경우 덮어쓰기
            .setInput(videoPath)                // 영상 파일 경로
            .addOutput(thumbnailPath + "thumb.png")   // 썸네일 추출 절대 경로
            .addExtraArgs("-ss", "00:00:01")            // 썸네일 추출 시작점 ([영상 길이 / 10]으로 10개 뽑을 예정)
            .setFrames(1)
            .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg,
            ffprobe);        // FFmpeg 명령어 실행을 위한 FFmpegExecutor 객체 생성
        executor.createJob(builder).run();                                    // one-pass encodes
    }
}
