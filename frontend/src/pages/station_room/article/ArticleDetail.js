import React, { useState } from 'react'
import Button from '@mui/material/Button'
import StackerListItem from './StackerListItem'
// import profile from '../assets/profile.png'
import '../Station.css'
import profile from '../assets/profile.png'

function ArticleDetail(props) {
  const [isfollowing, setIsfollow] = useState(true)
  const writer = props.Info.writer
  let followbutton = null
  if (!isfollowing) {
    followbutton = (
      <Button variant="outlined" size="small" color="secondary">
        팔로우
      </Button>
    )
  } else if (isfollowing) {
    followbutton = (
      <Button variant="contained" size="small" color="secondary">
        팔로잉
      </Button>
    )
  }
  const stationInformation = `안녕하세요. 이것은 나의 첫 비디오입니다.
만나서 반갑습니다~~ #첫인사 #새해복많이받으세요`
  const createDate =
    props.Info.regTime.substr(0, 4) +
    '.' +
    props.Info.regTime.substr(5, 2) +
    '.' +
    props.Info.regTime.substr(8, 2)
  return (
    <div className="information">
      <div className="station-information">
        <div className="station-profile">
          <img src={profile} alt="profile" />
          <div className="station-profile-name_nickname">
            <p className="station-profile-id">{writer.username}</p>
            <p className="station-profile-nickname">{writer.nickname}</p>
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
        <p className="station-usercontent">{stationInformation}</p>
        <p style={{ color: 'gray' }}>{createDate}</p>
      </div>
      <StackerListItem musicians={props.Info.musicians}></StackerListItem>
    </div>
  )
}

export default ArticleDetail
