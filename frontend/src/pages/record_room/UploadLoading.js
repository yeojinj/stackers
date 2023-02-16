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

  const navigateToProfile = () => {
    if (page) {
      navigate(`/MyPage/${username}`)
    }
  }

  console.log(moveToMain)
  setTimeout(() => {
    moveToMain(true)
  }, 4000)

  useEffect(navigateToProfile, [page])

  return (
    <>
      <Header />
      <div className="loading-conatiner">
        <p className="stacking">스택을 쌓고 있어요</p>
        <div id="uploading-divs">
          <div className="uploading-div yellow"></div>
          <div className="uploading-div red"></div>
          <div className="uploading-div blue"></div>
        </div>
      </div>
    </>
  )
}

export default UpladLoading
