/* eslint-disable */
import React from 'react'

function Comments(props) {
  // console.log(props.Information);
  // const [lst, setLst] = useState([])
  const lst = []
  for (let i = 0; i < props.Information.length; i++) {
    const username = props.Information[i].username
    const content = props.Information[i].content
    const release_date = props.Information[i].release_date

    lst.push(
      <div key={props.Information[i].id} style={{ margin: '10px' }}>
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
    },
    {
      id: 2,
      username: 'flamingo_fly',
      content: 'You have great talent! Love it!!!',
      release_date: '2023.01.19',
    },
    {
      id: 3,
      username: 'toughcooooookie',
      content: '아이 러브 레게',
      release_date: '2023.01.19',
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
