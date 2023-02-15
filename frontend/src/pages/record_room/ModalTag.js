import React, { useState } from 'react'
import { Chip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { CreateStack } from '../../store.js'

const Tag = () => {
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const dispatch = useDispatch()
  const uploadTagHandler = () => {
    dispatch(CreateStack(['tags', [...tagList, tagItem]]))

    setTagList((tagList) => [...tagList, tagItem])
    setTagItem('')
  }

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    )
    dispatch(CreateStack(['tags', filteredTagList]))
    setTagList(filteredTagList)
  }

  return (
    <div className="tag-container">
      <div className="tag-upper-input">
        <input
          className="upload-input tag"
          type="text"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
        />
        {/* onKeyDown이 이슈가 많아서 버튼 이벤트와 함께 사용 & 하지만, 보이지는 않게 설정함 */}
        <button
          className="button-download tag-btn"
          style={{ fontWeight: 'bold' }}
          onClick={(e) => {
            e.preventDefault()
            uploadTagHandler()
          }}
        >
          #
        </button>
      </div>
      <div className="tag-chips">
        {tagList.map((tagItem, index) => {
          return (
            <Chip
              key={index}
              label={tagItem}
              variant="outlined"
              color="secondary"
              onDelete={deleteTagItem}
              style={{ color: 'whitesmoke' }}
            />
          )
        })}
      </div>
    </div>
  )
}
export default Tag
