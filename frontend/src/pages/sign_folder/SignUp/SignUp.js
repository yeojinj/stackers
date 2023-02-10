/* eslint-disable */
import React, { useEffect, useState } from 'react'
import LogoImage from './LogoImage.png'
import LogoText from './LogoText.png'
import './SignUp.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LogIn from '../LogIn/LogIn.js'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      <div className="SignUp">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p>
            <img src={LogoImage} alt="LogoImage" />
          </p>
          <div style={{ display: 'flex', margin: '0px' }}>
            <img src={LogoText} alt="LogoText" />
            <h3
              style={{
                margin: '0px',
                fontSize: '30px'
              }}
            >
              에 오신 것을 환영합니다.
            </h3>
          </div>
        </div>
        <form
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
                console.log(response)
                navigate('/')
              })
              .catch((error) => {
                console.log(error.response)
              })
          }}
        >
          <TextField
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
          <TextField
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
          <TextField
            placeholder="이메일"
            size="medium"
            style={{ width: '100%', marginBottom: '25px' }}
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '25px'
            }}
          >
            <TextField
              placeholder="인증번호 입력"
              size="medium"
              style={{ width: '85%' }}
            />
            <Button
              variant="contained"
              className="LogIn-button"
              style={{
                height: '55px',
                backgroundColor: 'rgba(217, 217, 217, 1)',
                color: 'black'
              }}
            >
              전송
            </Button>
          </div>
          <hr style={{ margin: '0px 0px 25px 0px' }} />
          <Button
            variant="contained"
            className="LogIn-button"
            style={{
              width: '100%',
              height: '55px',
              backgroundColor: 'rgba(217, 217, 217, 1)',
              color: 'black',
              marginBottom: '30px'
            }}
            type="submit"
          >
            가입하기
          </Button>
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
