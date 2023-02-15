import React from 'react'
import logo from '../assets/logo.svg'
import github from '../assets/github.svg'
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img className="footer-logo-img" src={logo}></img>
          <p className="footer-version">
            버전 <b>1.0.0</b>
          </p>
        </div>
        <div className="team-colors">
          <div className="team-color-turquoise"></div>
          <div className="team-color-sage"></div>
          <div className="team-color-magenta"></div>
          <div className="team-color-flamingo"></div>
          <div className="team-color-apricot"></div>
          <div className="team-color-lapis"></div>
        </div>
        <div className="github">
          <img src={github} />
          <div className="github-info">
            <p className="github-h3">SSAFY 8기 공통 프로젝트</p>
            <b>
              <p className="github-h3">TENTEN</p>
            </b>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
