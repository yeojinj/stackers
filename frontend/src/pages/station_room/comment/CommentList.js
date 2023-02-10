/* eslint-disable */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import profilePicture1 from '../assets/profilePicture1.png'
import CommentCreate from '../comment/CommentCreate'

function Comments(props) {
  const lst = []
  for (let i = 0; i < props.Information.length; i++) {
    const username = props.Information[i].username
    const content = props.Information[i].content
    const release_date = props.Information[i].release_date

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
                {release_date}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return <div>{lst}</div>
}

function CommentList() {
  const commentInformation = [
    {
      id: 1,
      username: 'HelloSsafy',
      content: '만나서 반갑습니다.',
      release_date: '2023.01.19',
      profilePicture: { profilePicture1 }
    },
    {
      id: 2,
      username: 'flamingo_fly',
      content: 'You have great talent! Love it!!!',
      release_date: '2023.01.19',
      profilePicture: '../assets/profilePicture2'
    },
    {
      id: 3,
      username: 'toughcooooookie',
      content: '아이 러브 레게',
      release_date: '2023.01.19',
      profilePicture: '../assets/profilePicture3'
    },
    {
      id: 4,
      username: 'pink',
      content: '젬베 야무지시네요',
      release_date: '2023.01.19'
      // profilePicture: { profilePicture1 }
    },
    {
      id: 5,
      username: 'Hi Hello',
      content: 'Wow.. awosome!!!!!!!!',
      release_date: '2023.01.19'
      // profilePicture: '../assets/profilePicture2'
    },
    {
      id: 6,
      username: 'toughcooooookie',
      content: '아이 러브 레게',
      release_date: '2023.01.19'
      // profilePicture: '../assets/profilePicture3'
    }
  ]
  return (
    <>
      <div className="comment">
        <div className="comment-list">
          <Comments Information={commentInformation}></Comments>
        </div>
      </div>
      <CommentCreate></CommentCreate>
    </>
  )
}
export default CommentList
