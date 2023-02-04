import React from 'react'
import profileTest from '../assets/profileTest.svg'

function profileFrame() {
  const profile = {
    profile_img: profileTest
  }
  return (
    <div>
      <img
        style={{ width: '55px', height: '55px', marginTop: '10px' }}
        src={profile.profile_img}
      ></img>
    </div>
  )
}

export default profileFrame
