/* eslint-disable */
import React from 'react'
import '../Station.css'
import profile1 from '../assets/profile.png'
import StarIcon from '@mui/icons-material/Star'
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
      <div className="station-participant" key={i}>
        {i == 0 && (
          <StarIcon
            style={{
              color: 'rgba(250, 247, 76, 0.8)',
              marginBottom: '-12px'
            }}
          />
        )}
        <img
          src={profileImage}
          alt="profile"
          onClick={() => {
            navigate(`/Mypage/${musicians[i].username}`)
          }}
          className={
            i == 0 ? 'profile-participant owner' : 'profile-participant'
          }
        />
        <div className="station-Participant-name">
          {musicians[i].instrumentName}
        </div>
      </div>
    )
  }

  return <div className="station-participants">{lst}</div>
}

export default StackerListItem
