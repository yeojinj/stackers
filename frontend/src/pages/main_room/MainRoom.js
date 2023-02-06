import React, { useState } from 'react'
// import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Login from '../sign_folder/LogIn/LogIn'
// import StationList from '../../components/station/StationList'
import StationListItem from '../../components/station/StationListItem'
import '../../styles/mainroom.css'
// import axios from 'axios'

function MainRoom() {
  const completedStation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const notCompletedStation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // const [station, setStation] = useState([])
  const stationRanking = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [modalOpen, setModalOpen] = useState(false)

  // 스테이션 조회
  // 스테이션 조회 axios
  // async function stationList() {
  //   await axios
  //     .get('/api/station/popular')
  //     .then((res) => {
  //       console.log('[상위 스테이션 조회] ', res)
  //       setStation(res.data)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const showModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  // useEffect(() => {
  //   stationList()
  // }, [])

  // useEffect(() => {
  //   console.log(station)
  // }, [station])

  return (
    <div className="main-room">
      {modalOpen && <Login setModalOpen={setModalOpen} />}
      <Header openModal={showModal} />
      <div className="main">
        <div className="station-center">
          <p className="list-title">당신이 놓친 스테이션!</p>
          <div className="station-scroll">
            {completedStation.map((station, i) => {
              return <StationListItem key={i} />
            })}
            {/* <StationList /> */}
          </div>
        </div>
        <div className="station-center">
          <p className="list-title">당신을 기다리는 스테이션!</p>
          <div className="station-scroll">
            {notCompletedStation.map((station, i) => {
              return <StationListItem key={i} />
            })}
            {/* <StationList /> */}
          </div>
        </div>
        <div className="station-center">
          <p className="list-title">지금 가장 뜨거운 영상🔥</p>
          <div className="station-scroll">
            {stationRanking.map((station, i) => {
              return <StationListItem key={i} isRanking={true} />
            })}
            {/* axios 로 받은 비디오를 화면에 출력해보기 */}
            {/* {station.map((item, key) => (
              <div key={key}>
                <video
                  src="C:\\stackers\\videos\\bJVSGr8VTiyz7a31JmZDLYCHMJtY0ySLZyY2ImqYWIojM9nUVTJGQNu8GKy8Zrdt.mp4"
                  autoPlay
                ></video>
              </div>
            ))} */}
            {/* <StationList isRanking={true} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainRoom
