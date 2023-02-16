/* eslint-disable */
import React, { useEffect, useState } from 'react'
import LogoImage from './LogoImage.svg'
import LogoText from './LogoText.svg'

import './SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mailConfirm, setMailConfirm] = useState('') // 입력하는 인증번호
  const [authentication, setAuthentication] = useState(null) // 받아온 인증번호
  const navigate = useNavigate()
  const [pwType, setPwType] = useState('password')

  const [isSend, setIsSend] = useState(false) // 메일 전송했는지
  const [isUsername, setIsUsername] = useState(null)
  const [isPassword, setIsPassword] = useState(null)
  const [isEmail, setIsEmail] = useState(null) // 인증번호 일치여부
  var test_spc = /\W|\s/g // 특수문자, 띄어쓰기
  var password_spc1 = /[a-z]/g // 영어 소문자
  var password_spc5 = /[A-Z]/g // 영어 대문자
  var password_spc2 = /[0-9]/g // 숫자
  var password_spc3 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g // 특수문자
  var password_spc4 = /\s/g // 공백

  // 가입버튼 활성화
  const [membership, setMembership] = useState(true)
  useEffect(() => {
    if (
      0 < username.length &&
      0 < password.length &&
      0 < email.length &&
      0 < mailConfirm.length
    ) {
      if (isUsername && isPassword && isEmail) {
        setMembership(false)
        // console.log('버튼활성화 됨')
      } else {
        // console.log('버튼활성화 안됨.')
      }
    } else {
      // console.log('버튼활성화 안됨.')
    }
  }, [isUsername, isPassword, isEmail])

  // username 기본 CSS
  const [usernameCSS, setUsernameCSS] = useState('signup-input')

  // password 기본 CSS
  const [passwordCSS, setPasswordCSS] = useState('signup-input')

  // email 기본 CSS
  const [emailCSS, setEmailCSS] = useState('signup-input')

  // 인증번호 확인 CSS
  const [secuCSS, setSecuCSS] = useState('signup-input')

  // usernameCSS
  useEffect(() => {
    if (isUsername === null) {
    } else if (isUsername) {
      // True일때 css
      setUsernameCSS('signup-input-success')
    } else {
      // False일때 css
      setUsernameCSS('signup-input-fail')
    }
  }, [isUsername])

  // passwordCSS
  useEffect(() => {
    if (isPassword === null) {
    } else if (isPassword) {
      // True일때 css
      setPasswordCSS('signup-input-success')
    } else {
      // False일때 css
      setPasswordCSS('signup-input-fail')
    }
  }, [isPassword])

  // emailCSS
  useEffect(() => {
    if (isSend === false) {
    } else if (isSend) {
      setEmailCSS('signup-input-success')
    } else {
      setEmailCSS('signup-input-fail')
    }
  }, [isSend])

  // 인증번호 확인 CSS
  useEffect(() => {
    if (isEmail === null) {
    } else if (isEmail) {
      setSecuCSS('signup-input-success')
    } else {
      setSecuCSS('signup-input-fail')
    }
  }, [isEmail])

  //password type
  useEffect(() => {
    if (!membership) {
      setPwType('password')
    } else {
      setPwType('text')
    }
  }, [membership])
  // 전송, 확인 버튼
  let emailButton = null
  if (!isSend) {
    emailButton = (
      <button
        className="email-check-button"
        type="button"
        onClick={() => {
          alert(`전송중입니다.
확인 후 입력해주세요.`)
          axios({
            method: 'post',
            url: '/api/mail/mail-confirm',
            data: {
              email: email
            }
          })
            .then((response) => {
              console.log('[인증번호 전송] : ', response.data)
              setAuthentication(response.data)
              setIsSend(true)
            })
            .catch((error) => {
              alert('이메일 주소를 다시 입력해주세요.')
              console.log('[인증번호 전송 실패] : ', error.response)
              console.log('올바른 이메일 양식으로 적어주세요.')
            })
        }}
      >
        전송
      </button>
    )
  } else if (isSend) {
    emailButton = (
      <button
        className="email-check-button"
        type="button"
        onClick={() => {
          if (mailConfirm === authentication) {
            setIsEmail(true)
            // console.log('인증번호 통과')
          } else {
            setIsEmail(false)
            // console.log('인증번호 탈락')
            alert('인증번호를 다시 입력해주세요.')
          }
        }}
      >
        확인
      </button>
    )
  }

  //signup-button
  let signupButton = null
  if (membership) {
    signupButton = (
      <button className="signup-button" type="submit" disabled={membership}>
        가입하기
      </button>
    )
  } else if (!membership) {
    signupButton = (
      <button className="signup-button-able" type="submit">
        가입하기
      </button>
    )
  }

  const [idMessage, setIdMessage] = useState(null)
  const [pwMessage, setPwMessage] = useState(null)
  return (
    <div>
      <div className="signup-container">
        <div className="signup-header">
          <img src={LogoImage} alt="LogoImage" width="10%" />
          <div className="signup-header-logo-text">
            <img src={LogoText} alt="LogoText" width="27%" />에 오신 것을
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
          <div className="input-and-messages">
            <input
              className={usernameCSS}
              placeholder="아이디(5~20자 영어 소문자, 숫자로 구성)"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              // usernameCSS 값 변경 조건
              onBlur={() => {
                if (5 <= username.length && username.length <= 20) {
                  // console.log('username 아이디 길이 통과')
                  if (!test_spc.test(username)) {
                    // 특수문자, 공백 미포함시
                    // console.log('username 특수문자, 공백 없어요 통과')
                    if (username === username.toLowerCase()) {
                      // 소문자만 있는지.
                      // console.log('username 조건 최종통과')
                      axios({
                        method: 'get',
                        url: `/api/member/check-username/${username}`
                      })
                        .then((response) => {
                          // console.log(response.data)
                          if (response.data) {
                            setIdMessage('사용가능한 아이디입니다.')
                            setIsUsername(true)
                          } else {
                            setIdMessage('이미 존재하는 아이디입니다.')
                            setIsUsername(false)
                          }
                        })
                        .catch((error) => {
                          // console.log(error)
                        })
                    } else {
                      setIsUsername(false)
                      setIdMessage(
                        '아이디는 5~20자 영어 소문자, 숫자로 구성해야 합니다.'
                      )
                    }
                  } else {
                    setIdMessage('아이디에 특수문자, 공백, 한글이 있어요.')
                    setIsUsername(false)
                  }
                } else {
                  // console.log('username 길이 탈락')
                  setIdMessage(
                    '아이디는 5~20자 영어 소문자, 숫자로 구성해야 합니다.'
                  )
                  setIsUsername(false)
                }
              }}
            />
            <span className="small-message">{idMessage}</span>
          </div>
          <div className="input-and-messages">
            <input
              className={passwordCSS}
              placeholder="비밀번호(알파벳, 숫자, 특수문자를 포함한 8~16자로 구성)"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              // password 값 변경 조건
              onBlur={() => {
                if (
                  8 <= password.length &&
                  password.length <= 16 &&
                  password.length !== 0
                ) {
                  // console.log('비밀번호 길이 통과')
                  if (
                    password_spc1.test(password) &&
                    password_spc2.test(password) &&
                    password_spc3.test(password) &&
                    !password_spc4.test(password) &&
                    password_spc5.test(password)
                  ) {
                    setIsPassword(true)
                    // console.log('비밀번호 통과')
                  } else {
                    setPwMessage(
                      '비밀번호는 영어소문자, 영어대문자, 숫자, 특수문자를 포함시켜주세요. 공백은 제외!'
                    )
                    setIsPassword(false)
                  }
                } else {
                  setPwMessage(
                    '비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함시켜주세요. 공백은 제외!'
                  )
                  setIsPassword(false)
                }
              }}
            />
            <span className="small-message">{pwMessage}</span>
          </div>
          <input
            className={emailCSS}
            placeholder="이메일"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <div className="email-validation-div">
            <input
              className={secuCSS}
              placeholder="인증번호 입력"
              value={mailConfirm}
              onChange={(event) => {
                setMailConfirm(event.target.value)
              }}
            />
            {emailButton}
          </div>
          <hr className="signup-line" />
          {signupButton}
        </form>
      </div>
    </div>
  )
}

export default SignUp
