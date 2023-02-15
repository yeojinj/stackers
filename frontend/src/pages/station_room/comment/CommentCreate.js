import React, { useState } from 'react'
import axios from 'axios'
import { CreateComment } from '../../../store'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function CommentCreate() {
  const params = useParams()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const stationId = params.id
  return (
    <>
      <form
        className="create-comment"
        onSubmit={(event) => {
          event.preventDefault()
          // 댓글 작성 하기전에, accessToken부터 갱신하자.
          axios({
            method: 'post',
            url: `/api/station/${stationId}/comment`,
            data: {
              content
            },
            headers: {
              Authorization: localStorage.getItem('accessToken')
            }
          })
            .then((response) => {
              setContent('')
              dispatch(CreateComment(1)) // 댓글을 다시 불러오기 위함
            })
            .catch((error) => {
              console.error(error)
            })
        }}
      >
        <input
          placeholder="클린 댓글 챌린지! 기분 좋은 댓글을 남겨주세요"
          className="input-comment"
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
        />
        <button
          type="submit"
          className="article-follow-button"
          style={{ height: '40px', background: 'rgba(172, 0, 143, 0.8)' }}
        >
          작성
        </button>
      </form>
    </>
  )
}

export default CommentCreate
