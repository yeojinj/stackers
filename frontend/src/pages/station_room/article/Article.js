import React from 'react'
import ArticleDetail from './ArticleDetail'
import CommentList from '../comment/CommentList'
// import CommentCreate from '../comment/CommentCreate'

function Article(props) {
  // console.log(props.Info)
  return (
    <div className="RightStyle">
      <ArticleDetail info={props.info}></ArticleDetail>
      <CommentList></CommentList>
      {/* <CommentCreate></CommentCreate> */}
    </div>
  )
}
export default Article
