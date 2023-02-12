/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react'
import './ProfileEdit.css'
// import { useSelector, useDispatch } from 'react-redux'
// import InstTag from './InstTag'
import NoImg from '../../assets/noImg.svg'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import MyDropzone from './MyDropzone'
import axios from 'axios'
// import { TagList } from '../../store.js'
// import ImageCrop from './ImageCrop'

function ProfileEdit(props) {
  // const tags = useSelector((state) => {
  //   return state.TagList.tags
  // })
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  // const [instruments, setInstruments] = useState(tags)
  const [party, setParty] = useState('')

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [imageurl, setImageurl] = useState('')
  const [image, setImage] = useState('')
  // onChange로 관리할 문자열
  const [hashtag, setHashtag] = useState('')
  // 해시태그를 담을 배열
  const [hashArr, setHashArr] = useState([])
  const token = localStorage.getItem('accessToken')

  // 사용자 정보 조회
  // const dispatch = useDispatch()
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
        // dispatch(TagList(res.data.instruments))
        // setHashArr(res.data.instruments)
        setParty(res.data.party)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    userInfo()
  }, [])

  useEffect(() => {
    console.log('[악기 리스트에 잘 들어오는지 확인]', hashArr)
  }, [hashArr])

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

  const onChangeHashtag = (e) => {
    setHashtag(e.target.value)
  }

  const onKeyUp = useCallback(
    (e) => {
      if (hashtag && hashArr.length < 3) {
        /* 요소 불러오기, 만들기 */
        const $HashWrapOuter = document.querySelector('.HashWrapOuter')
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'

        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner)
          console.log($HashWrapInner.innerHTML)
          setHashArr(hashArr.filter((hashtag) => hashtag))
        })

        /* enter 키 코드 :13 */
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          console.log('Enter Key 입력됨!', e.target.value)
          $HashWrapInner.innerHTML = '#' + e.target.value
          $HashWrapOuter?.appendChild($HashWrapInner)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
        }
      }
    },
    [hashtag, hashArr]
  )

  // 415 오류 발생 -> 수정 필요!!!!
  const changeInfo = () => {
    const newInfo = {
      nickname,
      bio,
      instruments: hashArr,
      party
    }
    console.log('[새로 들어온 정보] : ', newInfo)

    /* axios 통신 코드~ */
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
    props.handleClose()

    // 이미지를 업데이트 했다면
    // if (image) {
    //   const formData = new FormData()
    //   formData.append(
    //     'info',
    //     new Blob([JSON.stringify(newInfo)], {
    //       type: 'application/json'
    //     })
    //   )
    //   formData.append('profile', image)
    //   axios
    //     .post('/api/member/user', formData, {
    //       data: newInfo,
    //       headers: {
    //         Authorization: token,
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     .then((res) => {
    //       console.log('[성공]', res.data)
    //     })
    //     .catch((err) => console.log(err))
    // } else {
    //   // 이미지를 업데이트 하지 않았다면
    //   axios
    //     .post('api/member/user', {
    //       data: newInfo,
    //       headers: {
    //         Authorization: token,
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     .then((res) => {
    //       console.log('[성공]', res.data)
    //     })
    //     .catch((err) => console.log(err))
    // }
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
        <div className="ProfileEdit-content-Inst">
          {/* <InstTag instruments={instruments} /> */}
          <div className="HashWrap">
            <div className="HashWrapOuter"></div>
            <input
              className={hashArr.length < 3 ? 'HashInput' : 'HashInput-none'}
              type="text"
              value={hashtag}
              onChange={onChangeHashtag}
              onKeyUp={onKeyUp}
              placeholder="악기 태그"
            />
          </div>
          <p style={{ fontSize: '12px', color: 'gray' }}>
            악기는 최대 3개까지 넣을 수 있어요!
          </p>
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
