/* eslint-disable */
import React from 'react'
import './LogIn.css'
import logo from '../../assets/logo.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import naverLogo from './naverLogo.svg'

function LogIn() {
  return (
    <div className="LogIn">
      <img src={logo} alt="logo" className="LogIn-logo" />
      <div style={{ textAlign: 'center' }}>
        <TextField
          placeholder="아이디(닉네임) 또는 아이디"
          size="medium"
          className="LogIn-inputBox "
        />
        <TextField
          placeholder="비밀번호 입력"
          size="medium"
          className="LogIn-inputBox "
        />
        <div className="find-password-div">
          <a
            href="/Login"
            onClick={(event) => {
              event.preventDefault()
            }}
            style={{ marginLeft: 'auto' }}
          >
            비밀번호를 잊어버렸나요?
          </a>
        </div>

        <Button
          variant="contained"
          style={{
            width: '390px',
            height: '55px',
            backgroundColor: 'rgba(217, 217, 217, 1)',
            color: 'black'
          }}
        >
          로그인
        </Button>
        <div>
          <Button
            variant="contained"
            style={{
              width: '390px',
              height: '55px',
              backgroundColor: '#00c73c',
              color: 'black'
            }}
          >
            <img
              src={naverLogo}
              alt="naverLogo"
              style={{
                width: '15px',
                color: 'white'
              }}
            />
            네이버 로그인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LogIn
