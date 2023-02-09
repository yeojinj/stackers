import React, { useState } from 'react'
import './ProfileEdit.css'
import profileTest from '../../assets/profileTest.svg'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import MyDropzone from './MyDropzone'
// import ImageCrop from './ImageCrop'

function ProfileEdit() {
  const id = '아이디'
  const email = '이메일'
  const [nickname, setNickname] = useState('닉네임')
  const [bio, setBio] = useState('정보입니다.')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [image, setImage] = useState('')
  const Instrument = [
    {
      name: '기타'
    },
    { name: '가야금' },
    { name: '바이올린' },
    { name: '첼로' },
    { name: '비올라' },
    { name: '콘트라베이스' },
    { name: '피아노' },
    { name: '보컬' },
    { name: '북' },
    { name: '꽹과리' },
    { name: '장구' },
    { name: '징' },
    { name: '캐스터네츠' },
    { name: '실로폰' },
    { name: '비브라폰' },
    { name: '플룻' },
    { name: '클라리넷' },
    { name: '트럼펫' },
    { name: '하프' }
  ]
  const [group, setGroup] = useState('배도라지')

  const onChangeImage = (uploadedImage) => {
    setImage(URL.createObjectURL(uploadedImage))
    console.log(image)
  }
  return (
    <div className="ProfileEdit">
      <p className="ProfileEdit-head">프로필 편집</p>
      <div className="ProfileEdit-profilePicture ">
        <div className="ProfileEdit-first">
          <span>프로필 사진</span>
        </div>
        <div className="ProfileEdit-content">
          {/* 파일 클릭하면 dropzone 모달 띄우기 */}
          <img
            onClick={handleOpen}
            src={profileTest}
            alt="profileTest"
            style={{ width: '113px' }}
          />
          <Modal open={open} onClose={handleClose}>
            <Box>
              <MyDropzone
                onChangeImage={onChangeImage}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
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
            options={Instrument}
            getOptionLabel={(option) => option.name}
            // defaultValue={[Instrument[13], Instrument[12], Instrument[11]]}
            renderInput={(params) => (
              <TextField {...params} placeholder="Favorites" />
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
