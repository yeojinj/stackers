import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/mainroom.css'

function MainRoom() {
  return (
    <div className="main-room">
      <Header />
      <div className="main">메인페이지 내용</div>
      <Footer />
    </div>
  )
}

export default MainRoom
