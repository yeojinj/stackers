console.clear()
const left = document.querySelector('#left')
const right = document.querySelector('#right')
const output = document.querySelector('#output')
let streams = null
let recorder = null

document.querySelector('#start-record-button').onclick = () => {
  left.play()
  recorder.startRecording()
}
document.querySelector('#stop-record-button').onclick = () => {
  left.pause()
  recorder.stopRecording(() => {
    const blob = recorder.getBlob()
    output.srcObject = null
    output.src = URL.createObjectURL(blob)
    output.muted = false
    output.loop = true
    output.play()

    // streams.forEach(function (stream) {
    //   stream.getTracks().forEach(function (track) {
    //     track.stop();
    //   });
    // });
  })
}
document.querySelector('#download-button').onclick = () => {
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
  right.srcObject = cameraStream
  right.play()
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
  output.srcObject = mixedStream
  output.play()
  recorder = RecordRTC(mixedStream, {
    type: 'video',
    mimeType: 'video/webm',
    previewStream: function (s) {
      output.srcObject = s
      output.play()
    }
  })
})()

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

function getStreamSize(stream) {
  const { width, height } = stream
    .getTracks()
    .find((t) => t.kind === 'video')
    .getSettings()
  return { width, height }
}
