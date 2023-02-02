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
    <div className="modalBox">
      <div className="modalHeader">
        <div>스택 업로드</div>
        <CloseIcon onClick={handleClose} />
      </div>
      <UploadForm handle={handleClose} src={stackUrl} />
    </div>
  )
}
export default StackUploadModal
