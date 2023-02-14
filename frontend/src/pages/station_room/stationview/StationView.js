import React, { useRef } from 'react'
import StationControlButton from './StationControlButton'
// import Video from '../../../components/Video'
// import station from '../assets/station.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined'
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined'
import '../Station.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CountBackNum } from '../../../store'
// import { ChangeUrl } from '../../../store'

function StationView(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const preUrl = useSelector((state) => {
  //   console.log(state.url.preUrl)
  //   return state.url.preUrl
  // })

  const backNumber = useSelector((state) => {
    return state.url.backNumber
  })

  // dispatch(ChangeUrl('/mypage/test6'))
  // console.log(preUrl)
  const Info = props.info
  const videoRef = useRef(null)
  // const [auto, setAuto] = useState(false)

  // function playVideo() {
  //   return videoRef.current.play()
  // }
  // useEffect(() => {
  //   setTimeout(() => {
  //     playVideo()
  //   }, [2000])
  // })

  const isSave = useSelector((state) => {
    return state.station.station
  })

  console.log('[스테이션 정보가 저장되었어요]', isSave)
  const stationLst = [1, 2]
  return (
    <div className="LeftStyle">
      <CloseOutlinedIcon
        className="stationOutButton"
        onClick={() => {
          dispatch(CountBackNum(0))
          navigate(-backNumber)
        }}
      />
      <div className="contentBox">
        <div className="videoBox">
          <video
            src={Info.videoPath}
            alt="station"
            ref={videoRef}
            className="videoBox"
            muted
            autoPlay
            controls
            loop
          />
        </div>
        <div className="stationControlButton">
          <StationControlButton
            stationId={props.stationId}
            Info={Info}
          ></StationControlButton>
        </div>
      </div>
      <div className="prevnextbutton">
        <ArrowCircleUpOutlinedIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 이전 페이지 이동 url
            navigate(
              `/StationRoom/${
                stationLst[
                  (stationLst.indexOf(props.stationId) + 1) % stationLst.length
                ]
              }`
            )
          }}
        />
        <ArrowCircleDownOutlinedIcon
          sx={{ fontSize: 30 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            // 다음 페이지 이동 url
            navigate(
              `/StationRoom/${
                stationLst[
                  (stationLst.length +
                    stationLst.indexOf(props.stationId) -
                    1) %
                    stationLst.length
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
