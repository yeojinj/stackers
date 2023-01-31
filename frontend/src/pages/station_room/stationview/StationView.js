import React from 'react'
import StationControlButton from './StationControlButton'
// import Video from '../../../components/Video'
import station from '../assets/station.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import '../Station.css'

function StationView() {
  return (
    <div className="LeftStyle">
      <CloseOutlinedIcon className="stationOutButton" />
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
