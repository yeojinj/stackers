/* eslint-disable */

import './Record'
import React, { useState, useEffect } from 'react'
import Tag from './ModalTag'

function UploadForm(props) {
  const handleClose = () => {
    props.handle()
  }
  const [values, setValues] = useState({
    music: '',
    content: '',
    instName: '',
    scope: 'public'
  })

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.content || !values.instName || !values.music || !values.scope) {
      alert('빈칸을 입력해주세요')
    }
    handleClose()
  }
  return (
    <div className="container">
      <form className="left stack" onSubmit={handleSubmit}>
        <video className="stackVideo" src={props.src} />
        <div className="item">노래 제목</div>
        <input
          type="text"
          name="music"
          value={values.music}
          onChange={handleChange}
        ></input>
      </form>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div className="infoForm">설명</div>
          <input
            type="text"
            name="content"
            value={values.content}
            onChange={handleChange}
          ></input>
          <div className="thumbnailForm">썸네일</div>
          <div className="tagForm">태그</div>
          <Tag />
          {/* <input type="text" name="tagName" onKeyUp={handleTag}></input> */}
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
              <div>
                <label>
                  <input
                    type="radio"
                    name="scope"
                    value="true"
                    onChange={handleChange}
                  />
                  공개
                </label>
                <label>
                  <input
                    type="radio"
                    name="scope"
                    value="false"
                    onChange={handleChange}
                  />
                  비공개
                </label>
              </div>
            </div>
          </div>
        </form>
        <button type="submit" className="uploadButton" onClick={handleSubmit}>
          업로드
        </button>
      </div>
    </div>
  )
}
export default UploadForm
