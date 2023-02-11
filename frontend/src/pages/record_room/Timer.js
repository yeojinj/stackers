import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">START</div>
  }

  return (
    <div className="timer">
      <div className="text"></div>
      <div className="text value">
        <b>{remainingTime}</b>
      </div>
      <div className="text"></div>
    </div>
  )
}

function Timer() {
  return (
    <div>
      <div className="timer-wrapper">
        <CountdownCircleTimer isPlaying duration={3} colors={['#ffffff']}>
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

export default Timer
