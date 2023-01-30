import Video from '../../components/Video.js';
import './Record';
import React from 'react';

function UploadForm() {
  return (
    <div className="container">
      <div className="left stack">
        <Video className="item" />
        <div className="item">노래 제목</div>
      </div>
      <div className="right">
        <div className="infoForm">설명</div>
        <div className="thumbnailForm">썸네일</div>
        <div className="tagForm">태그</div>
        <div className="container">
          <div className="left">
            <div className="instForm">연주 악기</div>
          </div>
          <div className="right">
            <div className="scopeForm">공개 범위</div>
            <button className="uploadButton">업로드</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UploadForm;
