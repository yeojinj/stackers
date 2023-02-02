import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/searchview.css'
import StationListItem from '../../components/station/StationListItem'

// 인기 탭에서는 검색 결과 (비디오 8개, 계정 4개) 자르기 -> 추후에 추가
function SearchView() {
  const [currentTab, clickTab] = useState(0)

  const searchResults = () => {
    const resultsListVideo = [1, 2, 3, 4, 5, 6, 7, 8]
    const resultsListAccount = [1, 2, 3, 4]

    return (
      <>
        <div className="popular-tap">
          <div className="popular-title">
            <span
              style={{
                marginLeft: '15px',
                fontSize: '21px',
                fontWeight: 'bold'
              }}
            >
              동영상
            </span>
            <span style={{ color: 'rgba(38, 38, 38, 1)' }}>더 알아보기</span>
          </div>
          <div className="popular-video">
            {resultsListVideo.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem isSearch={true} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="popular-tap">
          {/* 동영상, 더알아보기가 왜 옆에서 보일까요~? */}
          <p className="popular-title">
            <span>계정</span>
            <span style={{ textAlign: 'right' }}>더 알아보기</span>
          </p>
          {resultsListAccount.map((result, i) => {
            return <div key={i}>계정</div>
          })}
        </div>
      </>
    )
  }

  const menuArr = [
    { i: 1, name: '인기', content: searchResults() },
    { i: 2, name: '계정', content: '계정이 들어갈거예요' },
    { i: 3, name: '스택', content: '스택들이 들어갈거예요' }
  ]

  const selectMenuHandler = (index) => {
    clickTab(index)
  }

  return (
    <div className="search-page">
      <Header />
      <div className="result">
        <div className="result-tap">
          <div className="tapmenu-ul">
            {menuArr.map((el, index) => (
              <li
                key={el.i}
                className={index === currentTab ? 'submenu focused' : 'submenu'}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </div>
        </div>
        <div className="tab-content">{menuArr[currentTab].content}</div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchView
