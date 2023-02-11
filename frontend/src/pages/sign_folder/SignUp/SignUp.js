/* eslint-disable */
import React, { useState } from 'react'
import LogoImage from './LogoImage.png'
import LogoText from './LogoText.png'
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  return (
    <div>
      <div className="signup-container">
        <div className="signup-header">
          <img src={LogoImage} alt="LogoImage" width="10%" />
          <div className="signup-header-logo-text">
            <img src={LogoText} alt="LogoText" width="20%" />에 오신 것을
            환영합니다.
          </div>
        </div>
        <form
          className="signup-form"
          onSubmit={(event) => {
            event.preventDefault()
            axios({
              method: 'post',
              url: '/api/member/join',
              data: {
                username: username,
                password: password,
                email: email
              }
            })
              .then((response) => {
                console.log('[회원가입 성공] : ', response)
                navigate('/')
              })
              .catch((error) => {
                console.log('[회원가입 실패] : ', error.response)
              })
          }}
        >
          <input
            className="signup-input"
            placeholder="아이디"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <input
            className="signup-input"
            placeholder="비밀번호(알파벳, 특수문자를 포함한 8~10자로 구성)"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <input
            className="signup-input"
            placeholder="이메일"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <div className="email-validation-div">
            <input className="signup-input" placeholder="인증번호 입력" />
            <button className="email-check-button">전송</button>
          </div>
          <hr className="signup-line" />
          <button className="signup-button" type="submit">
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
