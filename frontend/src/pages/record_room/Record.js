/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import './Record.css'
import { ReactMediaRecorder } from 'react-media-recorder'
import Modal from '@mui/material/Modal'
import { IconButton } from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import Timer from './Timer'
import { useDispatch } from 'react-redux'
import { CreateStack } from '../../store.js'
import axios from 'axios'

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}
function setDelay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
function Record(props) {
  const dummy = {
    id: 5,
    stationInfo: {
      content: 'content',
      music: 'music',
      instrument: 'inst',
      hertCnt: 1,
      remainDepth: 3,
      isPublic: 1,
      isComplete: 0,
      tags: ['tag'],
      prevStationId: -1,
      videoName: 'video02.mp4',
      delete: false
    },
    regTime: 'regTime',
    videoPath:
      'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
    writer: {}
  }

  const dispatch = useDispatch()

  const videoRef = useRef(null)
  const stackRef = useRef(null)
  const [isStation, setStation] = useState(true)
  const preStackRef = useRef(null)
  const [preStackDetail, setPreStack] = useState(dummy)
  const stationId = 5

  const getPreStack = async () => {
    await axios({
      method: 'GET',
      url: '/api/' + { stationId }
    })
      .then((response) => {
        setPreStack(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    setPreStack(dummy)
    if (stationId) {
      setStation(true)
      getPreStack()
    } else {
      setStation(false)
    }
    console.log('[useEffect 실행]', preStackDetail)
  }, [])
  useEffect(() => {
    console.log(preStackDetail)
    if (preStackDetail) {
      dispatch(
        CreateStack('remainDepth'),
        preStackDetail.stationInfo.remainDepth - 1
      )
      dispatch(CreateStack('prevStationId', preStackDetail.id))
    }
  }, [preStackDetail])

  useEffect(() => {
    getVideo()
  }, [videoRef])
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 405, height: 720 }
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
  const [enable, setEnable] = useState(true)
  const [open, setOpen] = useState(false)
  const handleEnable = () => {
    setEnable(!enable)
  }
  const setStack = (src) => {
    props.stack(src)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const initialValue = 3000

  let [active, setActive] = useState(false)
  const activeHandle = () => {
    setActive(!active)
  }

  return (
    <div className="recordRoom">
      <ReactMediaRecorder
        onStop={async (blobUrl, blob) => {
          await setStack(blob)
          const video = videoRef.current
          video.srcObject = stream
          video.play()
        }}
        video
        blobPropertyBag={{
          type: 'video/mp4'
        }}
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl
        }) => {
          return (
            <div className="recordRoom">
              <Modal className="recordModal" open={open}>
                <Timer
                  classNAme="recordTimer"
                  active={open}
                  initialValue={initialValue}
                />
              </Modal>
              {isStation && (
                <video useRef={preStackRef} src={preStackDetail.videoPath} />
              )}
              {active && (
                <video
                  className="stackVideo"
                  ref={stackRef}
                  src={mediaBlobUrl}
                  width={405}
                  height={720}
                  style={{ objectFit: 'cover' }}
                  controls
                />
              )}
              {!active && (
                <video
                  className="streamingRef"
                  ref={videoRef}
                  src={previewStream}
                  autoPlay
                />
              )}
              {/* {enable && <VideoPreview stream={previewStream} />} */}
              <div className="box">
                {enable && (
                  <IconButton
                    fontSize="Large"
                    color="primary"
                    onClick={() => {
                      handleEnable()
                      activeHandle()
                      handleOpen()
                      getVideo()
                      setDelay(3000)
                      handleClose()
                      startRecording()
                      if (isStation) {
                        console.log(preStackRef)
                        preStackRef.current.play()
                        setDelay(preStackRef.current.duration)
                        stopRecording()
                        setActive(false)
                      } else {
                        setDelay(60000)
                        stopRecording()
                        setActive(false)
                      }
                    }}
                  >
                    <PlayCircleFilledWhiteIcon />
                  </IconButton>
                )}
                {!enable && (
                  <IconButton
                    fontSize="Large"
                    color="primary"
                    onClick={() => {
                      handleEnable()
                      activeHandle()
                      stopRecording()
                    }}
                  >
                    <StopCircleIcon />
                  </IconButton>
                )}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default Record
