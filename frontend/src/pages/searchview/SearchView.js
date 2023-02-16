import React, { useState, useEffect } from 'react'
import AccountListItem from '../../components/account/AccountListItem'
import './searchview.css'
import StationListItem from '../../components/station/StationListItem'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'

function SearchView() {
  const token = localStorage.getItem('accessToken')
  const location = useLocation()
  const keyword = location.state.keyword
  const [stationList, setStationList] = useState([])
  const [accountList, setAccountList] = useState([])

  // 검색키워드로 axios 요청하기
  async function searchList() {
    await axios
      .get(`/api/search/${keyword}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setStationList(res.data.stationList)
        setAccountList(res.data.memberList)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    searchList()
  }, [keyword])

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
          <div className="popular-title-account">
            <span className="popular-title-style">스테이션</span>
            {Array.isArray(stationList) && stationList.length !== 0 && (
              <span className="popular-more" onClick={moveStack}>
                더 알아보기
              </span>
            )}
          </div>
          <div
            className={
              stationList.length === 0 ? 'popular-video empty' : 'popular-video'
            }
          >
            {stationList.slice(0, 8).map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem
                    isSearch={true}
                    isIcon={true}
                    isRanking={false}
                    station={result}
                    saveList={stationList}
                  />
                </div>
              )
            })}
            {Array.isArray(stationList) && stationList.length === 0 && (
              <div className="search-not-found">
                <SentimentSatisfiedIcon
                  className="search-icon"
                  style={{
                    width: '35px',
                    height: '35px',
                    marginBottom: '10px',
                    color: '#c4c4c4e0'
                  }}
                />
                <div>
                  <span style={{ fontWeight: 'bold' }}>[{keyword}]</span> 로
                  조회된 스테이션이 없습니다.
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="popular-tap">
          <p className="popular-title-account">
            <span className="popular-title-style">계정</span>
            {Array.isArray(accountList) && accountList.length !== 0 && (
              <span className="popular-more" onClick={moveAccount}>
                더 알아보기
              </span>
            )}
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
            <div className="search-not-found">
              <SentimentSatisfiedIcon
                className="search-icon"
                style={{
                  width: '35px',
                  height: '35px',
                  marginBottom: '5px',
                  color: '#c4c4c4e0'
                }}
              />
              <div>
                <span style={{ fontWeight: 'bold' }}>[{keyword}]</span> 로
                조회된 계정이 없습니다.
              </div>
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
        </div>
        {accountList.length === 0 && (
          <div className="search-not-found">
            <SentimentSatisfiedIcon
              className="search-icon"
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '15px',
                color: 'rgba(227, 95, 173, 0.3)'
              }}
            />
            <div style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                [{keyword}] 로 조회된 계정이 없습니다.
              </span>
            </div>
            다른 검색어를 통해 다시 검색해보세요!
          </div>
        )}
        {accountList.length !== 0 && (
          <div className="account-result">
            총 <b>{accountList.length}</b>건의 계정이 검색되었습니다.
          </div>
        )}
      </>
    )
  }

  const searchStacks = () => {
    return (
      <>
        <div className="popular-tap horizonal">
          {stationList &&
            stationList.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem
                    isSearch={true}
                    isRanking={false}
                    isIcon={true}
                    station={result}
                    saveList={stationList}
                  />
                </div>
              )
            })}
        </div>
        {stationList.length === 0 && (
          <div className="search-not-found">
            <SentimentSatisfiedIcon
              className="search-icon"
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '15px',
                color: 'rgba(227, 95, 173, 0.3)'
              }}
            />
            <div style={{ marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                [{keyword}] 로 조회된 스테이션이 없습니다.
              </span>
            </div>
            다른 검색어를 통해 다시 검색해보세요!
          </div>
        )}
        {stationList.length !== 0 && (
          <div className="stack-result">
            총 <b>{stationList.length}</b>건의 스테이션이 검색되었습니다.
          </div>
        )}
      </>
    )
  }
  const menuArr = [
    { i: 1, name: '인기', content: searchResults() },
    { i: 2, name: '계정', content: searchAccounts() },
    { i: 3, name: '스테이션', content: searchStacks() }
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
        <div className="tab-content-1">{menuArr[currentTab].content}</div>
      </div>
    </div>
  )
}

export default SearchView
