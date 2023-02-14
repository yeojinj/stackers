/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './LogIn.css'
import logo from '../../../assets/logo.svg'
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

  const [useButton, setUseButton] = useState(false)

  useEffect(() => {
    if (0 < username.length && 0 < password.length) {
      setUseButton(true)
    } else {
      setUseButton(false)
    }

    // console.log(useButton)
  }, [username, password])

  const [loginButton, setLoginButton] = useState(
    <button className="login-button-disabled" type="submit" disabled>
      로그인
    </button>
  )

  useEffect(() => {
    if (useButton) {
      setLoginButton(
        <button className="login-button" type="submit">
          로그인
        </button>
      )
    } else {
      setLoginButton(
        <button className="login-button-disabled" type="submit" disabled>
          로그인
        </button>
      )
    }
    // console.log(useButton)
  }, [useButton])

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
          className="login-input-form"
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
                localStorage.setItem(
                  'accessToken',
                  response.headers.authorization
                )
                localStorage.setItem('refreshToken', response.headers.refresh)
                dispatch(logIn())
                navigate('/')
                props.handleClose()
              })
              .catch((error) => {
                // console.error(error)
                axios({
                  method: 'get',
                  url: `/api/member/check-username/${username}`
                })
                  .then((response) => {
                    if (response.data) {
                      alert('아이디, 비밀번호를 다시 한번 확인해주세요.')
                    } else {
                      alert('아이디, 비밀번호를 다시 한번 확인해주세요.')
                    }
                  })
                  .catch((error) => {
                    // console.error(error)
                  })
              })
          }}
        >
          <input
            className="login-input"
            placeholder="아이디(닉네임) 또는 아이디"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <input
            className="login-input"
            placeholder="비밀번호 입력"
            name="password"
            value={password}
            type="password"
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />

          <hr />
          <hr />
          {loginButton}

          <div className="login-footer">
            <p style={{ margin: '0 10px 0 0 ' }}>계정이 없으신가요?</p>
            <Link to="/SignUp" className="signup-link-text">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
