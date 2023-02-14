import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import StationListItem from '../../components/station/StationListItem'
import '../../styles/mainroom.css'
import './carousel-style.css'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import LogIn from '../sign_folder/LogIn/LogIn'

const dummy = [
  {
    id: 5,
    content: 'xptms',
    tags: ['happy', 'mood'],
    video: {
      id: 5,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '테스트용 비디',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 6,
    content: '향기로운 음악의 세계~',
    tags: ['smell_so_good', 'umm'],
    video: {
      id: 6,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 7,
    content: '향기로운 음악의 세계~',
    tags: ['smell_so_good', 'umm'],
    video: {
      id: 7,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 8,
    content: '향기로운 음악의 세계~',
    tags: ['smell_so_good', 'umm'],
    video: {
      id: 8,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 9,
    content: '향기로운 음악의 세계~ 같이 들어요',
    tags: ['smell_so_good', 'umm', 'yahoo'],
    video: {
      id: 9,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 9,
    content: '향기로운 음악의 세계~ 같이 들어요',
    tags: ['smell_so_good', 'umm', 'yahoo'],
    video: {
      id: 9,
      videoPath:
        'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  },
  {
    id: 9,
    content: '향기로운 음악의 세계~ 같이 들어요',
    tags: ['smell_so_good', 'umm', 'yahoo'],
    video: {
      id: 9,
      videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
      videoName: null,
      videoOriName: '2023_02_07_11:08',
      thumbnailPath: null
    },
    username: 'boyoung',
    imgPath: 'path'
  }
]
function MainRoom() {
  const token = localStorage.getItem('accessToken')
  const [isloggin, setLogin] = useState('')
  const [username, setUsername] = useState('')
  const [completedStation, setCompletedStation] = useState([])
  const [uncompletedStation, setUncompletedStation] = useState([])
  const [rankingStation, setRankingStation] = useState([])
  const [followerStation, setFollwerStation] = useState([])

  const login = useSelector((state) => {
    return state.user.isLogged
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    setLogin(login)
  }, [login])

  // user 조회 axios
  async function getUser() {
    await axios({
      method: 'GET',
      url: '/api/member/user',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setUsername(res.data.username)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 스테이션 조회 axios

  // 완성된 스테이션 조회
  async function completeStationList() {
    console.log('[완성 스테이션]', username)
    await axios({
      method: 'get',
      url: '/api/station/completed/stackers',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // setCompletedStation(res.data)
        setCompletedStation(dummy)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 미완성된 스테이션 조회
  async function uncompleteStationList() {
    console.log('[미완성 스테이션]', username)
    await axios({
      method: 'get',
      url: '/api/station/uncompleted/stackers',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // setUncompletedStation(res.data)
        setUncompletedStation(dummy)
      })
      .catch((err) => console.log(err))
  }

  // 인기 TOP 10 스테이션 조회
  async function rankingStationList() {
    await axios({
      method: 'get',
      url: '/api/station/popular',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setRankingStation(res.data)
      })
      .catch((err) => console.log(err))
  }

  // 팔로잉하는 사람의 스테이션 조회
  async function followerStationList() {
    await axios({
      method: 'get',
      url: '/api/station/following',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        // setFollwerStation(res.data)
        setFollwerStation(dummy)
      })
      .catch((err) => console.log(err))
  }

  // 렌더링 후 한번 실행(axios)
  useEffect(() => {
    getUser()
    completeStationList()
    uncompleteStationList()
    rankingStationList()
    followerStationList()
    // 더미데이터 실행 함수
    // stationList()
  }, [username])

  // Station 값 변경시 재 렌더링
  useEffect(
    () => {},
    [completedStation],
    [uncompletedStation],
    [rankingStation],
    [followerStation]
  )

  return (
    <div className="main-room">
      <div className="main">
        <div className="station-center">
          <div
            className="chip top"
            style={
              {
                // marginLeft: '81%'
              }
            }
          >
            당신을 기다리는 스테이션 🪐
          </div>
          <div className="parent">
            <Carousel>
              {uncompletedStation.map((station, i) => {
                return (
                  <StationListItem
                    key={i}
                    isRanking={false}
                    station={station}
                    saveList={uncompletedStation}
                  />
                )
              })}
            </Carousel>
          </div>
        </div>

        <FadeContent>
          <div className="station-center">
            <div
              className="chip top"
              style={{
                marginLeft: 'auto'
              }}
            >
              ⚡️ 당신이 놓친 스테이션
            </div>
            <div className="parent">
              <Carousel>
                {completedStation.map((station, i) => {
                  return (
                    <StationListItem
                      key={i}
                      isRanking={false}
                      station={station}
                      saveList={completedStation}
                    />
                  )
                })}
              </Carousel>
            </div>
          </div>
        </FadeContent>
        <div className="wave">
          <FadeContent>
            <div className="station-center">
              <div
                className="chip bottom"
                style={{
                  transform: ' scale(1.05) rotate(-2.5deg)'
                }}
              >
                🔥 지금 가장 뜨거운 스테이션
              </div>
              <div className="parent">
                <Carousel>
                  {rankingStation.map((station, i) => {
                    return (
                      <StationListItem
                        key={i}
                        index={i + 1}
                        isRanking={true}
                        station={station}
                        saveList={rankingStation}
                      />
                    )
                  })}
                </Carousel>
              </div>
            </div>
          </FadeContent>
          <FadeContent>
            <div className="station-center" style={{ color: 'white' }}>
              <div
                className="chip bottom"
                style={{
                  marginLeft: 'auto',
                  transform: 'scale(1.05) rotate(2.5deg)'
                }}
              >
                당신이 좋아하는 스태커들의 이야기 💫
              </div>
              <div className="parent">
                <Carousel>
                  {isloggin &&
                    followerStation.map((station, i) => {
                      return (
                        <StationListItem
                          key={i}
                          isRanking={false}
                          station={station}
                          isSearch={true}
                          saveList={followerStation}
                        />
                      )
                    })}
                  {!isloggin && (
                    <div className="non-login-section-div">
                      <button className="login-btn-main" onClick={handleOpen}>
                        로그인 후 확인해주세요
                      </button>
                    </div>
                  )}
                </Carousel>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <LogIn handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  )
}

export default MainRoom

/* 캐러셀 관련 함수 */
const Carousel = (props) => {
  let ref = useRef()
  const [prev, setPrev] = useState(true)
  const [next, setNext] = useState(
    !!(ref && ref.offsetWidth >= ref.scrollWidth)
  )

  useEffect(() => {
    checkButtons(ref.offsetWidth, ref.scrollWidth)
  }, [])

  const checkButtons = (offsetWidthValue, scrollWidthValue) => {
    setPrev(ref.scrollLeft <= 0)
    setNext(ref.scrollLeft + offsetWidthValue >= scrollWidthValue)
  }

  return (
    <div className="slider-container" ref={(el) => (ref = el)}>
      <div className="slider-wrapper">{props.children}</div>
      <div
        className={`btn prev ${prev} ? 'disable' : ''}`}
        disabled={prev}
        onClick={() => {
          ref.scrollLeft -= ref.offsetWidth / 2
          checkButtons(ref.offsetWidth, ref.offsetWidth)
        }}
      >
        <ExpandMoreIcon style={{ transform: 'rotate(90deg)' }} />
      </div>
      <div
        className={`btn next ${next} ? 'disable' : ''}`}
        disabled={next}
        onClick={() => {
          ref.scrollLeft += ref.offsetWidth / 2
          checkButtons(ref.offsetWidth, ref.offsetWidth)
        }}
      >
        <ExpandLessIcon style={{ transform: 'rotate(90deg)' }} />
      </div>
    </div>
  )
}

/* fade animation 함수 */
const FadeContent = ({ children }) => {
  const wrapper = useRef()

  useEffect(() => {
    animateFading(wrapper.current)
  }, [])

  const animateFading = (element) => {
    const fadeOnScrollOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    }

    const fadeOnScrollObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            console.log('isinteresting')
          } else {
            entry.target.classList.add('appear')
            observer.unobserve(entry.target)
          }
        })
      },
      fadeOnScrollOptions
    )

    fadeOnScrollObserver.observe(element)
  }

  return (
    <div className="fade-in" ref={wrapper}>
      {children}
    </div>
  )
}
