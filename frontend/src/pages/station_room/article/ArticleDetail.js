import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Button from '@mui/material/Button'
import StackerListItem from './StackerListItem'
import profile from '../assets/profile.png'

import '../Station.css'

function ArticleDetail(props) {
  const navigate = useNavigate()
  const [isfollowing, setIsfollow] = useState(true)
  const writer = props.info.writer
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
      <Button
        variant="contained"
        size="small"
        color="secondary"
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
      </Button>
    )
  }
  const stationInformation = props.info.stationInfo.content
  const tags = []
  for (let i = 0; i < props.info.stationInfo.tags.length; i++) {
    tags.push(
      <span key={i} style={{ fontWeight: 'bold' }}>
        {' '}
        # {props.info.stationInfo.tags[i]}
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
            src={profile}
            alt="profile"
            onClick={() => {
              navigate(`/MyPage/${writer.username}`)
            }}
            style={{ cursor: 'pointer' }}
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
          <span>{tags}</span>
        </p>
        <p style={{ color: 'gray', fontSize: '0.85em' }}>{createDate}</p>
      </div>
      <StackerListItem musicians={props.info.musicians}></StackerListItem>
    </div>
  )
}

export default ArticleDetail
