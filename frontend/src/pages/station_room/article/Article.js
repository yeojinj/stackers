import React from 'react'
import ArticleDetail from './ArticleDetail'
import CommentList from '../comment/CommentList'
import CommentCreate from '../comment/CommentCreate'

function Article() {
  return (
    <div className="RightStyle">
      <ArticleDetail></ArticleDetail>
      <CommentList></CommentList>
      <CommentCreate></CommentCreate>
    </div>
  )
}
export default Article
