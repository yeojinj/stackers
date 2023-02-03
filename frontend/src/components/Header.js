import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import search from '../assets/search.svg'
import '../styles/header.css'

function Header() {
  const [keyword, setKeyword] = useState('')
  const onChangeData = (e) => {
    setKeyword(e.currentTarget.value)
  }
  const navigate = useNavigate()
  const navigateToSearchView = () => {
    navigate('/SearchView')
  }
  const navigateToMain = () => {
    navigate('/Mainroom')
  }

  return (
    <header className="header">
      <div className="header-container">
        <img className="logo-img" src={logo} onClick={navigateToMain}></img>
        <div>
          {/* 검색창 */}
          <div className="header-search">
            <input
              className="search-input"
              placeholder="검색어를 입력해주세요."
              value={keyword}
              onChange={onChangeData}
            />
            <img
              onClick={navigateToSearchView}
              className="search-icon"
              src={search}
            />
            <div className="autocomplete-box">
              <div>
                <div>
                  <a href=""></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 로그인버튼 or 업로드버튼 + 프로필사진 */}
        <button className="login-btn">로그인</button>
      </div>
    </header>
  )
}

export default Header
