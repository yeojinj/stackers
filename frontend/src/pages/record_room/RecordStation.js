import MultiStreamsMixer from 'multistreamsmixer'
import React, { useRef, useState, useEffect } from 'react'
import RecordRTC from 'recordrtc'
const RecordStation = () => {
  const left = useRef(null)
  const preview = useRef(null)
  const recording = useRef(null)
  const downloadRef = useRef(null)
  const logElement = useRef(null)
  const recordingTimeMS = 5000
  const [recordStream, setRecordStream] = useState({})
  const [videoStream, setVideoStream] = useState({})
  const [streams, setStreams] = useState([])
  function log(msg) {
    logElement.innerHTML += { msg }
  }
  function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS))
  }
  function startRecording(stream, lengthInMS) {
    const recorder = new MediaRecorder(stream)
    const data = []

    recorder.ondataavailable = (event) => data.push(event.data)
    recorder.start()
    log(`${recorder.state} for ${lengthInMS / 1000} seconds…`)

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve
      recorder.onerror = (event) => reject(event.name)
    })

    const recorded = wait(lengthInMS).then(() => {
      if (recorder.state === 'recording') {
        recorder.stop()
      }
    })

    return Promise.all([stopped, recorded]).then(() => data)
  }
  function stop(stream) {
    stream.getTracks().forEach((track) => track.stop())
  }

  const startStation = () => {
    left.current.play()
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) => {
        preview.current.srcObject = stream
        downloadRef.current.href = stream

        preview.current.captureStream =
          preview.current.captureStream || preview.current.mozCaptureStream
        return new Promise((resolve) => (preview.current.onplaying = resolve))
      })
      .then(() => {
        startRecording(preview.current.captureStream(), recordingTimeMS)
      })
      .then((recordedChunks) => {
        const recordedBlob = new Blob(recordedChunks, { type: 'video/mp4' })
        recording.current.src = window.URL.createObjectURL(recordedBlob)
        downloadRef.current.href = recording.current.src
        downloadRef.current.download = 'RecordedVideo.mp4'
        setRecordStream({ streamrecord: preview.current.srcObject })
        setVideoStream({ streamRecord: left.current.captureStream() })

        log(
          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
        )
      })
      .catch((error) => {
        if (error.name === 'NotFoundError') {
          log("Camera or microphone not found. Can't record.")
        } else {
          log(error)
        }
      })
  }
  const mixStation = async () => {
    const streams = await [recordStream, videoStream]
    console.log(streams)
    const mixer = new MultiStreamsMixer(streams)
    const mixedStream = mixer.getMixedStream()
    console.log(mixedStream, recordStream, videoStream)
    recording.current.srcObject = mixedStream
    recording.current.play()
    const recorder = RecordRTC(mixedStream, {
      type: 'video',
      mimeType: 'video/mp4',
      previewStream: function (s) {
        recorder.current.srcObject = s
        recorder.current.play()
      }
    })
  }

  const stopStation = () => {
    left.current.pause()
    stop(preview.current.srcObject)
  }
  // const downloadStation = () => {
  //   const blob = recorder.getBlob()
  //   const url = URL.createObjectURL(blob)
  //   const a = document.createElement('a')
  //   a.style.display = 'none'
  //   a.href = url
  //   a.download = 'dance.webm'
  //   a.click()
  //   a.remove()
  //   URL.revokeObjectURL(url)
  // }
  // const getUserCamera = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: true,
  //       video: true
  //     })
  //     .then((stream) => {
  //       // 비디오 tag에 stream 추가
  //       const video = output.current
  //       video.srcObject = stream

  //       video.play()
  //       return stream
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  useEffect(() => {
    mixStation()
  }, [recordStream, videoStream])

  function getStreamSize(stream) {
    const { width, height } = stream
      .getTracks()
      .find((t) => t.kind === 'video')
      .getSettings()
    return { width, height }
  }
  function getVideoStream(video) {
    return new Promise((resolve) => {
      video.play()
      const onplay = () => {
        resolve(video.captureStream())
        video.pause()
        video.currentTime = 0
        video.removeEventListener('play', onplay)
      }
      video.addEventListener('play', onplay)
    })
  }
  return (
    <div>
      <video
        ref={left}
        src="https://webrtc.github.io/samples/src/video/chrome.webm"
        crossOrigin="anonymous"
        preload
      ></video>
      <video ref={preview} muted controls autoPlay>
        preview
      </video>
      <video ref={recording} controls></video>
      <div>
        <button onClick={startStation}>Start Record</button>
        <button onClick={stopStation}>Stop Record</button>
        <a ref={downloadRef}>download</a>
        <span ref={logElement}>{log}</span>
      </div>
    </div>
  )
}
export default RecordStation
