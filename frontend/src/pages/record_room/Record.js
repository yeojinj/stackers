import React from 'react'
import './Record.css'
function Record(props) {
  return (
    <div className="stack">
      <div className="record">RECORD</div>
      <div className="container">
        <div className="box">timer</div>
        <div className="box">stream</div>
        <div className="box">time</div>
      </div>
      <button>start record</button>
    </div>
  )
}

export default Record
