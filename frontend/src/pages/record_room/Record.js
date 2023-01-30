import React from 'react';
import './Record.css';
function Record(props) {
  return (
    <div className="container">
      <div className="box">
        <div className="record">RECORD</div>
      </div>
      <div className="box">
        <div className="item">timer</div>
        <div className="item">stream</div>
        <div className="item">time</div>
      </div>
      <div className="box">
        <button>start record</button>
      </div>
    </div>
  );
}

export default Record;
