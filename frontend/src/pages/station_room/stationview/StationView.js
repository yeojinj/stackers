import React, { useRef } from 'react'
import StationControlButton from './StationControlButton'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../Station.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CountBackNum } from '../../../store'

function StationView(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const backNumber = useSelector((state) => {
    return state.url.backNumber
  })
  const Info = props.info
  const videoRef = useRef(null)

  const stationList = useSelector((state) => {
    return state.station.station.map((ele) => {
      return ele.id
    })
  })

  return (
    <div className="left-style">
      <CloseOutlinedIcon
        className="station-close-btn"
        onClick={() => {
          dispatch(CountBackNum(0))
          navigate(-backNumber)
        }}
      />
      <div className="content-box">
        <video
          src={Info.videoPath}
          alt="station"
          ref={videoRef}
          className="videoBox"
          muted
          width={378}
          height={672}
          autoPlay
          controls
          loop
        />
        <StationControlButton
          stationId={props.stationId}
          Info={Info}
        ></StationControlButton>
      </div>
      <div className="prev-next-button">
        <KeyboardArrowUpIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 이전 페이지 이동 url
            navigate(
              `/StationRoom/${
                stationList[
                  (stationList.indexOf(props.stationId) - 1) %
                    stationList.length
                ]
              }`
            )
          }}
        />
        <ExpandMoreIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 다음 페이지 이동 url
            navigate(
              `/StationRoom/${
                stationList[
                  (stationList.length +
                    stationList.indexOf(props.stationId) +
                    1) %
                    stationList.length
                ]
              }`
            )
          }}
        />
      </div>
    </div>
  )
}

export default StationView
