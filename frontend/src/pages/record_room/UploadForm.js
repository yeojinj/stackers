/* eslint-disable */

import './Record'
import React, { useState, useEffect } from 'react'
import Tag from './ModalTag'

function UploadForm(props) {
  const handleClose = () => {
    props.handle()
  }
  const object = props.src.src.src
  const [values, setValues] = useState({
    stack: object,
    music: '',
    content: '',
    scope: 'public'
  })
  const filedownloadlink = window.URL.createObjectURL(object)
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!values.content || !values.music || !values.scope) {
      alert('빈칸을 입력해주세요')
    } else {
      console.log(values)
      if (values) {
        let testData = {
          content: '프론트 테스트 데이터임',
          music: '프론트 테스트 데이터임',
          prevStationId: -1,
          tags: ['행복', '사랑'],
          remainDepth: 3,
          instrumentId: 1
        }

        const formData = new FormData()
        // 기본 정보
        formData.append(
          'info',
          new Blob([JSON.stringify(testData)], {
            type: 'application/json'
          })
        )

        // 파일 정보
        formData.append('file', values.stack)
        await axios
          .post(`/api/station/upload`, formData, {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          })
          .then(() => console.log('[스테이션 업로드] >> 성공'))
          .catch((error) => {
            alert(error)
            console.log(error)
          })
        console.log(formData)
      }
      handleClose()
    }
  }
  return (
    <div className="container">
      <form className="left stack" onSubmit={handleSubmit}>
        <video className="stackVideo" src={filedownloadlink} controls />
        <div className="item">노래 제목</div>
        <input
          type="text"
          name="music"
          value={values.music}
          onChange={handleChange}
        ></input>
        {filedownloadlink && (
          <a href={filedownloadlink} download>
            Download
          </a>
        )}
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
          <div className="container">
            <div className="left">
              <div className="instForm">연주 악기</div>
              <Tag />
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
                    checked
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
