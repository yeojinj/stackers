import React, { useState, useEffect } from 'react'
import styles from './Timer.css'

let countInterval

const Timer = ({ active, initialValue }) => {
  const [counter, setCounter] = useState(0)

  const startCount = () => {
    countInterval = setInterval(() => {
      setCounter((s) => --s)
    }, 1000)
  }

  const stopCount = () => {
    clearInterval(countInterval)
  }

  const animationPlay = (a) => (a ? 'running' : 'paused')

  useEffect(() => {
    if (active) {
      setCounter(initialValue / 1000)
      startCount()
    } else {
      stopCount()
    }
  }, [active])

  useEffect(() => {
    if (counter <= 0) {
      stopCount()
    }
  }, [counter])

  return (
    <>
      {active && (
        <div className={styles.countdown}>
          <div className={styles.countdownNumber}>{counter}</div>
          <svg className={styles.counterContainer}>
            <circle
              r="18"
              cx="20"
              cy="20"
              className={styles.counterServer}
              style={{
                animationPlayState: animationPlay(active),
                animationIterationCount: '1',
                animationTimingFunction: 'linear',
                animationDuration: `${initialValue / 1000}s`,
                animationFillMode: 'forwards'
              }}
            ></circle>
          </svg>
        </div>
      )}
    </>
  )
}

export default Timer
