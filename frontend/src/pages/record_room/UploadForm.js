/* eslint-disable */

import React, { useState, useEffect } from 'react'
import './Record'
import Tag from './ModalTag'
import './UploadForm.css'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// import axios from 'axios'

function UploadForm(props) {
  const Instrument = [
    {
      name: '기타'
    },
    { name: '가야금' },
    { name: '바이올린' },
    { name: '첼로' },
    { name: '비올라' },
    { name: '콘트라베이스' },
    { name: '피아노' },
    { name: '보컬' },
    { name: '북' },
    { name: '꽹과리' },
    { name: '장구' },
    { name: '징' },
    { name: '캐스터네츠' },
    { name: '실로폰' },
    { name: '비브라폰' },
    { name: '플룻' },
    { name: '클라리넷' },
    { name: '트럼펫' },
    { name: '하프' }
  ]
  const handleClose = () => {
    props.handle()
  }
  const object = props.src.src.src
  const [values, setValues] = useState({
    stack: object,
    music: '',
    content: '',
    InstrumentId: '',
    isPublic: 1,
    isCompleted: 0
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
    if (!values.content || !values.music || !values.isPublic) {
      alert('빈칸을 입력해주세요')
    } else {
      console.log(values)
      if (values) {
        let testData = {
          content: 'HELLO THERE',
          music: 'HELLO THERE',
          instrumentId: 1,
          tags: ['happy', 'mood'],
          prevStationId: 1,
          remainDepth: 2,
          isPublic: 1,
          isComplete: 0
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
        <video
          className="stackVideo"
          src={filedownloadlink}
          width={258}
          height={402}
          style={{ objectFit: 'cover' }}
          controls
        />
        <div className="item">
          <b>노래 제목</b>
        </div>
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
          <div className="infoForm">
            <b>설명</b>
          </div>
          <input
            type="text"
            name="content"
            value={values.content}
            onChange={handleChange}
          ></input>
          <div className="thumbnailForm">
            <b>썸네일</b>
          </div>
          <div className="tagForm">
            <b>태그</b>
          </div>
          <Tag />
          <div className="container">
            <div className="left">
              <div className="instForm">
                <b>연주 악기</b>
                <IconButton>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={Instrument}
                onChange={(event, value) => {
                  console.log(event, value)
                  setValues({
                    ...values,
                    [value.name]: value
                  })
                }}
                getOptionLabel={(option) => option.name}
                // defaultValue={[Instrument[13], Instrument[12], Instrument[11]]}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Instruments" />
                )}
                sx={{ width: '100%' }}
              />
            </div>
            <div className="right">
              <div className="scopeForm">
                <b>공개 범위</b>
                <label>
                  <input
                    type="radio"
                    name="isPublic"
                    value="public"
                    onChange={handleChange}
                    checked
                  />
                  공개
                </label>
                <label>
                  <input
                    type="radio"
                    name="isPublic"
                    value="private"
                    onChange={handleChange}
                  />
                  비공개
                </label>
              </div>
              <div className="StackForm">
                <b>이어서 스택 쌓기</b>
                <label>
                  <input
                    type="radio"
                    name="isCompleted"
                    value="notCompleted"
                    onChange={handleChange}
                    checked
                  />
                  허용
                </label>
                <label>
                  <input
                    type="radio"
                    name="isCompleted"
                    value="completed"
                    onChange={handleChange}
                  />
                  불허용
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
