import React, { useState } from 'react'
import '../Station.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import stacking from '../assets/stacking.png'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function StationControlButton(props) {
  const [heartCnt, setHeartCnt] = useState(
    Number(props.Info.stationInfo.heartCnt)
  )
  const inComplete = props.Info.stationInfo.isComplete

  const navigate = useNavigate()
  const [isliked, setIsliked] = useState(props.Info.heart)

  let likeStation = null
  if (isliked) {
    likeStation = (
      <>
        <FavoriteIcon
          sx={{ fontSize: 30 }}
          style={{ color: 'rgba(227, 95, 173, 1)' }}
        />
      </>
    )
  } else {
    likeStation = (
      <>
        <FavoriteBorderIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
      </>
    )
  }

  // 완성된 영상이면 참여하기 버튼이 보이지 않습니다
  let recordIcon = null
  if (!inComplete) {
    recordIcon = (
      <IconButton
        style={{
          padding: '0px'
        }}
        onClick={() => {
          // handleOpen()
          navigate(`/RecordRoom/${props.stationId}`)
        }}
      >
        <img src={stacking} alt="stacking" style={{ width: '30px' }} />
      </IconButton>
    )
  }
  return (
    <div>
      {recordIcon}
      <IconButton
        style={{ padding: '0px' }}
        onClick={() => {
          if (!isliked) {
            axios({
              method: 'post',
              url: `/api/station/${props.stationId}/heart`,
              headers: { Authorization: localStorage.getItem('accessToken') }
            })
              .then((response) => {
                // console.log(response.data)
                setHeartCnt(heartCnt + 1)
                setIsliked(!isliked)
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            axios({
              method: 'delete',
              url: `/api/station/${props.stationId}/heart`,
              headers: { Authorization: localStorage.getItem('accessToken') }
            })
              .then((response) => {
                // console.log(response.data)
                setHeartCnt(heartCnt - 1)
                setIsliked(!isliked)
              })
              .catch((error) => {
                console.log(error)
              })
          }
          setIsliked(!isliked)
        }}
      >
        {likeStation}
      </IconButton>
      <p style={{ color: 'white', margin: '0px', textAlign: 'center' }}>
        {heartCnt}
      </p>

      <IosShareRoundedIcon sx={{ fontSize: 30 }} />
    </div>
  )
}
export default StationControlButton
