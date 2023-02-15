import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo_white.png'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LogIn from '../pages/sign_folder/LogIn/LogIn'

function Forbidden() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="not-found">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div
        className="wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: 'Pretendard'
        }}
      >
        <img src={logo} width={280} />
        <span style={{ marginTop: '-20px' }}>
          로그인이 필요한 페이지입니다.
        </span>
        <button
          className="button-complete forbidden-style "
          onClick={() => {
            navigate('/')
          }}
          style={{
            width: '180px'
          }}
        >
          메인 페이지
        </button>
        <button
          className="button-complete forbidden-style "
          onClick={handleOpen}
        >
          로그인
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          style={{ fontFamily: 'Pretendard' }}
        >
          <Box>
            <LogIn handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Forbidden
