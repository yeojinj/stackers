import React, { useRef, useState, useEffect, useNavigate } from 'react'
import Timer from './Timer'
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc'
import Modal from '@mui/material/Modal'

const Station = () => {
  const videoRef = useRef(null)
  // recordrtc
  const [stream, setStream] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [videoBlob, setVideoUrlBlob] = useState(null)

  const [open, setOpen] = useState(false)
  // 30초 타이머
  const [timeLeft, setTimeLeft] = useState(30)
  const intervalRef = useRef(null)
  const stackRef = useRef(null)
  const initialValue = 3000
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // 화면에 틀자마자 webcam 호출
  useEffect(() => {
    getVideo()
  }, [videoRef])
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 480, height: 800 }
      })
      .then((stream) => {
        const video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // 비디오 녹화 시작버튼
  const startRecoding = async () => {
    const mediaDevices = navigator.mediaDevices
    const stream = await mediaDevices.getUserMedia({ video: true, audio: true })
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
      mimeType: 'video/mp4'
    })
    await recorder.startRecording()
    setRecorder(recorder)
    setStream(stream)
    setVideoUrlBlob(null)
    // 시작버튼 누르면 30초 타이머
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1
        } else {
          return 0
        }
      })
    }, 1000)
  }
  // 비디오 녹화 종료
  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording()
      const blob = await recorder.getBlob()
      stream.stop()
      setVideoUrlBlob(blob)
      console.log(blob)
      stackRef.current.srcObject = blob
      stackRef.current.play()
      setStream(null)
      setRecorder(null)
      // 정지버튼 누르면 타이머 초기화 및 다시 30초 세팅
      clearInterval(intervalRef.current)
      setTimeLeft(30)
    }
  }
  // 녹화 시작 후 30초뒤에 자동 종료
  useEffect(() => {
    const timeOut = setTimeout(stopRecording, 2000)
    return () => {
      clearTimeout(timeOut)
    }
  })
  return (
    <div className="box">
      <Modal open={open}>
        <Timer active={open} initialValue={initialValue} />
      </Modal>
      <button
        onClick={() => {
          handleOpen()
          setTimeout(handleClose, 3000).then(startRecoding())
          setTimeout(stopRecording, 60000)
        }}
      >
        Start Recording
      </button>
      <button
        onClick={() => {
          stopRecording()
        }}
      >
        Stop Recording
      </button>
      <video ref={stackRef} className="stackVideo" src={videoBlob} controls />
      <video ref={videoRef} controls />
      <button></button>
      {/* <button
    onClick={() => {
      startRecording()
      setTimeout(stopRecording, 60000)
      setEnable(!enable)
    }}
  >
    togglestreaming
  </button> */}
    </div>
  )
}
export default Station
