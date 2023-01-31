import Record from './Record.js'
import React, { useState } from 'react'
import StackUploadModal from './StackUploadModal'
import LightIcon from '@mui/icons-material/Light'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Modal from '@mui/material/Modal'

function RecordRoom() {
  // const navigate = useNavigate()

  const goBack = () => {
    // // 이전 페이지로 이동
    // navigate(-1)
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const setNoneStack = () => {}
  const showToolTip = () => {}
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
        <div className="box">
          <Record />
        </div>
        <div className="stack">
          <p></p>
          <p></p>
          <div className="box">
            <button className="box" onClick={goBack}>
              취소
            </button>
            <button onClick={handleOpen}>업로드</button>
            <Modal open={open} onClose={handleClose}>
              <StackUploadModal />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RecordRoom
