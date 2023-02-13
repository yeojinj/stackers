/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CreateStack } from '../../store.js'
import axios from 'axios'

function InstTag() {
  const getInst = async () => {
    await axios({
      method: 'GET',
      url: '/api/instrument'
    })
      .then((response) => {
        setInstLst(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const dispatch = useDispatch()
  const [instLst, setInstLst] = useState([])
  useEffect(() => {
    getInst()
  }, [])
  const wholeTextArray = []

  for (const item in instLst) {
    wholeTextArray.push(instLst[item].name)
  }
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
    dispatch(CreateStack(['instrument', event.target.value]))
  }

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem)

    dispatch(CreateStack(['instrument', clickedItem]))
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
      <div className="input__items" style={{ marginTop: '2%' }}>
        <label className="upload-label">연주 악기</label>
        <input
          placeholder="어떤 악기로 연주했나요?"
          className="upload-input"
          type="text"
          value={inputValue}
          onChange={changeInputValue}
        />
      </div>
      <div className="inst-tags">
        {isHaveInputValue && (
          <>
            {dropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <div
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex
                      ? 'dropdown-item-index selected-inst'
                      : 'dropdown-item-index'
                  }
                >
                  {dropDownItem}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
export default InstTag
