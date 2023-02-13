import Record from './Record.js'
import React, { useState, useSelector } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StackUploadModal from './StackUploadModal'
import LightIcon from '@mui/icons-material/Light'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Modal from '@mui/material/Modal'
import { useDispatch } from 'react-redux'

function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}

function RecordRoom() {
  const navigate = useNavigate()
  const preUrl = useSelector((state) => {
    return state.url.preUrl
  })
  const params = useParams()
  const stationId = params.preId
  const goBack = () => {
    navigate(preUrl)
  }
  const [open, setOpen] = useState(false)
  const [stack, setStack] = useState({})

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
  }
  return (
    <div className="recordRoom">
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
        <div className="box">
          <Record stack={getVideo} preId={stationId} />
        </div>
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
