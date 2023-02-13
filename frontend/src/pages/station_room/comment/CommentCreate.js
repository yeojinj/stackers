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
    <div>
      <form
        className="createComment"
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
          placeholder="댓글 작성"
          style={{
            width: '88%',
            height: '40px'
          }}
          value={content}
          onChange={(event) => {
            setContent(event.target.value)
          }}
        />
        <button
          type="submit"
          style={{
            height: '40px'
          }}
        >
          작성
        </button>
      </form>
    </div>
  )
}

export default CommentCreate
