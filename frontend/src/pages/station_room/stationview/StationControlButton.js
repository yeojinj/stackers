import React, { useState, useEffect } from 'react'
import '../Station.css'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TextsmsIcon from '@mui/icons-material/Textsms'
import stacking from '../assets/stacking.png'
import IconButton from '@mui/material/IconButton'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function StationControlButton(props) {
  const params = useParams()
  const stationId = Number(params.id)
  const [heartCnt, setHeartCnt] = useState(null)
  const [commentCnt, setcommentCnt] = useState(null)
  const [isliked, setIsliked] = useState(null)
  const [isComplete, setIsComplete] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`,
      headers: { Authorization: localStorage.getItem('accessToken') }
    })
      .then((response) => {
        setHeartCnt(response.data.stationInfo.heartCnt)
        setcommentCnt(response.data.commentCnt)
        setIsliked(response.data.heart)
        setIsComplete(response.data.stationInfo.isComplete)
      })
      .catch((error) => {
        console.log(error)
      })
    setHeartCnt(Number(props.Info.stationInfo.heartCnt))
  }, [params.id])

  const navigate = useNavigate()
  let likeStation = null
  if (isliked) {
    likeStation = (
      <>
        <FavoriteIcon
          className="station-control-btn"
          style={{
            color: 'rgba(227, 95, 173, 1)',
            width: '25px',
            height: '25px'
          }}
        />
      </>
    )
  } else {
    likeStation = (
      <>
        <FavoriteBorderIcon
          className="station-control-btn"
          style={{ color: 'white', width: '25px', height: '25px' }}
        />
      </>
    )
  }

  // 완성된 영상이면 참여하기 버튼이 보이지 않습니다
  let recordIcon = null
  if (!isComplete) {
    recordIcon = (
      <IconButton
        onClick={() => {
          navigate(`/RecordRoom/${props.stationId}`)
        }}
      >
        <div className="station-control-btn" style={{ marginBottom: '6px' }}>
          <img src={stacking} alt="stack-icon" style={{ width: '28px' }} />
        </div>
      </IconButton>
    )
  }
  return (
    <div className="station-control-btns">
      {recordIcon}
      <div className="heart-control-btn">
        <TextsmsIcon
          className="station-control-btn"
          style={{ color: 'whitesmoke', width: '25px', height: '25px' }}
        />
        <div style={{ marginTop: '4px' }}>{commentCnt}</div>
      </div>
      <div className="heart-control-btn">
        <IconButton
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
                .then(() => {
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
        <div style={{ marginTop: '-8px' }}>{heartCnt}</div>
      </div>
    </div>
  )
}
export default StationControlButton
