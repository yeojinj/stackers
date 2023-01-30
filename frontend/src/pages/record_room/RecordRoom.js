import Record from './Record.js';
import React from 'react';
import StackUploadModal from './StackUploadModal';
import LightIcon from '@mui/icons-material/Light';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function RecordRoom() {
  return (
    <div>
      <LightIcon></LightIcon>
      <div className="container">
        <div className="stack">
          <p className="box"></p>
          <PhotoCameraFrontIcon className="box"></PhotoCameraFrontIcon>
          <InfoOutlinedIcon className="box" />
        </div>
        <div className="box">
          <Record />
        </div>
        <div className="stack">
          <p></p>
          <p></p>
          <div className="box">
            <button className="box">취소</button>
            <button className="box">업로드</button>
          </div>
        </div>
      </div>
      <StackUploadModal />
    </div>
  );
}
export default RecordRoom;
