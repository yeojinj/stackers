import React from 'react';
import logo from '../assets/logo.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img className="footer-logo-img" src={logo}></img>
          <p className="footer-version">버전 1.0.0</p>
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
          <GitHubIcon fontSize="large" />
          <div className="github-info">
            <h3 className='github-h3'>SSAFY 8기 공통 프로젝트</h3>
            <h3 className='github-h3'>TENTEN</h3>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
