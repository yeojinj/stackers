import Video from '../../components/Video.js'
import './Record'
import React from 'react'

function UploadForm() {
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="left stack">
          <Video className="item" />
          <div className="item">노래 제목</div>
          <input
            type="text"
            name="music"
            value={values.music}
            onChange={handleChange}
          ></input>
        </div>
        <div className="right">
          <div className="infoForm">설명</div>
          <input
            type="text"
            name="content"
            value={values.content}
            onChange={handleChange}
          ></input>
          <div className="thumbnailForm">썸네일</div>
          <div className="tagForm">태그</div>
          <input
            type="text"
            name="tagName"
            value={values.tagName}
            onChange={handleChange}
          ></input>
          <div className="container">
            <div className="left">
              <div className="instForm">연주 악기</div>
              <input
                type="text"
                name="instName"
                value={values.instName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="right">
              <div className="scopeForm">공개 범위</div>
              <input
                type="checkbox"
                name="scope"
                value={values.scope}
                onChange={handleChange}
              ></input>
              <button type="submit" className="uploadButton">
                업로드
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default UploadForm
