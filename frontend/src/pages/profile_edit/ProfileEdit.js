import React, { useState, useEffect } from 'react'
import './ProfileEdit.css'
import NoImg from '../../assets/noImg.svg'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import MyDropzone from './MyDropzone'
import axios from 'axios'
// import ImageCrop from './ImageCrop'

function ProfileEdit() {
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [instruments, setInstruments] = useState('')
  const [parties, setParties] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [imageurl, setImageurl] = useState('')
  const [image, setImage] = useState('')
  const token = localStorage.getItem('accessToken')
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

  // 사용자 정보 조회
  async function userInfo() {
    console.log(token)
    await axios
      .get('/api/member/user', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        console.log('[회원정보가져오는거 확인]', res.data)
        setId(res.data.id)
        setUsername(res.data.username)
        setNickname(res.data.nickname)
        setEmail(res.data.email)
        setBio(res.data.bio)
        setImageurl(res.data.imgPath)
        setInstruments(res.data.Instruments)
        setParties(res.data.parties)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    userInfo()
  }, [])

  // mydropzone 컴포넌트에서 보내온 이미지 파일
  const onChangeImage = (uploadedImage) => {
    console.log(
      '[프로필 편집 컴포넌트에서 사진 변경시 오는지 확인]',
      uploadedImage
    )
    setImage(uploadedImage)
    const imgsrc = document.getElementById('profileedit-img')
    setImageurl(URL.createObjectURL(uploadedImage))
    imgsrc.src = imageurl
  }

  // 415 오류 발생 -> 수정 필요!!!!
  const changeInfo = () => {
    console.log(id)
    const newInfo = {
      nickname,
      bio
    }
    console.log(newInfo)
    const formData = new FormData()
    formData.append(
      'info',
      new Blob([JSON.stringify(newInfo)], {
        type: 'application/json'
      })
    )
    console.log(instruments)
    console.log('[axios 로 보낼 이미지 파일 확인]', image)
    formData.append('profile', image)
    console.log(formData)
    axios
      .put('/api/member/user', formData, {
        data: newInfo,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
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
            id="profileedit-img"
            onClick={handleOpen}
            src={imageurl === 'path' ? NoImg : imageurl}
            alt="profileTest"
            style={{
              width: '113px',
              height: '110px',
              borderRadius: '70%'
            }}
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
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {username || '아이디'}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 'lighter' }}>
            {email || '이메일'}
          </p>
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
            value={nickname || ''}
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
            value={bio || ''}
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
      {/* 악기는 어떻게 조회해야할까요 */}
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
              <TextField
                {...params}
                placeholder={params ? '' : '악기를 입력해주세요'}
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
            value={parties || ''}
            style={{
              width: '100%'
            }}
            onChange={(event) => {
              setParties(event.target.value)
            }}
          />
          <p style={{ fontSize: '12px', color: 'gray' }}>
            소속 그룹이 있다면 나타내주세요!
          </p>
        </div>
      </div>
      <button className="profile-edit-btn" onClick={changeInfo}>
        업로드
      </button>
    </div>
  )
}

export default ProfileEdit
