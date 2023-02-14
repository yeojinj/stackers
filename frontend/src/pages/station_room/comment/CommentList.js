import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import profilePicture1 from '../assets/profilePicture1.png'
import CommentCreate from '../comment/CommentCreate'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { CreateComment } from '../../../store'

function Comments(props) {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const stationId = Number(params.id)
  const [Comments, setComment] = useState(null)
  const reload = useSelector((state) => {
    return state.CreateComments.value
  })
  const loginUser = useSelector((state) => {
    return state.user
  })
  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`,
      headers: { Authorization: localStorage.getItem('accessToken') }
    })
      .then((response) => {
        setComment(response.data.comments)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [stationId, reload])

  const commentLst = []
  if (Comments !== null) {
    for (let i = 0; i < Comments.length; i++) {
      const username = Comments[i].commenterUsername
      const content = Comments[i].commentContent
      const releaseDate =
        Comments[i].commentRegTime.substr(0, 4) +
        '.' +
        Comments[i].commentRegTime.substr(5, 2) +
        '.' +
        Comments[i].commentRegTime.substr(8, 2)
      let profileImage = Comments[i].commenterImgPath
      // profileImage path가 없어서 임시로 만든 사진
      if (profileImage === 'path') {
        profileImage = profilePicture1
      }
      // 만약 사용중인 유저가 댓글 작성자면
      let deleteButton = null
      if (loginUser.username === Comments[i].commenterUsername) {
        // console.log(Comments[i])
        deleteButton = (
          <button
            onClick={() => {
              axios({
                method: 'delete',
                url: `/api/station/comment/${Comments[i].commentId}`,
                headers: { Authorization: localStorage.getItem('accessToken') }
              })
                .then((response) => {
                  alert('댓글이 삭제 되었습니다.')
                  dispatch(CreateComment(1))
                })
                .catch((error) => {
                  console.log(error)
                })
            }}
          >
            삭제
          </button>
        )
      }
      // console.log(deleteButton)
      commentLst.push(
        // 댓글 각각 추가
        <div key={i} style={{ margin: '10px' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={profileImage} //
              alt="profilePicture"
              style={{
                width: '50px',
                heigth: '50px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
              onClick={() => {
                navigate(`/MyPage/${username}`)
              }}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4
                  style={{ margin: '0px', cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/MyPage/${username}`)
                  }}
                >
                  {username}
                </h4>
                <p style={{ margin: '0px' }}>{content}</p>
                <p
                  style={{
                    color: 'gray',
                    margin: '0 0 0 10px'
                  }}
                >
                  {releaseDate}
                </p>
              </div>
              {deleteButton}
            </div>
          </div>
        </div>
      )
    }
  }
  return <div>{commentLst}</div>
}

function CommentList() {
  return (
    <>
      <div className="comment">
        <div className="comment-list">
          <Comments></Comments>
        </div>
      </div>
      <CommentCreate></CommentCreate>
    </>
  )
}
export default CommentList
