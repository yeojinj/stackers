import React, { useEffect, useState } from 'react'
import { Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { TagList } from '../../store.js'

const InstTag = () => {
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])
  const tags = useSelector((state) => {
    return state.TagList.tags
  })
  const dispatch = useDispatch()
  const uploadTagHandler = () => {
    if (tagList.length < 3) {
      dispatch(TagList([...tagList, tagItem]))
      setTagList((tagList) => [...tagList, tagItem])
      setTagItem('')
    }
  }

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tags.filter((tagItem) => tagItem !== deleteTagItem)
    dispatch(TagList(filteredTagList))
    setTagList(filteredTagList)
  }
  useEffect(() => {}, tagList)
  return (
    <div>
      <div>
        <input
          type="text"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          placeholder="최대 3개까지 넣을 수 있어요"
        />
        {/* onKeyDown이 이슈가 많아서 버튼 이벤트와 함께 사용 & 하지만, 보이지는 않게 설정함 */}
        <button
          onClick={() => {
            uploadTagHandler()
          }}
        >
          upload!
        </button>
        {tags.map((tagItem, index) => {
          return (
            <span key={index}>
              <Chip
                label={tagItem}
                onDelete={deleteTagItem}
                variant="outlined"
                color="primary"
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
export default InstTag
