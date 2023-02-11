import React, { useState, useEffect, useRef } from 'react'

// import StationList from '../../components/station/StationList'
import StationListItem from '../../components/station/StationListItem'
import '../../styles/mainroom.css'
import './carousel-style.css'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import axios from 'axios'

function MainRoom() {
  const [completedStation, setStation] = useState([])

  // 처음에 useState 로 station 빈 배열
  // axios 로 setStation 함수로 station에 조회 데이터 넣기
  // station.map으로 하나씩 props 로 stastionListItem 에 전달

  // 스테이션 조회 axios
  // 현재 영상이 없어서 더미데이터 넣어줌
  // 서버와 다시 통신 후, 아래 주석풀기
  async function stationList() {
    setStation([
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
      }
    ])
  }
  // 렌더링 후 한번 실행(axios)
  useEffect(() => {
    stationList()
  }, [])

  // completedStation 값 변경시 재 렌더링
  useEffect(() => {
    console.log('[useEffect 실행]]', completedStation)
  }, [completedStation])
  return (
    <div className="main-room">
      <div className="main">
        <div className="station-center">
          <div className="chip top">⚡️ 당신이 놓친 스테이션</div>
          <div className="parent">
            <Carousel>
              {completedStation.map((station, i) => {
                return (
                  <StationListItem
                    key={i}
                    isRanking={false}
                    station={station}
                  />
                )
              })}
            </Carousel>
            {/* <StationList /> */}
          </div>
        </div>
        <FadeContent>
          <div className="station-center">
            <div
              className="chip top"
              style={{
                marginLeft: '80%'
              }}
            >
              당신을 기다리는 스테이션 🪐
            </div>
            <div className="parent">
              <Carousel>
                {completedStation.map((station, i) => {
                  return (
                    <StationListItem
                      key={i}
                      isRanking={false}
                      station={station}
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
                  {completedStation.map((station, i) => {
                    return (
                      <StationListItem
                        key={i}
                        index={i + 1}
                        isRanking={true}
                        station={station}
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
                  marginLeft: '75%',
                  transform: 'scale(1.05) rotate(2.5deg)'
                }}
              >
                당신이 좋아하는 스태커들의 이야기 💫
              </div>
              <div className="parent">
                <Carousel>
                  {completedStation.map((station, i) => {
                    return (
                      <StationListItem
                        key={i}
                        isRanking={true}
                        station={station}
                      />
                    )
                  })}
                </Carousel>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
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
