import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.svg'
import searchimg from '../assets/search.svg'
import DefaultImg from '../assets/default_profile.png'
import ProfileFrame from './profileFrame'
import './header.css'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LogIn from '../pages/sign_folder/LogIn/LogIn'
import { SearchKeyword } from '../store'

function Header() {
  const token = localStorage.getItem('accessToken')
  const [search, setSearch] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)

  const [stationdropDownList, setStationDropDownList] = useState([])
  const [AccountdropDownList, setAccountDropDownList] = useState([])
  const [stationdropDownItemIndex, setStationDropDownItemIndex] = useState(-1)
  const [accountdropDownItemIndex, setAccountDropDownItemIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const userLogin = useSelector((state) => {
    return state.user.isLogged
  })

  const IsLogin = () => {
    if (userLogin) {
      return (
        <>
          <div className="upload-profile">
            <button className="upload-btn" onClick={goRecordRoom}>
              + 업로드
            </button>
            <ProfileFrame />
          </div>
        </>
      )
    } else {
      return (
        <>
          <button className="login-btn" onClick={handleOpen}>
            로그인
          </button>
        </>
      )
    }
  }

  const searchList = (inputValue) => {
    axios
      // 검색 api 주소
      .get(`/api/search/${inputValue}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setSearch(res.data)
        setStationDropDownList(res.data.stationList)
        setAccountDropDownList(res.data.memberList)
      })
      .catch((err) => console.log(err))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로고 클릭시 메인페이지로 이동
  const navigateToMain = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setInputValue('')
    navigate('/')
  }

  // 업로드 버튼 클릭 -> 녹화페이지로 이동
  const goRecordRoom = () => {
    console.log('hello')
    setInputValue('')

    navigate('/RecordRoom/-1')
  }

  // 검색 아이콘 클릭 -> 검색결과페이지 이동
  const gotoSearch = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    if (inputValue) {
      dispatch(SearchKeyword(inputValue))
      navigate(`/SearchView/?${inputValue}`, {
        state: { keyword: `${inputValue}` }
      })
      setIsHaveInputValue(false)
    }
  }

  const movetoSearch = (e) => {
    if (e.key === 'Enter') {
      gotoSearch()
    }
  }

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setStationDropDownList([])
      setAccountDropDownList([])
    } else {
      if (
        Array.isArray(stationdropDownList) &&
        stationdropDownList.length === 0 &&
        Array.isArray(AccountdropDownList) &&
        AccountdropDownList.length === 0
      ) {
        setIsHaveInputValue(false)
        setStationDropDownList([])
        setAccountDropDownList([])
      } else {
        setIsHaveInputValue(true)
        setStationDropDownList(search.stationList)
        setAccountDropDownList(search.memberList)
      }
    }
  }

  const changeInputValue = (event) => {
    setInputValue(event.target.value)
  }

  // 클릭하면 바로 드롭다운 없어져야 하는데 두번 클릭해야 사라짐
  const clickDropDownItem = (clickedItem) => {
    // 검색어 클릭 -> 상세조회
    if (clickedItem.content) {
      navigate(`/StationRoom/${clickedItem.id}`)
      setIsHaveInputValue(false)
    } else {
      // 계정 클릭 -> 마이페이지
      navigate(`/MyPage/${clickedItem.username}`)
      setIsHaveInputValue(false)
    }
  }

  useEffect(showDropDownList, [inputValue], [isHaveInputValue])

  useEffect(() => {
    if (inputValue) {
      setInputValue(inputValue)
      searchList(inputValue)
    }
  }, [inputValue])

  return (
    <header className="header">
      <Modal open={open} onClose={handleClose}>
        <Box>
          <LogIn handleClose={handleClose} />
        </Box>
      </Modal>
      <img className="logo-img" src={logo} onClick={navigateToMain}></img>
      <div className="header-container">
        <div className="header-search">
          <input
            className="search-input"
            placeholder="검색어를 입력해주세요."
            type="text"
            value={inputValue}
            onChange={(e) => {
              changeInputValue(e)
            }}
            onKeyUp={movetoSearch}
          />
          <img onClick={gotoSearch} className="search-icon" src={searchimg} />
        </div>
        {isHaveInputValue && stationdropDownList && AccountdropDownList && (
          <ul className="dropdownbox">
            {stationdropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <li
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setStationDropDownItemIndex(dropDownIndex)}
                  onMouseLeave={() => setStationDropDownItemIndex(-1)}
                  className={
                    stationdropDownItemIndex === dropDownIndex
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
                  {dropDownItem.content}
                </li>
              )
            })}
            <div className="accounts-title">Account</div>
            {AccountdropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <li
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setAccountDropDownItemIndex(dropDownIndex)}
                  onMouseLeave={() => setAccountDropDownItemIndex(-1)}
                  className={
                    accountdropDownItemIndex === dropDownIndex
                      ? 'dropDownItemIndex selected'
                      : 'dropDownItemIndex'
                  }
                >
                  <div>
                    <img
                      src={
                        dropDownItem.imgPath !== 'path'
                          ? dropDownItem.imgPath
                          : DefaultImg
                      }
                      alt=""
                      className="dropdown-img"
                    />
                  </div>
                  <div className="dropdown-accounts">
                    <div className="dropdown-user">{dropDownItem.username}</div>
                    <div className="dropdown-nick">{dropDownItem.nickname}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {/* 로그인버튼 or 업로드버튼 + 프로필사진 */}
      <IsLogin />
    </header>
  )
}

export default Header
