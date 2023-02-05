import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import '../../styles/uploadloading.css'

function UpladLoading() {
  const [page, moveToMain] = useState(false)
  const navigate = useNavigate()
  const navigateToMain = () => {
    if (page) {
      navigate('/Mainroom')
    }
  }
  setTimeout(() => {
    moveToMain(true)
  }, 10000)

  useEffect(navigateToMain, [page])

  return (
    <>
      <Header />
      <div className="loading-conatiner">
        <p className="stacking">스택을 쌓고 있어요</p>
        <div className="stack-box" id="stack-box1"></div>
        <div className="stack-box" id="stack-box2"></div>
        <div className="stack-box" id="stack-box3"></div>
      </div>
    </>
  )
}

export default UpladLoading
