/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import './Record.css'
import { ReactMediaRecorder } from 'react-media-recorder'
import Modal from '@mui/material/Modal'
import { IconButton } from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import Timer from './Timer'

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

function Record(props) {
  const videoRef = useRef(null)
  const stackRef = useRef(null)

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

              {active && (
                <video
                  className="stackVideo"
                  ref={stackRef}
                  src={mediaBlobUrl}
                  width={405}
                  height={720}
                  autoPlay
                  style={{ objectFit: 'cover' }}
                  controls
                />
              )}
              {!active && (
                <video
                  className="streamingRef"
                  ref={videoRef}
                  src={previewStream}
                  controls
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
                      setTimeout(startRecording, 3000)
                      setTimeout(handleClose, 3000)
                      setTimeout(stopRecording, 60000).then(setActive(false))
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
