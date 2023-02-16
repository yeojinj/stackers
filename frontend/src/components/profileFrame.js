import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DefaultImg from '../assets/default_profile.png'
import './profileframe.css'
import { useDispatch, useSelector } from 'react-redux'
import { LogOutState } from '../store'

function profileFrame() {
  const [profile, setProfileDropDown] = useState(false)
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1)
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
    } else if (page === '의견 보내기') {
      window.location.href = 'mailto:www.stackers.site@gmail.com'
    } else if (page === '로그아웃') {
      // 로그아웃 시키기
      dispatch(LogOutState())
      navigate('/')
    }
  }
  const profileList = ['내 프로필', '의견 보내기', '로그아웃']

  return (
    <div>
      <img
        src={userImage !== 'path' ? userImage : DefaultImg}
        alt=""
        style={{
          width: '42px',
          height: '42px',
          marginTop: '6px',
          borderRadius: '70%'
        }}
        onMouseOver={profileDropdown}
      />
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
