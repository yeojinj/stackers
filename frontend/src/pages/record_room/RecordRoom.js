/* eslint-disable */
import Record from './Record.js'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StackUploadModal from './StackUploadModal'
import Modal from '@mui/material/Modal'
import './Record.css'
import { useSelector } from 'react-redux'

function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}

function RecordRoom() {
  const navigate = useNavigate()
  const preUrl = useSelector((state) => {
    console.log('preUrl1', state.url.preUrl)
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

  async function getVideo(src) {
    await setStack((preSrc) => {
      return { ...preSrc, src }
    })
  }
  return (
    <div className="record-room">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="wrapper">
        <div className="inside-container">
          <Record stack={getVideo} preId={stationId} />
          <div className="upload-btns">
            <button className="upload-btn-station" onClick={goBack}>
              취소
            </button>
            <button
              className="upload-btn-station"
              onClick={() => {
                if (!isEmptyObj(stack)) {
                  handleOpen()
                }
              }}
            >
              업로드
            </button>
          </div>
          <Modal open={open} onClose={handleClose}>
            <StackUploadModal handle={handleClose} src={stack} />
          </Modal>
        </div>
      </div>
    </div>
  )
}
export default RecordRoom
