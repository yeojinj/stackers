import React, { useState } from 'react'

const Tag = () => {
  const [tagItem, setTagItem] = useState('')
  const [tagList, setTagList] = useState([])

  const onKeyPress = (e) => {
    console.log(tagList)
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      const updatedTagList = [...tagList]
      updatedTagList.push(tagItem)
      setTagList(updatedTagList)
      console.log('2' + tagList)
      setTagItem('')
    }
  }

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    )
    setTagList(filteredTagList)
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Press enter to add tags"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyUp={onKeyPress}
        />
        {tagList.map((tagItem, index) => {
          return (
            <div key={index}>
              <span>{tagItem}</span>
              <button onClick={deleteTagItem}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Tag
