/* eslint-disable */
import React from 'react'
import '../Station.css'
import profile1 from '../assets/profile.png'
import { useNavigate } from 'react-router-dom'

function StackerListItem(props) {
  const musicians = props.musicians
  const navigate = useNavigate()

  const lst = []
  for (let i = 0; i < musicians.length; i++) {
    let profileImage = musicians[i].profileImg
    if (profileImage === 'path') {
      profileImage = profile1
    }
    lst.push(
      <div className="station-Participant" key={i}>
        <p className="station-user">
          <img
            src={profileImage}
            alt="profile"
            onClick={() => {
              navigate(`/Mypage/${musicians[i].username}`)
            }}
            className="profile-participant"
          />
        </p>
        <p className="station-Participant-name">
          {musicians[i].instrumentName}
        </p>
      </div>
    )
  }

  return (
    <div
      className="station-participants"
      style={{
        display: 'flex',
        width: '100%',
        height: '100%'
      }}
    >
      {lst}
    </div>
  )
}

export default StackerListItem
