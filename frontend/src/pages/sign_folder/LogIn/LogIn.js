/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './LogIn.css'
import logo from '../../../assets/logo.svg'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import naverLogo from './naverLogo.svg'
import kakaoLogo from './kakaoLogo.png'
import GoogleLogo from './GoogleLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logIn } from '../../../store.js'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

function LogIn(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => {
    return state.user.isLogged
  })
  return (
    <div>
      <div className="LogIn">
        <p style={{ margin: '21px' }}>
          <CloseOutlinedIcon
            onClick={() => {
              props.handleClose()
            }}
            style={{
              cursor: 'pointer',
              float: 'right'
            }}
          />
        </p>
        <img src={logo} alt="logo" className="LogIn-logo" />

        <form
          style={{ textAlign: 'center' }}
          onSubmit={(event) => {
            event.preventDefault()
            axios({
              method: 'post',
              url: '/api/login',
              data: {
                username,
                password
              }
            })
              .then((response) => {
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                dispatch(logIn())
                navigate('/')
                props.handleClose()
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
            type="password"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <div className="find-password-div">
            <Link to="/SignUp" style={{ marginLeft: 'auto' }}>
              비밀번호를 잊어버렸나요?
            </Link>
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
            <Link to="/SignUp" className="move-to-SignUp">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
