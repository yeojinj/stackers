import React from 'react'
import StationControlButton from './StationControlButton'
// import Video from '../../../components/Video'
import station from '../assets/station.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import '../Station.css'
import { useNavigate } from 'react-router-dom'

function StationView() {
  const navigate = useNavigate()
  return (
    <div className="LeftStyle">
      <CloseOutlinedIcon
        className="stationOutButton"
        onClick={() => {
          navigate(-1)
        }}
      />
      <div className="contentBox">
        <div className="videoBox">
          <img src={station} alt="station" className="videoBox" />
        </div>
        <div className="stationControlButton">
          <StationControlButton></StationControlButton>
        </div>
      </div>
      <div className="prevnextbutton">
        <ArrowCircleUpOutlinedIcon sx={{ fontSize: 30 }} />
        <ArrowCircleDownOutlinedIcon sx={{ fontSize: 30 }} />
      </div>
    </div>
  )
}

export default StationView
