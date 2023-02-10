import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'
// import Button from '@mui/material/Button'

function InstTag(props) {
  const wholeTextArray = props.inst
  console.log(wholeTextArray)
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)
  const [dropDownList, setDropDownList] = useState(wholeTextArray)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      if (Array.isArray(choosenTextList) && choosenTextList.length === 0) {
        setIsHaveInputValue(false)
        setDropDownList([])
      } else {
        setIsHaveInputValue(true)
        setDropDownList(choosenTextList)
      }
    }
  }

  const changeInputValue = (event) => {
    setInputValue(event.target.value)
  }

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
  }

  const handleDropDownKey = (event) => {
    // input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1)
      }
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  useEffect(showDropDownList, [inputValue], [isHaveInputValue])

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
        />
      </div>
      {isHaveInputValue && (
        <ul className="dropdownbox">
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <li
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex
                    ? 'dropDownItemIndex selected'
                    : 'dropDownItemIndex'
                }
              >
                <SearchIcon
                  style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '5px'
                  }}
                />
                {dropDownItem}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default InstTag
