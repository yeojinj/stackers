import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

import StackerListItem from './StackerListItem'
import '../Station.css'

function ArticleDetail(props) {
  const navigate = useNavigate()
  const [isfollowing, setIsfollow] = useState(true)
  const writer = props.info.writer

  // console.log(writer)
  const LoginUser = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/follow/isfollowing/${writer.username}`,
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
      .then((response) => {
        setIsfollow(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [writer.username])
  let followbutton = null

  if (LoginUser.username !== writer.username) {
    // 다른사람의 게시물을 볼 경우
    if (!isfollowing) {
      followbutton = (
        <button
          className="article-follow-button"
          onClick={() => {
            axios({
              method: 'post',
              url: '/api/follow',
              data: {
                username: writer.username
              },
              headers: {
                Authorization: localStorage.getItem('accessToken')
              }
            })
              .then(() => {
                setIsfollow(true)
              })
              .catch((err) => {
                console.log(err)
              })
          }}
        >
          팔로우
        </button>
      )
    } else if (isfollowing) {
      followbutton = (
        <button
          className="article-follow-button following-btn"
          onClick={() => {
            axios({
              method: 'delete',
              url: '/api/follow',
              data: {
                username: writer.username
              },
              headers: {
                Authorization: localStorage.getItem('accessToken')
              }
            })
              .then((res) => {
                setIsfollow(false)
              })
              .catch((err) => {
                console.log(err)
              })
          }}
        >
          팔로잉
        </button>
      )
    }
  } else {
    // 자기 자신의 게시물을 볼 경우.
    followbutton = (
      <button
        className="article-follow-button"
        onClick={() => {
          alert('나는 나 자신의 영원한 팔로워입니다 ><')
        }}
      >
        팔로우
      </button>
    )
  }
  const stationInformation = props.info.stationInfo.content
  const tags = []
  for (let i = 0; i < props.info.stationInfo.tags.length; i++) {
    tags.push(
      <span
        key={i}
        style={{
          fontWeight: 'bold',
          marginRight: '3px',
          fontSize: '0.88em',
          color: 'rgba(42, 32, 150, 0.9)'
        }}
      >
        #{props.info.stationInfo.tags[i]}
      </span>
    )
  }
  const createDate =
    props.info.regTime.substr(0, 4) +
    '.' +
    props.info.regTime.substr(5, 2) +
    '.' +
    props.info.regTime.substr(8, 2)
  return (
    <div className="information">
      <div className="station-information">
        <div className="station-profile">
          <img
            src={writer.imgPath}
            className="station-profile-picture"
            alt="스태커 프로필 사진"
            onClick={() => {
              navigate(`/MyPage/${writer.username}`)
            }}
          />
          <div className="station-profile-name_nickname">
            <div className="station-profile-id">{writer.username}</div>
            <div className="station-profile-nickname">{writer.nickname}</div>
          </div>
          <div
            className="station-follow"
            onClick={(event) => {
              event.preventDefault()
              setIsfollow(!isfollowing)
            }}
          >
            {followbutton}
          </div>
        </div>
        <p className="station-usercontent">
          {stationInformation}
          <span style={{ marginLeft: '8px' }}>{tags}</span>
        </p>
        <p style={{ color: 'gray', fontSize: '0.85em' }}>{createDate}</p>
      </div>
      <StackerListItem musicians={props.info.musicians}></StackerListItem>
    </div>
  )
}

export default ArticleDetail
