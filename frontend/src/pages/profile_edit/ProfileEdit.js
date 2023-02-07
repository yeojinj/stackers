import React, { useState } from 'react'
import './ProfileEdit.css'
import profileTest from '../../assets/profileTest.svg'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

function ProfileEdit() {
  const id = '아이디'
  const email = '이메일'
  const [nickname, setNickname] = useState('닉네임')
  const [bio, setBio] = useState('정보입니다.')
  const Instruments = [
    '기타',
    '보컬',
    '젬베',
    '카혼',
    '피아노',
    '베이스',
    '일렉기타',
    'English'
  ]
  const [group, setGroup] = useState('배도라지')

  return (
    <div className="ProfileEdit">
      <p className="ProfileEdit-head">프로필 편집</p>
      <div className="ProfileEdit-profilePicture ">
        <div className="ProfileEdit-first">
          <span>프로필 사진</span>
        </div>
        <div className="ProfileEdit-content">
          <img src={profileTest} alt="profileTest" style={{ width: '113px' }} />
        </div>
      </div>

      <div className="ProfileEdit-Id">
        <div className="ProfileEdit-first">
          <span>아이디</span>
        </div>
        <div className="ProfileEdit-content">
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{id}</p>
          <p style={{ fontSize: '14px', fontWeight: 'lighter' }}>{email}</p>
        </div>
      </div>

      <div className="ProfileEdit-nickname">
        <div className="ProfileEdit-first">
          <span>닉네임</span>
        </div>
        <div className="ProfileEdit-content">
          <TextField
            size="small"
            name="nickname"
            value={nickname}
            style={{
              width: '100%'
            }}
            onChange={(event) => {
              setNickname(event.target.value)
            }}
          />
          <p style={{ fontSize: '12px', color: 'gray' }}>
            다른 스택커들에게 당신을 알려주는 정보입니다.
          </p>
        </div>
      </div>
      <div className="ProfileEdit-Bio">
        <div className="ProfileEdit-first">정보</div>
        <div className="ProfileEdit-content-Bio">
          <TextField
            size="small"
            name="bio"
            value={bio}
            style={{
              width: '100%'
            }}
            multiline
            rows={3}
            onChange={(event) => {
              setBio(event.target.value)
            }}
          />
        </div>
      </div>
      <div className="ProfileEdit-Instrument">
        <div className="ProfileEdit-first">악기</div>
        <div className="ProfileEdit-content-Bio">
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={Instruments}
            getOptionLabel={(option) => option.title}
            defaultValue={[Instruments[2]]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="limitTags"
                placeholder="한글이 깨져요"
              />
            )}
            sx={{ width: '100%' }}
          />
        </div>
      </div>
      <div className="ProfileEdit-group">
        <div className="ProfileEdit-first">소속</div>
        <div className="ProfileEdit-content">
          <TextField
            size="small"
            name="group"
            value={group}
            style={{
              width: '100%'
            }}
            onChange={(event) => {
              setGroup(event.target.value)
            }}
          />
          <p style={{ fontSize: '12px', color: 'gray' }}>
            소속 그룹이 있다면 나타내주세요!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
