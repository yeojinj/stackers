import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import '../styles/profileframe.css'
import { useDispatch, useSelector } from 'react-redux'
import { LogOutState } from '../store'

function profileFrame() {
  const [profile, setProfileDropDown] = useState(false)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)
  // const profileInfo = {
  //   profile_img: AccountCircleIcon
  // }
  const userImage = useSelector((state) => {
    return state.user.imgPath
  })

  // 로그인 한 유저 정보
  const loginUser = useSelector((state) => {
    return state.user
  })

  const profileDropdown = () => {
    setProfileDropDown(true)
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToPage = (e) => {
    const page = e.target.textContent
    if (page === '내 프로필') {
      navigate(`/MyPage/${loginUser.username}`)
    } else if (page === '비밀번호 변경') {
      // 비밀번호 변경 페이지로 이동시키기
      // navigate('')
      console.log(page)
    } else if (page === '로그아웃') {
      // 로그아웃 시키기
      dispatch(LogOutState())
      navigate('/')
    }
  }
  const profileList = [
    '내 프로필',
    '비밀번호 변경',
    '도움말',
    '관리자 연결',
    '로그아웃'
  ]

  // 사용자 프로필 이미지 경로 있을 때
  const isImage = (
    <img
      src={userImage}
      style={{
        width: '42px',
        height: '42px',
        marginTop: '6px',
        borderRadius: '70%'
      }}
      onMouseOver={profileDropdown}
    />
  )

  // 사용자 프로필 이미지 경로 없을 때
  const noImage = (
    <AccountCircleIcon
      // color="secondary"
      sx={{ color: 'rgba(172, 0, 143, 1)' }}
      style={{
        width: '42px',
        height: '42px',
        marginTop: '8px'
      }}
      onMouseOver={profileDropdown}
    />
  )

  return (
    <div>
      {/* 드롭다운이 켜지면 업로드버튼과 프로필사진 위치 이동되는 이슈발생 */}
      {userImage === 'path' ? noImage : isImage}
      <div
        className="profile-on"
        onMouseLeave={() => setProfileDropDown(false)}
      >
        {profile && (
          <ul className="profile-dropdownbox">
            {profileList.map((dropDownItem, dropDownIndex) => {
              return (
                <li
                  onClick={goToPage}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  key={dropDownIndex}
                  className={
                    dropDownItemIndex === dropDownIndex
                      ? 'profile-menu selected'
                      : 'profile-menu'
                  }
                >
                  {dropDownItem}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default profileFrame
