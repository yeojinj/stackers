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
          videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
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
          videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
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
          videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
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
          videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
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
    // await axios
    //   .get('/api/station/popular')
    //   .then((res) => {
    //     console.log('[상위 스테이션 조회] ', res.data)
    //     // 서버 통신 되면 아래 주석 풀고 그 아래 리스트 지우기
    //     // setStation(res.data)
    //     setStation([
    //       {
    //         id: 5,
    //         content: 'xptms',
    //         tags: ['happy', 'mood'],
    //         video: {
    //           id: 5,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '테스트용 비디',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 6,
    //         content: '향기로운 음악의 세계~',
    //         tags: ['smell_so_good', 'umm'],
    //         video: {
    //           id: 6,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 7,
    //         content: '향기로운 음악의 세계~',
    //         tags: ['smell_so_good', 'umm'],
    //         video: {
    //           id: 7,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 8,
    //         content: '향기로운 음악의 세계~',
    //         tags: ['smell_so_good', 'umm'],
    //         video: {
    //           id: 8,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 9,
    //         content: '향기로운 음악의 세계~ 같이 들어요',
    //         tags: ['smell_so_good', 'umm', 'yahoo'],
    //         video: {
    //           id: 9,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 9,
    //         content: '향기로운 음악의 세계~ 같이 들어요',
    //         tags: ['smell_so_good', 'umm', 'yahoo'],
    //         video: {
    //           id: 9,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       },
    //       {
    //         id: 9,
    //         content: '향기로운 음악의 세계~ 같이 들어요',
    //         tags: ['smell_so_good', 'umm', 'yahoo'],
    //         video: {
    //           id: 9,
    //           videoPath:
    //             'https://webrtc.github.io/samples/src/video/chrome.webm',
    //           videoName: null,
    //           videoOriName: '2023_02_07_11:08',
    //           thumbnailPath: null
    //         }
    //       }
    //     ])
    //     console.log('[스테이션 변수에 들어갔는지 확인]', completedStation)
    //   })
    //   .catch((err) => console.log(err))
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
          <p className="list-title">당신이 놓친 스테이션!</p>
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
        <div className="station-center">
          <p className="list-title">당신을 기다리는 스테이션!</p>
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
        <div className="station-center">
          <p className="list-title">지금 가장 뜨거운 영상🔥</p>
          <div className="parent">
            <Carousel>
              {completedStation.map((station, i) => {
                return (
                  <StationListItem key={i} isRanking={true} station={station} />
                )
              })}
            </Carousel>
            {/* <StationList /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainRoom

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
        <ExpandMoreIcon style={{ color: 'gray', transform: 'rotate(90deg)' }} />
      </div>
      <div
        className={`btn next ${next} ? 'disable' : ''}`}
        disabled={next}
        onClick={() => {
          ref.scrollLeft += ref.offsetWidth / 2
          checkButtons(ref.offsetWidth, ref.offsetWidth)
        }}
      >
        <ExpandLessIcon style={{ color: 'gray', transform: 'rotate(90deg)' }} />
      </div>
    </div>
  )
}
