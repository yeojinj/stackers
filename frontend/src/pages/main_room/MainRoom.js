import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import StationList from '../../components/station/StationList'
import '../../styles/mainroom.css'

function MainRoom() {
  return (
    <div className="main-room">
      <Header />
      <div className="main">
        <div className="station-center">
          <p className="list-title">당신이 놓친 스테이션!</p>
          <StationList />
        </div>
        <div className="station-center">
          <p className="list-title">당신을 기다리는 스테이션!</p>
          <StationList />
        </div>
        <div className="station-center">
          <p className="list-title">지금 가장 뜨거운 영상🔥</p>
          <StationList isRanking="true"/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainRoom
