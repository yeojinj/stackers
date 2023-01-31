/* eslint-disable */
import React, { useState } from 'react'
import profilePicture1 from '../assets/profilePicture1.png'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

function Comments(props) {
  // console.log(props.Information);
  // const [lst, setLst] = useState([])
  const lst = []
  for (let i = 0; i < props.Information.length; i++) {
    const username = props.Information[i].username
    const content = props.Information[i].content
    const release_date = props.Information[i].release_date
    // const [commentLike, setCommentLike] = useState(0)
    const [isCommentLiked, setIsCommentLike] = useState(false)
    // const profilePicture = props.Information[i].profilePicture
    // console.log(profilePicture1)
    function LikeClick() {
      setIsCommentLike(!isCommentLiked)
    }

    let LikeContent = null
    if (isCommentLiked) {
      LikeContent = (
        <FavoriteRoundedIcon
          onClick={(event) => {
            event.preventDefault()
            LikeClick(event.target)
          }}
          style={{ color: 'rgba(227, 95, 173, 1)' }}
        ></FavoriteRoundedIcon>
      )
    } else {
      LikeContent = (
        <FavoriteBorderRoundedIcon
          onClick={(event) => {
            event.preventDefault()
            LikeClick(event.target)
          }}
        ></FavoriteBorderRoundedIcon>
      )
    }

    lst.push(
      <div key={props.Information[i].id} style={{ margin: '10px' }}>
        <div style={{ display: 'flex' }}>
          <img
            src={profilePicture1}
            alt="profilePicture"
            style={{ width: '50px', heigth: '50px', marginRight: '10px' }}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h4 style={{ margin: '0px' }}>{username}</h4>
              <p style={{ margin: '0px' }}>{content}</p>
              <p
                style={{
                  color: 'gray',
                  margin: '0 0 0 10px',
                }}
              >
                {release_date}
              </p>
            </div>
            {LikeContent}
          </div>
        </div>
      </div>
    )
  }
  // console.log(lst);
  return <div>{lst}</div>
}

function CommentList() {
  const commentInformation = [
    {
      id: 1,
      username: 'HelloSsafy',
      content: '만나서 반갑습니다.',
      release_date: '2023.01.19',
      profilePicture: { profilePicture1 },
    },
    {
      id: 2,
      username: 'flamingo_fly',
      content: 'You have great talent! Love it!!!',
      release_date: '2023.01.19',
      profilePicture: '../assets/profilePicture2',
    },
    {
      id: 3,
      username: 'toughcooooookie',
      content: '아이 러브 레게',
      release_date: '2023.01.19',
      profilePicture: '../assets/profilePicture3',
    },
  ]
  return (
    <div className="comment">
      <div className="comment-list">
        <Comments Information={commentInformation}></Comments>
      </div>
    </div>
  )
}
export default CommentList
