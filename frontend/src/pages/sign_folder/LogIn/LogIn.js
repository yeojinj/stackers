/* eslint-disable */
import React from 'react'
import './LogIn.css'
import logo from '../../../assets/logo.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import naverLogo from './naverLogo.svg'
import kakaoLogo from './kakaoLogo.png'
import GoogleLogo from './GoogleLogo.png'
import { useState } from 'react'

function LogIn() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="LogIn">
      <img src={logo} alt="logo" className="LogIn-logo" />
      <form
        style={{ textAlign: 'center' }}
        onSubmit={(event) => {
          event.preventDefault()
          // console.log('제출된다.')
          // console.log(event.target.id.value)
          // console.log(event.target.password.value)
          setId(event.target.id.value)
          setPassword(event.target.password.value)
          console.log(id, password)
        }}
      >
        <TextField
          placeholder="아이디(닉네임) 또는 아이디"
          size="medium"
          className="LogIn-inputBox "
          name="id"
        />
        <TextField
          placeholder="비밀번호 입력"
          size="medium"
          className="LogIn-inputBox "
          name="password"
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
          type="submit"
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
      </form>
    </div>
  )
}

export default LogIn
