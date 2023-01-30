import React from 'react';
import './Record.css';
function Record(props) {
  return (
    <div className="stack">
      <div className="record">RECORD</div>
      <div className="box">
        <div className="item">timer</div>
        <div className="item">stream</div>
        <div className="item">time</div>
      </div>
      <button>start record</button>
    </div>
  );
}

export default Record;
