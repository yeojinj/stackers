import React, { useEffect, useState } from 'react'
import StationView from './StationView'
import Article from '../article/Article'
import '../Station.css'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'

function StationRoom() {
  const params = useParams()
  const navigate = useNavigate()
  const stationId = Number(params.id)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`,
      headers: { Authorization: localStorage.getItem('accessToken') }
    })
      .then((response) => {
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
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
