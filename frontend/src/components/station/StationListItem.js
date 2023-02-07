import React, { useEffect, useState, useRef } from 'react'
import '../../styles/stationlistitem.css'
import profileTest from '../../assets/profileTest.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

function StationListItem({ isRanking, isSearch, station }) {
  const [staion, setStation] = useState()

  // 검색 페이지 조회 연결 후 아래 stationInfo 데이터 삭제
  const stationInfo = {
    video_url: 'https://webrtc.github.io/samples/src/video/chrome.webm',
    video_description: '비디오 설명이에요 비디오 설명이에요 비디오 설명이에요',
    video_tags: ['#disco', '#music', '#dance', '#music', '#guitar'],
    profile_img: profileTest,
    username: 'apricot',
    video_likes: 12000
  }

  const videoRef = useRef(null)

  useEffect(() => {
    setStation(station)
    console.log('mainroom 에서 보낸 데이터를 station 변수에 넣기', staion)
  }, [])

  useEffect(() => {
    IsRanking()
    IsSearch()
  }, [])

  // 마우스 오버시 비디오 재생, 마우스 리브시 비디오 일시정지
  function playVideo() {
    return videoRef.current.play()
  }
  function pauseVideo() {
    return videoRef.current.pause()
  }

  // 메인페이지 스테이션 조회
  const IsRanking = () => {
    // 스테이션 랭킹
    if (isRanking) {
      return (
        <>
          {/* 썸네일 */}
          {/* <img
            src="station.video.thumbnailPath"
            className="thumbnail-style"
          ></img> */}
          <video
            ref={videoRef}
            id="staion"
            className="video-style"
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            loop
          ></video>
        </>
      )
    } else {
      // 완성, 미완성 스테이션
      return (
        <>
          <video
            ref={videoRef}
            className="video-style"
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            loop
          ></video>
          <p className="station-description">{station.content}</p>
          <div className="station-tag">
            {station.tags.map((tag, i) => {
              return `#${tag} `
            })}
          </div>
        </>
      )
    }
  }

  // 검색페이지에서 데이터 받을 때 다시 해보기
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
          <video
            ref={videoRef}
            className={isSearch ? 'video-style-search' : 'video-style'}
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            loop
          ></video>
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

  return (
    <div className={isSearch ? 'station-item-search' : 'station-item'}>
      <IsRanking />
      <IsSearch />
    </div>
  )
}

export default StationListItem
