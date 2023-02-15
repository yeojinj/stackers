import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import './uploadloading.css'

function UpladLoading() {
  const [page, moveToMain] = useState(false)
  const navigate = useNavigate()
  const username = useSelector((state) => {
    return state.user.username
  })
  // const navigateToMain = () => {
  //   if (page) {
  //     navigate('/Mainroom')
  //   }
  // }
  const navigateToProfile = () => {
    if (page) {
      navigate('/MyPage/' + { username })
    }
  }
  setTimeout(() => {
    moveToMain(true)
  }, 3000)

  useEffect(navigateToProfile, [page])

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
