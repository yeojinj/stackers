import React from 'react'
import './ProfileEdit.css'
import profileTest from '../../assets/profileTest.svg'

function ProfileEdit() {
  return (
    <div className="ProfileEdit">
      <p className="ProfileEdit-head">프로필 편집</p>
      <hr style={{ margin: '0px' }} />
      <div className="ProfileEdit-profilePicture ">
        <div style={{ width: '160px', margin: '15px' }}>
          <span>프로필 사진</span>
        </div>
        <div>
          <img src={profileTest} alt="profileTest" style={{ width: '113px' }} />
        </div>
      </div>
      <span>안녕</span>
    </div>
  )
}

export default ProfileEdit
