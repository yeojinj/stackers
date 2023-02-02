import Record from './Record.js'
import React, { useEffect, useState } from 'react'
import StackUploadModal from './StackUploadModal'
import LightIcon from '@mui/icons-material/Light'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Modal from '@mui/material/Modal'
import { ReactMediaRecorder } from 'react-media-recorder'
import MultiStreamsMixer from 'multistreamsmixer'

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
  const mixer = new MultiStreamsMixer([])
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
        <ReactMediaRecorder
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
                          <video src={Item} width="500px" controls />
                        </div>
                      )
                    })}
                </div>
                <Record stack={getVideo}></Record>
                <p>{status}</p>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
                <video src={mediaBlobUrl} controls></video>
              </div>
            )
          }}
        />

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
