import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LogIn from '../pages/sign_folder/LogIn/LogIn'

function Forbidden() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div
      style={{
        width: '50%',
        height: '200px',
        border: 'solid 1px black',
        textAlign: 'center',
        margin: '200px auto'
      }}
    >
      <p>Stackers를 즐기기 위해서는 로그인이 필요합니다.</p>
      <p>저희 로그인하고 즐겨볼까요~?</p>
      <p>
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          Home으로 가기
        </button>
      </p>
      <p>
        <button onClick={handleOpen}>Login</button>
      </p>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <LogIn handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  )
}

export default Forbidden
