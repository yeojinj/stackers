/* eslint-disable */
import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function CommentCreate() {
  return (
    <div className="createComment">
      <TextField
        placeholder="댓글 작성"
        size="small"
        style={{
          width: '88%',
          height: '40px',
        }}
      />
      <Button
        variant="outlined"
        style={{
          height: '40px',
        }}
      >
        작성
      </Button>
    </div>
  )
}

export default CommentCreate
