import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import profilePicture1 from '../assets/profilePicture1.png'
import CommentCreate from '../comment/CommentCreate'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Comments(props) {
  const params = useParams()
  const stationId = Number(params.id)
  const [Comments, setComment] = useState(null)
  const reload = useSelector((state) => {
    return state.CreateComments.value
  })
  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/station/${stationId}`
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
      commentLst.push(
        // 댓글 각각 추가
        <div key={i} style={{ margin: '10px' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={profileImage} //
              alt="profilePicture"
              style={{ width: '50px', heigth: '50px', marginRight: '10px' }}
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
                <h4 style={{ margin: '0px' }}>{username}</h4>
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
