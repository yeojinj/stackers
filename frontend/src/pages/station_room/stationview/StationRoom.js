import React, { useEffect, useState } from 'react'
import StationView from './StationView'
import Article from '../article/Article'
import '../Station.css'
import { useParams } from 'react-router'
import axios from 'axios'

function StationRoom() {
  const params = useParams()
  const stationId = Number(params.id)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`
    })
      .then((response) => {
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
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
