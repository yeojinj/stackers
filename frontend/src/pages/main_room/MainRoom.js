import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import StationListItem from '../../components/station/StationListItem'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import LogIn from '../sign_folder/LogIn/LogIn'
import './mainroom.css'
import './carousel-style.css'

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
    await axios({
      method: 'get',
      url: '/api/station/completed/stackers',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setCompletedStation(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 미완성된 스테이션 조회
  async function uncompleteStationList() {
    await axios({
      method: 'get',
      url: '/api/station/uncompleted/stackers',
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setUncompletedStation(res.data)
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
        setFollwerStation(res.data)
      })
      .catch((err) => console.log(err))
  }

  // 렌더링 후 한번 실행(axios)
  useEffect(() => {
    if (token !== null) getUser()
    completeStationList()
    uncompleteStationList()
    rankingStationList()
    if (token !== null) followerStationList()
  }, [username])

  return (
    <div className="main-room">
      <div className="main">
        <div className="station-center">
          <div className="chip top">당신을 기다리는 스테이션 🪐</div>
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
                marginLeft: '82%'
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
                  transform: ' scale(1.05) rotate(-2.5deg)',
                  marginTop: '20px'
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
            <div
              className="station-center popular-section"
              style={{ color: 'white' }}
            >
              <div
                className="chip bottom"
                style={{
                  marginLeft: '73%',
                  marginBottom: '-30px',
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
                          isDark={true}
                          saveList={followerStation}
                        />
                      )
                    })}
                  {!isloggin && (
                    <div className="non-login-section-div">
                      <button className="login-btn-main" onClick={handleOpen}>
                        로그인 후 확인해보세요
                      </button>
                    </div>
                  )}
                  {isloggin && followerStation.length === 0 && (
                    <div className="non-login-section-div">
                      <div
                        style={{
                          fontSize: '1.1em',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        <PeopleAltIcon
                          style={{
                            color: 'whitesmoke',
                            marginBottom: '7px',
                            width: '30px'
                          }}
                        />
                        아직 팔로잉 스태커들의 영상이 없네요
                      </div>
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
          if (entry.isIntersecting) {
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
