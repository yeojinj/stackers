import React, { useState, useEffect } from 'react'
import AccountListItem from '../../components/account/AccountListItem'
import '../../styles/searchview.css'
import StationListItem from '../../components/station/StationListItem'
import axios from 'axios'
// import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function SearchView() {
  const token = localStorage.getItem('accessToken')
  // const location = useLocation()
  // const keyword = location.state.keyword
  const keyword = useSelector((state) => {
    return state.SearchKeyword.keyword
  })
  const [stationList, setStationList] = useState([])
  const [accountList, setAccountList] = useState([])
  // 더미데이터, 연동시 삭제
  // const station = [
  //   {
  //     id: 5,
  //     content: 'xptms',
  //     tags: ['happy', 'mood'],
  //     video: {
  //       id: 5,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '테스트용 비디',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 6,
  //     content: '향기로운 음악의 세계~',
  //     tags: ['smell_so_good', 'umm'],
  //     video: {
  //       id: 6,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 7,
  //     content: '향기로운 음악의 세계~',
  //     tags: ['smell_so_good', 'umm'],
  //     video: {
  //       id: 7,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 8,
  //     content: '향기로운 음악의 세계~',
  //     tags: ['smell_so_good', 'umm'],
  //     video: {
  //       id: 8,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 9,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 9,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 10,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 10,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 11,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 11,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 12,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 12,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 13,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 13,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   },
  //   {
  //     id: 14,
  //     content: '향기로운 음악의 세계~ 같이 들어요',
  //     tags: ['smell_so_good', 'umm', 'yahoo'],
  //     video: {
  //       id: 14,
  //       videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
  //       videoName: null,
  //       videoOriName: '2023_02_07_11:08',
  //       thumbnailPath: null
  //     }
  //   }
  // ]

  // 검색키워드로 axios 요청하기
  async function searchList() {
    console.log('[스토어에서 가져온 키워드]', keyword)
    await axios
      .get(`/api/search/${keyword}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setStationList(res.data.stationList)
        setAccountList(res.data.memberList)
        console.log('[스테이션]', res.data.stationList)
        console.log('[계정]', res.data.memberList)
        console.log('받아온 검색결과들', res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    searchList()
  }, [keyword])

  // useEffect(() => {
  //   setStationList(search.stationList)
  //   setAccountList(search.memberList)
  // }, [search])

  const [currentTab, clickTab] = useState(0)

  const moveStack = () => {
    clickTab(currentTab + 2)
  }

  function moveAccount() {
    clickTab(currentTab + 1)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const searchResults = () => {
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
            {stationList.slice(0, 8).map((result, i) => {
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
            {Array.isArray(stationList) && stationList.length === 0 && (
              <div style={{ marginTop: '100px' }}>
                <b>[{keyword}]</b> 로 조회된 영상이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className="popular-tap">
          <p className="popular-title-account">
            <span className="popular-title-style">계정</span>
            <span className="popular-more" onClick={moveAccount}>
              더 알아보기
            </span>
          </p>
          {accountList &&
            accountList.slice(0, 8).map((result, i) => {
              return (
                <div key={i}>
                  <AccountListItem account={result} />
                </div>
              )
            })}
          {Array.isArray(accountList) && accountList.length === 0 && (
            <div style={{ marginTop: '100px' }}>
              <b>[{keyword}]</b> 로 조회된 계정이 없습니다.
            </div>
          )}
        </div>
      </>
    )
  }

  const searchAccounts = () => {
    return (
      <>
        <div className="popular-tap">
          {accountList &&
            accountList.map((result, i) => {
              return (
                <div key={i}>
                  <AccountListItem account={result} />
                </div>
              )
            })}
          <div className="account-result">
            총 <b>{accountList.length}</b>건의 계정이 검색되었습니다.
          </div>
        </div>
      </>
    )
  }

  const searchStacks = () => {
    return (
      <>
        <div className="popular-tap">
          <div className="popular-video">
            {stationList &&
              stationList.map((result, i) => {
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
          <div className="stack-result">
            총 <b>{stationList.length}</b>건의 스택이 검색되었습니다.
          </div>
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
