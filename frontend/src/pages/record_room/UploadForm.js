/* eslint-disable */
import React, { useState, useEffect, memo } from 'react'
import './Record'
import Tag from './ModalTag'
import './UploadForm.css'
import Moment from 'moment'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { CreateStack, ClearStack } from '../../store.js'
import InstTag from './InstTag.js'
import axios from 'axios'
import CheckComplete from './CheckComplete'

function UploadForm(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.stack
  })

  const musicName = data.music

  const username = useSelector((state) => {
    return state.user.username
  })
  const dateNow = Moment().format('YYYYMMDDHHmm')
  dispatch(CreateStack(['videoName', dateNow + username]))

  const handleClose = () => {
    props.handle()
  }
  const object = props.src.src.src

  const filedownloadlink = window.URL.createObjectURL(object)
  const [music, setMusic] = useState('')
  const handleChange = (e) => {
    if (e.target.name === 'music') {
      setMusic((music) => e.target.value)
    }
    dispatch(CreateStack([e.target.name, e.target.value]))
  }

  const [loading, setLoading] = useState(false)

  const [enable, setEnable] = useState(true)
  useEffect(() => {
    if (data.remainDepth === 0) {
      setEnable((enable) => false)
    }
  }, [data])

  // useEffect(() => {
  //   if (loading) navigate('/UploadLoading')
  //   else navigate(`/MyPage/${username}`)
  // }, [loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data.content || !data.music) {
      alert('빈칸을 입력해주세요')
    } else {
      if (data) {
        let testData = {
          content: data.content,
          music: data.music,
          instrument: data.instrument,
          tags: data.tags,
          heartCnt: data.heartCnt,
          remainDepth: data.remainDepth,
          isPublic: data.isPublic,
          isComplete: data.isComplete,
          prevStationId: data.prevStationId,
          videoName: data.videoName
          // delete: true
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
        formData.append('file', object)
        axios
          .post(`/api/station/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('accessToken')
            }
          })
          .then(() => setLoading(true))
          .catch((error) => {
            console.error(error)
          })
      }

      navigate('/UploadLoading')
      handleClose()
      dispatch(ClearStack())

      window.URL.revokeObjectUrl(filedownloadlink)
    }
  }
  return (
    <form className="section-left" onSubmit={handleSubmit}>
      {musicName !== '' && music === '' ? (
        <div className="input__items">
          <label className="upload-label">노래 제목</label>
          <input
            className="upload-input"
            type="text"
            name="music"
            disabled={true}
            defaultValue={musicName}
          ></input>
        </div>
      ) : (
        <div className="input__items">
          <label className="upload-label">노래 제목</label>
          <input
            className="upload-input"
            type="text"
            name="music"
            value={music}
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}
      <div className="input__items">
        <label className="upload-label">스테이션 설명</label>
        <textarea
          className="upload-input"
          type="text"
          name="content"
          value={data.content}
          onChange={(e) => handleChange(e)}
          style={{ height: '90px', fontFamily: 'Pretendard' }}
        />
      </div>
      <div className="input__items">
        <label className="upload-label">태그</label>
        <Tag />
      </div>
      <div className="input__items">
        <InstTag />
      </div>
      <div className="checkbox-container">
        <div className="input__items">
          <label className="upload-label">공개 범위 설정</label>
          <div>
            <label style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="isPublic"
                value="public"
                onChange={(e) => handleChange(e)}
                defaultChecked
              />
              공개
            </label>
            <label>
              <input
                type="radio"
                name="isPublic"
                value="private"
                onChange={(e) => handleChange(e)}
                style={{ fontSize: '0.9em' }}
              />
              비공개
            </label>
          </div>
        </div>
        {enable && <CheckComplete />}
      </div>
      <div className="upload-btn-container">
        <button
          type="submit"
          className="button-download button-complete"
          style={{ width: '20%' }}
          onClick={handleSubmit}
        >
          업로드
        </button>
      </div>
    </form>
  )
}
export default UploadForm = memo(UploadForm)
