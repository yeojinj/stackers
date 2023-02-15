import React from 'react'
import './Record'
import './UploadForm.css'
import { useDispatch } from 'react-redux'
import { CreateStack } from '../../store.js'
function CheckComplete() {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(CreateStack([e.target.name, e.target.value]))
  }

  return (
    <div className="input__items">
      <label className="upload-label">이어서 스택 허용</label>
      <div>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="isComplete"
            value="notCompleted"
            onChange={handleChange}
            defaultChecked
          />
          네
        </label>
        <label>
          <input
            type="radio"
            name="isComplete"
            value="completed"
            onChange={handleChange}
          />
          아니요
        </label>
      </div>
    </div>
  )
}
export default CheckComplete
