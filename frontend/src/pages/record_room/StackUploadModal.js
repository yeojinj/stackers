import UploadForm from './UploadForm'
import './Record'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

function StackUploadModal() {
  return (
    <div className="modalBox">
      <div className="modalHeader">
        <div>스택 업로드</div>
        <CloseIcon />
      </div>
      <UploadForm />
    </div>
  )
}
export default StackUploadModal
