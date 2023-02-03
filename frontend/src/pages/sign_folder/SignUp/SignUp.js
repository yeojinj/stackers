import React from 'react'
import LogoImage from './LogoImage.png'
import LogoText from './LogoText.png'
import './SignUp.css'

function SignUp() {
  return (
    <div>
      <div className="SignUp">
        <div style={{ margin: 'auto' }}>
          <p>
            <img src={LogoImage} alt="LogoImage" style={{ margin: 'auto' }} />
          </p>
          <p style={{ display: 'flex' }}>
            <img src={LogoText} alt="LogoText" />
            <h3 style={{ margin: '0px' }}>에 오신 것을 환영합니다.</h3>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
