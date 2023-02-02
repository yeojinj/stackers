import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/stationlistitem.css'
import profileTest from '../../assets/profileTest.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

StationListItem.propTypes = {
  isRanking: PropTypes.bool,
  isSearch: PropTypes.bool
}

function StationListItem({ isRanking, isSearch }) {
  // const [autoPlay, setPlay] = useState(false)

  // 후에 stationInfo 는 useState 에서 기본 값으로 설정, 받아올 데이터 형식으로 변환하기
  const stationInfo = {
    video_url: 'https://webrtc.github.io/samples/src/video/chrome.webm',
    video_description: '비디오 설명이에요 비디오 설명이에요 비디오 설명이에요',
    video_tags: ['#disco', '#music', '#dance', '#music', '#guitar'],
    profile_img: profileTest,
    username: 'apricot',
    video_likes: 12000
  }
  // const [info, setInfo] = useState(stationInfo)
  // const setInfo = () => {
  //   const updateInfo = [...info, { props로 받아올 데이터 }]
  //   setInfo(updateInfo)
  // }

  const IsRanking = () => {
    if (isRanking) {
      return null
    } else {
      return (
        <>
          <p className="station-description">{stationInfo.video_description}</p>
          <div className="station-tag">{stationInfo.video_tags}</div>
        </>
      )
    }
  }

  const IsSearch = () => {
    let likesResult = ''
    const modifyLikes = stationInfo.video_likes
    if (modifyLikes >= 1000) {
      likesResult = `${Math.floor(modifyLikes / 1000)}k`
    } else {
      likesResult = modifyLikes
    }
    if (isSearch) {
      return (
        <>
          <div className="station-account">
            <div className="profile-box">
              <img className="profile-img" src={stationInfo.profile_img}></img>
            </div>
            <div className="account-name">{stationInfo.username}</div>
            <FavoriteBorderIcon
              style={{ width: '17px', height: '17px', marginTop: '3px' }}
            />
            <div className="video-likes">{likesResult}</div>
          </div>
        </>
      )
    }
  }

  // const updatePlay = (e) => {
  //   // console.log(autoPlay)
  //   setPlay(!autoPlay)
  //   // console.log(autoPlay)
  // }

  // useEffect(() => {
  //   console.log(autoPlay)
  // }, [autoPlay])

  return (
    <div className={isSearch ? 'station-item-search' : 'station-item'}>
      {/* <img src={logo}></img> */}
      <video
        className={isSearch ? 'video-style-search' : 'video-style'}
        src={stationInfo.video_url}
        autoPlay={true}
        // onMouseOver={updatePlay}
        // onMouseLeave={updatePlay}
        loop
      ></video>
      <IsRanking />
      <IsSearch />
    </div>
  )
}

export default StationListItem
