import React from 'react'
import StationView from './StationView'
import Article from '../article/Article'
import '../Station.css'

function StationRoom() {
  return (
    <div className="total">
      <StationView />
      <Article />
    </div>
  )
}

export default StationRoom
