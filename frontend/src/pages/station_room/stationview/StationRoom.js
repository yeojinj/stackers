import React, { useEffect, useState } from 'react'
import StationView from './StationView'
import Article from '../article/Article'
import '../Station.css'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { CountBackNum } from '../../../store'

function StationRoom() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const stationId = Number(params.id)
  const [info, setInfo] = useState(null)
  const backNumber = useSelector((state) => {
    return state.url.backNumber
  })
  useEffect(() => {
    dispatch(CountBackNum(backNumber + 1))
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`,
      headers: { Authorization: localStorage.getItem('accessToken') }
    })
      .then((response) => {
        setInfo(response.data)
      })
      .catch(() => {
        navigate('/NotFound')
      })
  }, [stationId])

  if (info !== null) {
    return (
      <div className="total">
        <StationView info={info} stationId={stationId} />
        <Article info={info} />
      </div>
    )
  }
}

export default StationRoom
