import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AccountListItem from '../../components/account/AccountListItem'
import '../../styles/searchview.css'
import StationListItem from '../../components/station/StationListItem'

function SearchView() {
  const [currentTab, clickTab] = useState(0)

  const moveStack = () => {
    clickTab(currentTab + 2)
  }

  function moveAccount() {
    clickTab(currentTab + 1)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const searchResults = () => {
    const resultsListVideo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const resultsListAccount = [1, 2, 3, 4, 5, 6, 7]

    const cutVideoList = resultsListVideo.slice(0, 8)
    const cutAccountList = resultsListAccount.slice(0, 4)

    return (
      <>
        <div className="popular-tap">
          <div className="popular-title-video">
            <span className="popular-title-style">동영상</span>
            <span className="popular-more" onClick={moveStack}>
              더 알아보기
            </span>
          </div>
          <div className="popular-video">
            {cutVideoList.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem isSearch={true} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="popular-tap">
          <p className="popular-title-account">
            <span className="popular-title-style">계정</span>
            <span className="popular-more" onClick={moveAccount}>
              더 알아보기
            </span>
          </p>
          {cutAccountList.map((result, i) => {
            return (
              <div key={i}>
                <AccountListItem />
              </div>
            )
          })}
        </div>
      </>
    )
  }

  const searchAccounts = () => {
    const resultsListAccount = [1, 2, 3, 4, 5, 6, 7]
    return (
      <>
        <div className="popular-tap">
          {resultsListAccount.map((result, i) => {
            return (
              <div key={i}>
                <AccountListItem />
              </div>
            )
          })}
          <div className="account-result">
            총 <b>{resultsListAccount.length}</b>건의 계정이 검색되었습니다.
          </div>
        </div>
      </>
    )
  }

  const searchStacks = () => {
    const resultsListVideo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return (
      <>
        <div className="popular-tap">
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
        <div className="stack-result">
          총 <b>{resultsListVideo.length}</b>건의 스택이 검색되었습니다.
        </div>
      </>
    )
  }
  const menuArr = [
    { i: 1, name: '인기', content: searchResults() },
    { i: 2, name: '계정', content: searchAccounts() },
    { i: 3, name: '스택', content: searchStacks() }
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
