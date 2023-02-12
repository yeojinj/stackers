import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
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
  const handleInst = async () => {
    const instData = {
      name: inputValue
    }
    await axios
      .post('/api/instrument', instData, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      })
      .then(() => {
        console.log('[악기업로드]] >> 성공')
        dispatch(CreateStack(['instrument', inputValue]))
      })
      .catch((error) => {
        alert('이미 존재하는 악기입니다')
        console.log(error)
      })
    console.log(instData)
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
        <div className="instForm">
          <b>연주 악기</b>
          <IconButton>
            <AddCircleOutlineIcon onClick={handleInst} />
          </IconButton>
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={changeInputValue}
        onKeyUp={handleDropDownKey}
      />
      {isHaveInputValue && (
        <ul>
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
