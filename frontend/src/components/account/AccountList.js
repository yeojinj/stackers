import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import AccountListItem from './AccountListItem'

function AccountList() {
  const params = useParams()
  const profileUsername = params.username

  const [followingList, setFollowingList] = useState([])
  const [followerList, setFollowerList] = useState([])

  async function getFollowingList() {
    await axios({
      method: 'get',
      url: `/api/follow/following/${profileUsername}`
    })
      .then((res) => {
        setFollowingList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getFollowerList() {
    await axios({
      method: 'get',
      url: `/api/follow/follower/${profileUsername}`
    })
      .then((res) => {
        setFollowerList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (profileUsername) {
      getFollowingList()
      getFollowerList()
    }
  }, [profileUsername])

  const IsFollowingList = () => {
    if (followingList) {
      return (
        <>
          <div className="popular-tap">
            {followingList &&
              followingList.map((result, i) => {
                return (
                  <div key={i}>
                    <AccountListItem account={result} />
                  </div>
                )
              })}
          </div>
        </>
      )
    }
  }

  const IsFollowerList = () => {
    if (followerList) {
      return (
        <>
          <div className="popular-tap">
            {followerList &&
              followerList.map((result, i) => {
                return (
                  <div key={i}>
                    <AccountListItem account={result} />
                  </div>
                )
              })}
          </div>
        </>
      )
    }
  }
  const [currentTab, clickTab] = useState(0)

  const menuArr = [
    { i: 1, name: `${followerList.length} 팔로워`, content: IsFollowerList() },
    { i: 2, name: `${followingList.length} 팔로잉`, content: IsFollowingList() }
  ]

  const selectMenuHandler = (index) => {
    clickTab(index)
  }

  return (
    <>
      <div className="search-page">
        <div className="result">
          <div className="result-tap">
            <div className="tapmenu-ul">
              {menuArr.map((el, index) => (
                <li
                  key={el.i}
                  className={
                    index === currentTab ? 'submenu focused' : 'submenu'
                  }
                  onClick={() => {
                    selectMenuHandler(index)
                  }}
                >
                  {el.name}
                </li>
              ))}
            </div>
          </div>
          <div
            className="tab-content-1"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginLeft: '2%',
              marginTop: '2%'
            }}
          >
            {menuArr[currentTab].content}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountList
