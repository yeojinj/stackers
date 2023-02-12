import UploadForm from './UploadForm'
import './Record'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

function StackUploadModal(props) {
  const handleClose = () => {
    props.handle()
  }
  const stackUrl = props
  return (
    <div className="modal-box">
      <div className="modal-header">
        <div className="modal-header-text">스택 업로드</div>
        <CloseIcon onClick={handleClose} />
      </div>
      <hr style={{ borderTop: '0.5px solid #c4c4c4e0', width: '100%' }} />
      <UploadForm handle={handleClose} src={stackUrl} />
    </div>
  )
}
export default StackUploadModal
