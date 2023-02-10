import React, { useState } from 'react'
import AccountListItem from '../../components/account/AccountListItem'
import '../../styles/searchview.css'
import StationListItem from '../../components/station/StationListItem'

function SearchView() {
  // 더미데이터
  const station = [
    {
      id: 5,
      content: 'xptms',
      tags: ['happy', 'mood'],
      video: {
        id: 5,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '테스트용 비디',
        thumbnailPath: null
      }
    },
    {
      id: 6,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 6,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 7,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 7,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 8,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 8,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    }
  ]

  const [currentTab, clickTab] = useState(0)

  const moveStack = () => {
    clickTab(currentTab + 2)
  }

  function moveAccount() {
    clickTab(currentTab + 1)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const searchResults = () => {
    const resultsListAccount = [1, 2, 3, 4, 5, 6, 7]

    const cutVideoList = station.slice(0, 8)
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
                  <StationListItem
                    isSearch={true}
                    isRanking={false}
                    station={result}
                  />
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
            {station.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem
                    isSearch={true}
                    isRanking={false}
                    station={result}
                  />
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
    </div>
  )
}

export default SearchView
