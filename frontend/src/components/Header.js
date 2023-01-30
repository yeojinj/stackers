import React from 'react'
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div>로고 이미지</div>
        <div>검색창</div>
        <div>로그인버튼 or 업로드버튼 + 프로필사진</div>
      </div>
    </header>
  )
}

export default Header
