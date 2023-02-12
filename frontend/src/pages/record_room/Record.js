/* eslint-disable */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect
} from 'react'
import './Record.css'
import { ReactMediaRecorder } from 'react-media-recorder'
import Modal from '@mui/material/Modal'
import { IconButton } from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import Timer from './Timer'
import { useDispatch, useSelector } from 'react-redux'
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
  const stationId = props.preId
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
  const data = useSelector((state) => {
    return state.stack
  })
  const videoRef = useRef(null)
  const stackRef = useRef(null)
  const [isStation, setStation] = useState(false)
  let preStackRef = useRef(null)
  const [preStackDetail, setPreStack] = useState({})

  const getPreStack = async () => {
    await axios({
      method: 'GET',
      url: '/api/' + { stationId }
    })
      .then((response) => {
        setPreStack((preStackDetail) => response.data)
        console.log('axios 통신 완료')
        console.log(response.data)
        console.log(preStackDetail)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    setPreStack((preStackDetail) => (preStackDetail = { ...dummy }))
    if (stationId > -1) {
      setStation(true)
      getPreStack()
    } else {
      setStation(false)
    }
  }, [stationId])
  useEffect(() => {
    setPath((path) => {
      path = preStackDetail.videoPath
    })
    if (isStation) {
      dispatch(
        CreateStack(['remainDepth', preStackDetail.stationInfo.remainDepth - 1])
      )
      dispatch(CreateStack(['prevStationId', preStackDetail.id]))
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
  const [path, setPath] = useState('')
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
  useEffect(() => {
    console.log('rendering?')
  }, [enable])
  const initialValue = 3000

  let [active, setActive] = useState(false)
  const activeHandle = () => {
    console.log(active)
    setActive(!active)
  }
  const playVideo = () => {
    const tmp = preStackRef.current
    return tmp.play()
  }
  return (
    <div className="recordRoom">
      <ReactMediaRecorder
        onStop={async (blobUrl, blob) => {
          console.log('stop?')
          await setStack(blob)
          const video = videoRef.current
          video.srcObject = stream
          video.play()
          handleEnable()
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
                <video
                  width={198}
                  height={352}
                  style={{ objectFit: 'cover' }}
                  ref={preStackRef}
                  src={preStackDetail.videoPath}
                  controls
                />
              )}
              {!active && (
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
              {active && (
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
                      setTimeout(handleClose, 3000)
                      setTimeout(startRecording, 3000)
                      setTimeout(playVideo, 3000)
                      if (isStation) {
                        if (isPre !== null) {
                          const preVideo = isPre.current
                          prevideo.play()
                          setTimeout(
                            stopRecording,
                            preStackRef.current.duration
                          )
                        }
                      } else {
                        setTimeout(stoprRecording, 60000)
                      }
                      setActive(false)
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
