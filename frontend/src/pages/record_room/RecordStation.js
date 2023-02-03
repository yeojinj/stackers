import { ReactMediaRecorder } from 'react-media-recorder'
import MultiStreamsMixer from 'multistreamsmixer'
import Record from './Record.js'
import React, { useRef, useState, useEffect } from 'react'
import RecordRTC from 'recordrtc'

const RecordStation = () => {
  const left = useRef(null)
  const right = useRef(null)
  const output = useRef(null)
  let streams = []
  let recorder = {}
  const startStation = () => {
    left.current.play()
    recorder.startRecording()
  }
  const stopStation = () => {
    left.current.pause()
    recorder.stopRecording(() => {
      const blob = recorder.getBlob()
      output.current.srcObject = null
      output.current.src = URL.createObjectURL(blob)
      output.current.muted = false
      output.current.loop = true
      output.current.play()
    })
  }
  const downloadStation = () => {
    const blob = recorder.getBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'dance.webm'
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  ;(async () => {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    right.current.srcObject = cameraStream
    right.current.play()
    const videoStream = await getVideoStream(left)
    streams = [videoStream, cameraStream]
    // streams.forEach(s => {
    //   const size = getStreamSize(s);
    //   s.width = size.width;
    //   s.height = size.height;
    // });
    const mixer = new MultiStreamsMixer(streams)
    mixer.startDrawingFrames()
    const mixedStream = mixer.getMixedStream()
    output.current.srcObject = mixedStream
    output.current.play()
    recorder = RecordRTC(mixedStream, {
      type: 'video',
      mimeType: 'video/webm',
      previewStream: function (s) {
        output.current.srcObject = s
        output.current.play()
      }
    })
  })()
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
      <video ref={right} crossOrigin="anonymous" muted></video>
      <video ref={output} muted></video>
      <div>
        <button onClick={startStation}>Start Record</button>
        <button onClick={stopStation}>Stop Record</button>
        <button onClick={downloadStation}> Download </button>
      </div>
    </div>
  )
}
export default RecordStation
