import React from 'react';
import logo from '../assets/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img className="logo-img" src={logo}></img>
        <div>
          {/* 검색창 */}
          <div className="header-search">
            <input
              className="search-input"
              placeholder="검색어를 입력해주세요."
            ></input>
            <SearchIcon />
          </div>
        </div>
        {/* 로그인버튼 or 업로드버튼 + 프로필사진 */}
        <button className="login-btn">로그인</button>
      </div>
    </header>
  );
}

export default Header;
