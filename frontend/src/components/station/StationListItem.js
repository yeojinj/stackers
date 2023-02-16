import React, { useRef } from 'react'
import './stationlistitem.css'
import DefaultImg from '../../assets/default_profile.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import logo from '../../assets/image_logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SaveStation, CountBackNum } from '../../store.js'

function StationListItem({
  isRanking,
  isSearch,
  station,
  index,
  isDark,
  saveList,
  isIcon
}) {
  const videoRef = useRef(null)
  const dispatch = useDispatch()
  const backNumber = useSelector((state) => {
    return state.url.backNumber
  })

  // 마우스 오버시 비디오 재생, 마우스 리브시 비디오 일시정지
  function playVideo() {
    return videoRef.current.play()
  }
  function pauseVideo() {
    return videoRef.current.pause()
  }

  const navigate = useNavigate()
  const gotoDetail = (station) => {
    dispatch(SaveStation(saveList))
    if (backNumber !== 0) {
      dispatch(CountBackNum(0))
    }
    navigate(`/StationRoom/${station.id}`)
  }

  const gotoRecord = (id) => {
    navigate(`/RecordRoom/${id}`)
  }

  // 메인페이지, 마이페이지 스테이션 조회
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
            onClick={() => {
              gotoDetail(station)
            }}
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
            onClick={() => {
              gotoDetail(station)
            }}
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

  // 검색페이지 스테이션
  const IsSearch = () => {
    let likesResult = ''
    if (station.heartCnt >= 0) {
      const modifyLikes = station.heartCnt
      if (modifyLikes >= 1000) {
        likesResult = `${Math.floor(modifyLikes / 1000)}k`
      } else {
        likesResult = modifyLikes
      }
    }
    if (isSearch) {
      return (
        <div className="station-item__items">
          <video
            ref={videoRef}
            className={
              isSearch && station.heartCnt
                ? 'video-style-search'
                : 'video-style non-ranks'
            }
            src={station.video.videoPath}
            autoPlay={false}
            onMouseOver={playVideo}
            onMouseLeave={pauseVideo}
            onClick={() => {
              gotoDetail(station)
            }}
            loop
          />
          {!station.complete && isIcon && (
            <img
              src={logo}
              width={38}
              className="icon-is-not-complete"
              onClick={() => {
                gotoRecord(station.id)
              }}
            />
          )}
          <div className="station-info">
            <p className="station-description">{station.content}</p>
            <div
              className={isDark ? 'station-tag dark-mode-text' : 'station-tag'}
            >
              {station.tags &&
                station.tags.map((tag, i) => {
                  return `#${tag} `
                })}
            </div>
            <div className="station-account">
              <div
                className="account-info"
                style={{ border: 'none', flexDirection: 'row' }}
              >
                <img
                  src={
                    station.imgPath !== 'path' ? station.imgPath : DefaultImg
                  }
                  alt=""
                  className="profile-img"
                />
                <div
                  className={
                    station.heartCnt >= 0 ? 'account-name' : 'account-name-main'
                  }
                >
                  {station.username}
                </div>
              </div>
              {station.heartCnt >= 0 && (
                <div className="heart-info">
                  <FavoriteBorderIcon
                    style={{
                      width: '17px',
                      height: '17px',
                      marginRight: '2px',
                      color: '#E35FAD'
                    }}
                  />
                  <div className="video-likes">{likesResult}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div
      className={
        isSearch && station.heartCnt >= 0
          ? 'station-item-search'
          : 'station-item'
      }
    >
      <IsRanking />
      <IsSearch />
    </div>
  )
}

export default StationListItem
