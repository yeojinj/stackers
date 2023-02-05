import React, { useState } from 'react'
import profileTest from '../assets/profileTest.svg'
import '../styles/profileframe.css'

function profileFrame() {
  const [profile, setProfileDropDown] = useState(false)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)
  const profileInfo = {
    profile_img: profileTest
  }

  const profileDropdown = () => {
    setProfileDropDown(true)
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
        style={{ width: '55px', height: '55px', marginTop: '10px' }}
        src={profileInfo.profile_img}
        onMouseOver={profileDropdown}
        // onMouseLeave={() => setProfileDropDown(false)}
      ></img>
      <div className="profile-on">
        {profile && (
          <ul className="profile-dropdownbox">
            {profileList.map((dropDownItem, dropDownIndex) => {
              return (
                <li
                  key={dropDownIndex}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
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
