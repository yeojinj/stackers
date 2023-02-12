import React, { useEffect, useRef } from 'react'
import '../../styles/stationlistitem.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import { useNavigate } from 'react-router-dom'

function StationListItem({ isRanking, isSearch, station, index }) {
  // const [station, setStation] = useState()

  const videoRef = useRef(null)

  // useEffect(() => {
  //   setStation(station)
  //   console.log('mainroom 에서 보낸 데이터를 station 변수에 넣기', station)
  // }, [])

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

  // const navigate = useNavigate()
  // const gotoDetail = (id) => {
  //   navigate(`/StationRoom/${id}`)
  // }

  // 메인페이지 스테이션 조회
  const IsRanking = () => {
    // 스테이션 랭킹
    if (isRanking) {
      return (
        <div className="station-item__ranks">
          <video
            ref={videoRef}
            id="station"
            className="video-style ranks"
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            // onClick={gotoDetail(station.id)}
            loop
          ></video>
          <p className="station-rank">{index}</p>
        </div>
      )
    } else if (!isSearch) {
      // 완성, 미완성, 마이페이지 스테이션
      return (
        <div className="station-item__items">
          <video
            ref={videoRef}
            className="video-style non-ranks"
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            // onClick={gotoDetail(station.id)}
            loop
          ></video>
          <div className="video-text">
            <p className="station-description">{station.content}</p>
            <div className="station-tag">
              {station.tags &&
                station.tags.map((tag, i) => {
                  return `#${tag} `
                })}
            </div>
          </div>
        </div>
      )
    }
  }

  // 검색페이지에서 데이터 받을 때 다시 해보기
  const IsSearch = () => {
    let likesResult = ''
    if (station.heartCnt) {
      const modifyLikes = station.heartCnt
      if (modifyLikes >= 1000) {
        likesResult = `${Math.floor(modifyLikes / 1000)}k`
      } else {
        likesResult = modifyLikes
      }
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
            // onClick={gotoDetail(station.id)}
            loop
          ></video>
          <div className="station-info">
            <p className="station-description">{station.content}</p>
            <div className="station-tag">
              {station.tags &&
                station.tags.map((tag, i) => {
                  return `#${tag} `
                })}
            </div>
            <div className="station-account">
              <div className="profile-box">
                {station.imgPath !== 'static/s3이미지링크.png' && (
                  <img className="profile-img" src={station.imgPath}></img>
                )}
                {station.imgPath === 'static/s3이미지링크.png' && (
                  <>
                    <AccountCircleIcon
                      style={{ width: '28px', height: '28px' }}
                    />
                  </>
                )}
              </div>
              <div className="account-name">{station.username}</div>
              <FavoriteBorderIcon
                style={{ width: '17px', height: '17px', marginTop: '3px' }}
              />
              <div className="video-likes">{likesResult}</div>
            </div>
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
