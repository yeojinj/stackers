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
        <div>
          당신이 놓친 스테이션!
          <StationList />
        </div>
        <div>
          당신을 기다리는 스테이션!
          <StationList />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainRoom
