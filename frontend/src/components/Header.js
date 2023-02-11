import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.svg'
import searchimg from '../assets/search.svg'
import ProfileFrame from './profileFrame'
import '../styles/header.css'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LogIn from '../pages/sign_folder/LogIn/LogIn'
import { SearchKeyword } from '../store'
// import Button from '@mui/material/Button'

function Header() {
  // const [login, setLogin] = useState(false)

  // axios 실행시 주석 해제
  const token = localStorage.getItem('accessToken')
  const [search, setSearch] = useState({
    stationList: [
      {
        id: 3,
        content: '깜찍한 저예요',
        tags: ['SSAFY', '광주'],
        video: {
          id: 3,
          videoPath: 'static/videos/s3비디오링크.mp4',
          videoName: '원본video03.mp4',
          thumbnailPath: null
        }
      }
    ],
    memberList: [
      {
        id: 4,
        imgPath: 'static/s3이미지링크.png',
        username: 'user04',
        nickname: '깜찍한 백지원',
        teamName: '배도라지'
      },
      {
        id: 4,
        imgPath: 'static/s3이미지링크.png',
        username: 'user05',
        nickname: '깜찍한 최보영',
        teamName: '배도라지'
      },
      {
        id: 4,
        imgPath: 'static/s3이미지링크.png',
        username: 'user06',
        nickname: '깜찍한 이창민',
        teamName: '배도라지'
      }
    ]
  })
  const [inputValue, setInputValue] = useState('')
  const [isHaveInputValue, setIsHaveInputValue] = useState(false)

  // wholeTextArray 대신 search 넣기
  const [stationdropDownList, setStationDropDownList] = useState(
    search.stationList
  )
  const [AccountdropDownList, setAccountDropDownList] = useState(
    search.memberList
  )
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

  const searchList = () => {
    console.log('axios로 보낼 키워드', inputValue)
    axios
      // 검색 api 주소
      .get(`/api/search/${inputValue}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setSearch(res.data)
        console.log('받아온 검색결과들', search)
      })
      .catch((err) => console.log(err))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로고 클릭시 메인페이지로 이동
  const navigateToMain = () => {
    navigate('/')
  }
  // 업로드 버튼 클릭 -> 녹화페이지로 이동
  const goRecordRoom = () => {
    navigate('/RecordRoom')
  }

  // 클릭 누르면 검색페이지 이동
  const gotoSearch = () => {
    if (inputValue) {
      dispatch(SearchKeyword(inputValue))
      navigate(`/SearchView/?${inputValue}`, {
        state: { keyword: `${inputValue}` }
      })
      setIsHaveInputValue(false)
    }
  }

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setStationDropDownList([])
      setAccountDropDownList([])
    } else {
      // const choosenTextList = search.filter((textItem) =>
      //   textItem.toLowerCase().startsWith(inputValue.toLowerCase())
      // )
      if (Array.isArray(search) && search.length === 0) {
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

  const clickDropDownItem = (clickedItem) => {
    // 클릭하면 바로 드롭다운 없어져야 하는데 두번 클릭해야 사라짐
    if (clickedItem.content) {
      setInputValue(clickedItem.content)
      setIsHaveInputValue(false)
    } else {
      // 계정으로 이동
      navigate(`/MyPage/${clickedItem.username}`)
      setIsHaveInputValue(false)
    }
  }

  // const handleDropDownKey = (event) => {
  //   // input에 값이 있을때만 작동
  //   if (isHaveInputValue) {
  //     if (
  //       event.key === 'ArrowDown' &&
  //       dropDownList.length - 1 > dropDownItemIndex
  //     ) {
  //       setDropDownItemIndex(dropDownItemIndex + 1)
  //     }

  //     if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
  //       setDropDownItemIndex(dropDownItemIndex - 1)
  //     }
  //     if (event.key === 'Enter' && dropDownItemIndex >= 0) {
  //       clickDropDownItem(dropDownList[dropDownItemIndex])
  //       setDropDownItemIndex(-1)
  //     }
  //   }
  // }

  useEffect(showDropDownList, [inputValue], [isHaveInputValue])

  useEffect(() => {
    if (inputValue) {
      searchList()
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
        {/* 검색창 */}
        {/* <InputBox isHaveInputValue={isHaveInputValue}>
            <Input
              type="text"
              value={inputValue}
              onChange={changeInputValue}
              onKeyUp={handleDropDownKey}
            />
            <DeleteButton onClick={() => setInputValue('')}>
              &times;
            </DeleteButton>
          </InputBox>
          {isHaveInputValue && (
            <DropDownBox>
              {dropDownList.length === 0 && (
                <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
              )}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <DropDownItem
                    key={dropDownIndex}
                    onClick={() => clickDropDownItem(dropDownItem)}
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={
                      dropDownItemIndex === dropDownIndex ? 'selected' : ''
                    }
                  >
                    {dropDownItem}
                  </DropDownItem>
                )
              })}
            </DropDownBox>
          )} */}
        <div className="header-search">
          <input
            className="search-input"
            placeholder="검색어를 입력해주세요."
            type="text"
            value={inputValue}
            onChange={changeInputValue}
            // onKeyUp={handleDropDownKey}
          />
          <img onClick={gotoSearch} className="search-icon" src={searchimg} />
        </div>
        {isHaveInputValue && (
          <ul className="dropdownbox">
            {search.length === 0 && (
              <div className="dropDownItemIndex">해당하는 단어가 없습니다</div>
            )}
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
            <div className="accounts-title">Accounts</div>
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
                    <img src={dropDownItem.imgPath} className="dropdown-img" />
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

// const activeBorderRadius = '16px 16px 0 0'
// const inactiveBorderRadius = '16px 16px 16px 16px'
// const InputBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 16px;
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   border-radius: ${(props) =>
//     props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
//   z-index: 3;

//   &:focus-within {
//     box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
//   }
// `

// const Input = styled.input`
//   flex: 1 0 0;
//   margin: 0;
//   padding: 0;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   font-size: 16px;
// `

// const DeleteButton = styled.div`
//   cursor: pointer;
// `

// const DropDownBox = styled.ul`
//   display: block;
//   margin: 0 auto;
//   padding: 8px 0;
//   background-color: white;
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   border-top: none;
//   border-radius: 0 0 16px 16px;
//   box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
//   list-style-type: none;
//   z-index: 3;
// `

// const DropDownItem = styled.li`
//   padding: 0 16px;

//   &.selected {
//     background-color: lightgray;
//   }
// `

export default Header
