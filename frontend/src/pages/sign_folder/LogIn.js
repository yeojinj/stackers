/* eslint-disable */
import React from 'react'
import './LogIn.css'
import logo from '../../assets/logo.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import naverLogo from './naverLogo.svg'
import kakaoLogo from './kakaoLogo.png'
import GoogleLogo from './GoogleLogo.png'

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
          className="LogIn-button"
          style={{
            width: '390px',
            height: '55px',
            backgroundColor: 'rgba(217, 217, 217, 1)',
            color: 'black',
            marginBottom: '30px'
          }}
        >
          로그인
        </Button>
        <div className="SNS-LogIn-buttons">
          <Button
            variant="contained"
            style={{
              width: '390px',
              height: '55px',
              backgroundColor: '#00c73c',
              color: 'black',
              marginBottom: '5px'
            }}
          >
            <div className="div-LogIn-Naver">
              <img src={naverLogo} alt="naverLogo" className="Logo-Naver" />
              <b style={{ color: 'white' }}>네이버</b>
              <b style={{ color: 'white' }}>로그인</b>
            </div>
          </Button>
          <Button
            variant="contained"
            style={{
              width: '390px',
              height: '55px',
              backgroundColor: '#FEE500',
              color: 'black',
              marginBottom: '5px'
            }}
          >
            <div className="div-LogIn-Kakao ">
              <img src={kakaoLogo} alt="kakaoLogo" className="Logo-Kakao" />
              <p>카카오</p>
              <p>로그인</p>
            </div>
          </Button>
          <Button
            variant="contained"
            style={{
              width: '390px',
              height: '55px',
              backgroundColor: '#FFFFFF',
              color: 'black'
            }}
          >
            <div className="div-LogIn-Google">
              <img src={GoogleLogo} alt="GoogleLogo" className="Logo-Google" />
              <p style={{ margin: '0 auto 0 auto' }}>Sign in with Google</p>
            </div>
          </Button>
        </div>
        <div className="div-LogIn-footer">
          <p style={{ margin: '0 20px 0 0 ' }}>계정이 없으신가요?</p>
          <a
            href="/LogIn"
            onClick={(event) => {
              event.preventDefault()
            }}
            className="move-to-SignUp"
          >
            회원가입
          </a>
        </div>
      </div>
    </div>
  )
}

export default LogIn
