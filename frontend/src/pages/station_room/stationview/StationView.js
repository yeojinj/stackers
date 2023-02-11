import React from 'react'
import StationControlButton from './StationControlButton'
// import Video from '../../../components/Video'
import station from '../assets/station.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import '../Station.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function StationView(props) {
  const navigate = useNavigate()
  const preUrl = useSelector((state) => {
    return state.url.preUrl
  })

  return (
    <div className="LeftStyle">
      <CloseOutlinedIcon
        className="stationOutButton"
        onClick={() => {
          navigate(preUrl)
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
        <ArrowCircleUpOutlinedIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 이전 페이지 이동 url
            navigate(`/StationRoom/${(props.stationId % 2) + 1}`)
          }}
        />
        <ArrowCircleDownOutlinedIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 다음 페이지 이동 url
            navigate(`/StationRoom/${(props.stationId % 2) + 1}`)
          }}
        />
      </div>
    </div>
  )
}

export default StationView
