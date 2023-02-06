/* eslint-disable */
import React, { useEffect } from 'react'
import './LogIn.css'
import logo from '../../../assets/logo.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import naverLogo from './naverLogo.svg'
import kakaoLogo from './kakaoLogo.png'
import GoogleLogo from './GoogleLogo.png'
import { useState } from 'react'
import axios from 'axios'

function LogIn({ setModalOpen }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 로그인 모달이 열리면 스크롤 못하게 막기
  // 닫히면 스크롤 다시 가능
  const showModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    showModal
  }, [])
  return (
    <div className="login-background">
      <div className="LogIn">
        <img src={logo} alt="logo" className="LogIn-logo" />
        {/* 임시방편으로 닫기 버튼 만들었어요 */}
        {/* 메인페이지에 모달 띄우기 성공하면 없애겠습니당 */}
        <button onClick={closeModal}>닫기</button>
        <form
          style={{ textAlign: 'center' }}
          onSubmit={(event) => {
            event.preventDefault()
            // console.log('제출된다.')
            // console.log(event.target.id.value)
            // console.log(event.target.password.value)
            // setUsername(event.target.username.value)
            // setPassword(event.target.password.value)
            // console.log(username, password)
            axios({
              method: 'post',
              url: '/api/login',
              data: {
                username: username,
                password: password
              }
            })
              .then((response) => {
                console.log(response.data.accessToken)
                localStorage.setItem('accessToken', response.data.accessToken)
              })
              .catch((error) => {
                console.log(error.response)
              })
          }}
        >
          <TextField
            placeholder="아이디(닉네임) 또는 아이디"
            size="medium"
            className="LogIn-inputBox "
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <TextField
            placeholder="비밀번호 입력"
            size="medium"
            className="LogIn-inputBox "
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
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
                <img
                  src={GoogleLogo}
                  alt="GoogleLogo"
                  className="Logo-Google"
                />
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
    </div>
  )
}

export default LogIn
