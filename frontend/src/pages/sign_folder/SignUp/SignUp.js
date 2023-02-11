/* eslint-disable */
import React, { useEffect, useState } from 'react'
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

  const [isUsername, setIsUsername] = useState(null)
  const [isPassword, setIsPassword] = useState(null)
  const [isEmail, setIsEmail] = useState(null)
  // username 기본 CSS
  const [usernameCSS, setUsernameCSS] = useState({
    width: '100%',
    marginBottom: '25px'
  })

  // password 기본 CSS
  const [passwordCSS, setPasswordCSS] = useState({
    width: '100%',
    marginBottom: '25px'
  })

  // usernameCSS
  useEffect(() => {
    if (isUsername === null) {
    } else if (isUsername) {
      // True일때 css
      setUsernameCSS(() => {
        return {
          width: '100%',
          marginBottom: '25px',
          border: '1px solid rgba(42, 32, 150, 1)',
          borderRadius: 4
        }
      })
    } else {
      // False일때 css
      setUsernameCSS(() => {
        return {
          width: '100%',
          marginBottom: '25px',
          border: '1px solid rgba(172, 0, 143, 1)',
          borderRadius: 4
        }
      })
    }
  }, [isUsername])

  // passwordCSS
  useEffect(() => {
    if (isPassword === null) {
    } else if (isPassword) {
      // True일때 css
      setPasswordCSS(() => {
        return {
          width: '100%',
          marginBottom: '25px',
          border: '1px solid rgba(42, 32, 150, 1)',
          borderRadius: 4
        }
      })
    } else {
      // False일때 css
      setPasswordCSS(() => {
        return {
          width: '100%',
          marginBottom: '25px',
          border: '1px solid rgba(172, 0, 143, 1)',
          borderRadius: 4
        }
      })
    }
  }, [isPassword])
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
            size="medium"
            style={usernameCSS}
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            // usernameCSS 값 변경 조건
            onBlur={() => {
              if (1 <= username.length && username.length <= 8) {
                setIsUsername(true)
              } else {
                setIsUsername(false)
              }
            }}
          />
          <input
            className="signup-input"
            placeholder="비밀번호(알파벳, 특수문자를 포함한 8~10자로 구성)"
            size="medium"
            style={passwordCSS}
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            // password 값 변경 조건
            onBlur={() => {
              if (8 <= password.length && password.length <= 12) {
                setIsPassword(true)
              } else {
                setIsPassword(false)
              }
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
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box>
            <LogIn handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default SignUp
