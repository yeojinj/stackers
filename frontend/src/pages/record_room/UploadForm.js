/* eslint-disable */

import React, { useState, useEffect } from 'react'
import './Record'
import Tag from './ModalTag'
import './UploadForm.css'
import TextField from '@mui/material/TextField'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { CreateStack, ClearStack } from '../../store.js'
import InstTag from './InstTag.js'
import axios from 'axios'

const blobFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      resolve(event.target.result)
    }
    reader.readAsDataURL(file)
  })
function UploadForm(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.stack
  })
  const username = useSelector((state) => {
    return state.user.username
  })
  const instLst = useSelector((state) => {
    return state.CreateInst
  })

  const dateNow = Moment().format('YYYYMMDDHHmm')
  dispatch(CreateStack(['videoName', dateNow + username]))

  const handleClose = () => {
    props.handle()
  }
  const object = props.src.src.src

  const filedownloadlink = window.URL.createObjectURL(object)

  const [values, setValues] = useState({
    content: '',
    music: '',
    instrumentId: 0,
    heartCnt: 0,
    remainDepth: 0,
    isPublic: 0,
    isComplete: 0,
    tags: [''],
    prevStationId: 0,
    videoName: '',
    delete: true,
    file: filedownloadlink
  })

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)

    dispatch(CreateStack([e.target.name, e.target.value]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.content || !data.music) {
      alert('빈칸을 입력해주세요')
    } else {
      if (data) {
        let testData = {
          content: data.content,
          music: data.music,
          instrumentId: data.instrumentId,
          tags: data.tags,
          heartCnt: data.heartCnt,
          remainDepth: data.remainDepth,
          isPublic: data.isPublic,
          isComplete: data.isComplete,
          prevStationId: data.prevStationId,
          videoName: data.videoName
          // delete: true
        }
        console.log(testData)
        const formData = new FormData()
        // 기본 정보
        formData.append(
          'info',
          new Blob([JSON.stringify(testData)], {
            type: 'application/json'
          })
        )

        // 파일 정보
        formData.append('file', object)
        await axios
          .post(`/api/station/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('accessToken')
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
      dispatch(ClearStack())
      window.URL.revokeObjectUrl(filedownloadlink)
    }
  }
  return (
    <div className="upload container">
      <video
        className="stackVideo"
        src={filedownloadlink}
        width={258}
        height={402}
        style={{ objectFit: 'cover' }}
        controls
      />
      <form className="right" onSubmit={handleSubmit}>
        <div className="item">
          <b>노래 제목</b>
        </div>
        <input
          type="text"
          name="music"
          value={data.music}
          onChange={handleChange}
        ></input>
        {filedownloadlink && (
          <a href={filedownloadlink} download>
            Download
          </a>
        )}
        <div className="infoForm">
          <b>설명</b>
        </div>
        <input
          type="text"
          name="content"
          value={data.content}
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
              <InstTag inst={instLst.inst} />
            </div>
          </div>
          <div className="right">
            <div className="scopeForm">
              <div>
                <b>공개 범위</b>
              </div>
              <label>
                <input
                  type="radio"
                  name="isPublic"
                  value="public"
                  onChange={handleChange}
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
              <div>
                <b>이어서 스택 쌓기</b>
              </div>
              <label>
                <input
                  type="radio"
                  name="isComplete"
                  value="notCompleted"
                  onChange={handleChange}
                />
                허용
              </label>
              <label>
                <input
                  type="radio"
                  name="isComplete"
                  value="completed"
                  onChange={handleChange}
                />
                불허용
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="uploadButton" onClick={handleSubmit}>
          업로드
        </button>
      </form>
    </div>
  )
}
export default UploadForm
