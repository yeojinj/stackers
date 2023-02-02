import Record from './Record.js'
import React, { useEffect, useState, useRef } from 'react'
import StackUploadModal from './StackUploadModal'
import LightIcon from '@mui/icons-material/Light'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Modal from '@mui/material/Modal'
import { ReactMediaRecorder } from 'react-media-recorder'
import MultiStreamsMixer from 'multistreamsmixer'
import RecordRTC from 'recordrtc'

function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}
function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true
  }

  return false
}
async function getVideoStream(video) {
  return new Promise((resolve) => {
    video.cuurrent.play()
    const onplay = () => {
      resolve(video.captureStream())
      video.current.pause()
      video.currentTime = 0
      video.current.removeEventListener('play', onplay)
    }
    video.current.addEventListener('play', onplay)
  })
}

function RecordRoom() {
  // const navigate = useNavigate()
  const goBack = () => {
    // // 이전 페이지로 이동
    // navigate(-1)
  }
  const [open, setOpen] = useState(false)
  const [stack, setStack] = useState({})
  const [test, setTest] = useState([])
  const [list, setList] = useState([])
  const stack0 = useRef(null)
  const output = useRef(null)
  const recorder = null
  const streams = null

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const setNoneStack = () => {}
  const showToolTip = () => {}
  async function getVideo(src) {
    await setStack((preSrc) => {
      return { ...preSrc, src }
    })
    await getTest(src)
  }
  async function getTest(src) {
    await setTest([...test, src])
  }
  useEffect(() => {
    setList([])
    for (let i = 0; i < test.length; i++) {
      const objURL = window.URL.createObjectURL(test[i])
      setList((list) => [...list, objURL])
    }
  }, [test])

  const soloStackRef = useRef({})

  function startRecording() {
    stack0.current.start()
    recorder.startRecording()
  }
  function stopRecording() {
    stack0.current.pause()
    recorder.stopRecording()
  }

  ;(async () => {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    soloStackRef.current.srcObject = cameraStream
    soloStackRef.current.play()
    const videoStream = await getVideoStream(stack0)
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
  return (
    <div>
      <LightIcon></LightIcon>
      <div className="container">
        <div className="stack">
          <p className="box"></p>
          <PhotoCameraFrontIcon
            className="box"
            onClick={setNoneStack}
          ></PhotoCameraFrontIcon>
          <InfoOutlinedIcon className="box" onClick={showToolTip} />
        </div>
        {/* <ReactMediaRecorder
          onStop={async (blobUrl, blob) => {
            await setStack(blob)
          }}
          blobPropertyBag={{
            type: 'video/mp4'
          }}
          screen
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            return (
              <div>
                <div className="testItem">
                  {!isEmptyArr(list) &&
                    list.map((Item, index) => {
                      return (
                        <div key={index}>
                          <video
                            ref={'stack' + { index }}
                            src={Item}
                            width="500px"
                            controls
                          />
                        </div>
                      )
                    })}
                </div>
                <Record stack={getVideo} ref={soloStackRef}></Record>
                <p>{status}</p>
              </div>
            )
          }}
        /> */}
        <div>
          <video ref={stack0} controls>
            <source
              type="video/webm"
              src="https://webrtc.github.io/samples/src/video/chrome.webm"
            />
          </video>
          {/* <Record stack={getVideo}></Record> */}
          <video ref={soloStackRef} crossOrigin="anonymous" />
          <video ref={output} />
          <p>{status}</p>
        </div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <div className="stack">
          <p></p>
          <p></p>
          <div className="box">
            <button className="box" onClick={goBack}>
              취소
            </button>
            <button
              onClick={() => {
                if (!isEmptyObj(stack)) {
                  handleOpen()
                }
              }}
            >
              업로드
            </button>
            <Modal open={open} onClose={handleClose}>
              <StackUploadModal handle={handleClose} src={stack} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RecordRoom
