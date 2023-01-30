import Record from './Record.js';
import React from 'react';

function RecordRoom() {
  return (
    <div className="container">
      <div>light</div>
      <div className="box">
        <div>
          left
          <p className="item">icon</p>
          <p className="item">icon</p>
        </div>
        <div className="box">
          <Record />
        </div>
        <div className="box">
          right
          <button>취소</button>
          <button>업로드</button>
        </div>
      </div>
    </div>
  );
}
export default RecordRoom;
