import UploadForm from './UploadForm'
import './Record'
import './UploadForm.css'

import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { ClearStack } from '../../store.js'
function StackUploadModal(props) {
  const handleClose = () => {
    props.handle()
  }
  const stackUrl = props
  const filedownloadlink = window.URL.createObjectURL(props.src.src)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.staitonId === -1) {
      dispatch(ClearStack)
    }
  }, [])
  return (
    <div className="modal-box">
      <div className="modal-header">
        <div className="modal-header-text">스택 업로드</div>
        <CloseIcon
          onClick={() => {
            dispatch(ClearStack())
            handleClose()
          }}
        />
      </div>
      <hr style={{ borderTop: '0.5px solid #c4c4c4e0', width: '100%' }} />
      <div className="upload-form-container">
        <div className="section-right">
          <video
            className="stack-video"
            src={filedownloadlink}
            width={258}
            height={402}
            style={{ objectFit: 'cover' }}
            controls
          />
          {filedownloadlink && (
            <a href={filedownloadlink} download>
              <button className="button-download">나의 스택 다운로드</button>
            </a>
          )}
        </div>
        <UploadForm handle={handleClose} src={stackUrl} />
      </div>
    </div>
  )
}
export default StackUploadModal
