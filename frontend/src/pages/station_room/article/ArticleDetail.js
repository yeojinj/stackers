import React, { useState } from 'react'
import Button from '@mui/material/Button'
import StackerListItem from './StackerListItem'
// import profile from '../assets/profile.png'
import '../Station.css'
import profile from '../assets/profile.png'

function ArticleDetail() {
  const [isfollowing, setIsfollow] = useState(true)
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
        팔로우
      </Button>
    )
  }
  const stationInformation = `안녕하세요. 이것은 나의 첫 비디오입니다.
만나서 반갑습니다~~ #첫인사 #새해복많이받으세요`
  return (
    <div className="information">
      <div className="station-information">
        <div className="station-profile">
          <img src={profile} alt="profile" />
          <div className="station-profile-name_nickname">
            <h3 className="station-profile-id">dearSanta</h3>
            <p className="station-profile-nickname">김싼타</p>
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
      </div>
      <StackerListItem></StackerListItem>
    </div>
  )
}

export default ArticleDetail
