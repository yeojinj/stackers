import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profileTest from '../assets/profileTest.svg'
import '../styles/profileframe.css'
import { useDispatch } from 'react-redux'
import { LogOutState } from '../store'

function profileFrame() {
  const [profile, setProfileDropDown] = useState(false)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)
  const profileInfo = {
    profile_img: profileTest
  }

  const profileDropdown = () => {
    setProfileDropDown(true)
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToPage = (e) => {
    const page = e.target.textContent
    if (page === '내 프로필') {
      navigate('/MyPage')
    } else if (page === '비밀번호 변경') {
      // 비밀번호 변경 페이지로 이동시키기
      // navigate('')
      console.log(page)
    } else if (page === '로그아웃') {
      // 로그아웃 시키기
      dispatch(LogOutState())
      navigate('/MainRoom')
    }
  }
  const profileList = [
    '내 프로필',
    '비밀번호 변경',
    '도움말',
    '관리자 연결',
    '로그아웃'
  ]

  return (
    <div>
      {/* 드롭다운이 켜지면 업로드버튼과 프로필사진 위치 이동되는 이슈발생 */}
      {/* 이슈 해결 후 onMouseLeave 이벤트 주석 해제하기 */}
      <img
        style={{ width: '42px', height: '42px', marginTop: '6px' }}
        src={profileInfo.profile_img}
        onMouseOver={profileDropdown}
      ></img>
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
