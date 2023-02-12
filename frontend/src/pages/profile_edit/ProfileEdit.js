import React, { useState, useEffect } from 'react'
import './ProfileEdit.css'
import { useSelector, useDispatch } from 'react-redux'
import InstTag from './InstTag'
import NoImg from '../../assets/noImg.svg'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import MyDropzone from './MyDropzone'
import axios from 'axios'
import { TagList } from '../../store.js'
// import ImageCrop from './ImageCrop'

function ProfileEdit() {
  const tags = useSelector((state) => {
    return state.TagList.tags
  })
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [instruments, setInstruments] = useState(tags)
  const [party, setParty] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [imageurl, setImageurl] = useState('')
  const [image, setImage] = useState('')
  const token = localStorage.getItem('accessToken')

  // const Instrument = [
  //   {
  //     name: '기타'
  //   },
  //   { name: '가야금' },
  //   { name: '바이올린' },
  //   { name: '첼로' },
  //   { name: '비올라' },
  //   { name: '콘트라베이스' },
  //   { name: '피아노' },
  //   { name: '보컬' },
  //   { name: '북' },
  //   { name: '꽹과리' },
  //   { name: '장구' },
  //   { name: '징' },
  //   { name: '캐스터네츠' },
  //   { name: '실로폰' },
  //   { name: '비브라폰' },
  //   { name: '플룻' },
  //   { name: '클라리넷' },
  //   { name: '트럼펫' },
  //   { name: '하프' }
  // ]

  // 사용자 정보 조회
  const dispatch = useDispatch()
  async function userInfo() {
    await axios
      .get('/api/member/user', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setId(res.data.id)
        setUsername(res.data.username)
        setNickname(res.data.nickname)
        setEmail(res.data.email)
        setBio(res.data.bio)
        setImageurl(res.data.imgPath)
        dispatch(TagList(res.data.instruments))
        setInstruments(res.data.instruments)
        setParty(res.data.party)
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
      bio,
      instruments,
      party
    }
    console.log(newInfo)
    // 이미지를 업데이트 했다면
    if (image) {
      const formData = new FormData()
      formData.append(
        'info',
        new Blob([JSON.stringify(newInfo)], {
          type: 'application/json'
        })
      )
      formData.append('profile', image)
      axios
        .post('/api/member/user', formData, {
          data: newInfo,
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('[성공]', res.data)
        })
        .catch((err) => console.log(err))
    } else {
      // 이미지를 업데이트 하지 않았다면
      axios
        .post('api/member/user', {
          data: newInfo,
          headers: {
            Authorization: token
          }
        })
        .then((res) => {
          console.log('[성공]', res.data)
        })
        .catch((err) => console.log(err))
    }
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
          <InstTag instruments={instruments} />
        </div>
      </div>
      <div className="ProfileEdit-group">
        <div className="ProfileEdit-first">소속</div>
        <div className="ProfileEdit-content">
          <TextField
            size="small"
            name="group"
            value={party || ''}
            style={{
              width: '100%'
            }}
            onChange={(event) => {
              setParty(event.target.value)
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
