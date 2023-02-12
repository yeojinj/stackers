import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './MyPage.css'
import DefaultImg from '../../assets/default_profile.png'
import StationListItem from '../../components/station/StationListItem'
import Button from '@mui/material/Button'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ProfileEdit from '../profile_edit/ProfileEdit'

function MyPage() {
  const token = localStorage.getItem('accessToken')
  const [isfollowing, setIsfollow] = useState(true)

  const [publicStation, setPublicStation] = useState([])
  const [privateStation, setPrivateStation] = useState([])
  const [currentTab, clickTab] = useState(0)
  const params = useParams()
  const profileUsername = params.username // 프로필페이지 유저
  const [mypageInfo, setMypageInfo] = useState([])
  const loginUser = useSelector((state) => {
    // 현재 로그인한 유저
    return state.user
  })
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 마이페이지 정보 조회
  async function getUserInfo() {
    await axios
      .get(`/api/member/${profileUsername}`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setMypageInfo(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 마이페이지 공개 스테이션 조회
  async function publicStationList() {
    await axios
      .get('/api/station/public', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setPublicStation(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 마이페이지 비공개 스테이션 조회
  async function privateStationList() {
    await axios
      .get('/api/station/private', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setPrivateStation(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUserInfo()
    publicStationList()
    privateStationList()
  }, [])

  // 더미데이터
  const dummy = [
    {
      id: 5,
      content: 'xptms',
      tags: ['happy', 'mood'],
      video: {
        id: 5,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '테스트용 비디',
        thumbnailPath: null
      }
    },
    {
      id: 6,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 6,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 7,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 7,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 8,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 8,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath:
          'https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/b0d97d87-f059-4b96-95a7-72cad63afd5f_E_C.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath: 'https://webrtc.github.io/samples/src/video/chrome.webm',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null
      }
    }
  ]
  // 공개 스테이션
  const viewStation = () => {
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {/* {publicStation.map((result, i) => { */}
            {dummy.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem
                    isRanking={false}
                    isSearch={false}
                    station={result}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  // 비공개 스테이션
  const noViewStation = () => {
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {/* {privateStation.map((result, i) => { */}
            {dummy.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem
                    isRanking={false}
                    isSearch={false}
                    station={result}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

  // 공개/비공개 탭 메뉴
  const menuArr = [
    { i: 1, name: '공개', content: viewStation() },
    { i: 2, name: '비공개🔒', content: noViewStation() }
  ]

  // 팔로우 버튼, 프로필 편집 버튼
  let followbutton = null
  if (loginUser.username === profileUsername) {
    followbutton = (
      <Button
        variant="contained"
        size="small"
        style={{
          backgroundColor: 'rgba(217, 217, 217, 1)',
          color: 'rgba(73, 73, 73, 1)',
          fontWeight: 'bold'
        }}
        onClick={handleOpen}
      >
        프로필 편집
      </Button>
    )
  } else {
    if (!isfollowing) {
      followbutton = (
        <Button variant="outlined" size="small" color="secondary">
          팔로우
        </Button>
      )
    } else if (isfollowing) {
      followbutton = (
        <Button variant="contained" size="small" color="secondary">
          팔로잉
        </Button>
      )
    }
  }

  const selectMenuHandler = (index) => {
    clickTab(index)
  }
  return (
    <>
      <div className="MyPage">
        <Modal open={open} onClose={handleClose}>
          <Box>
            <ProfileEdit handleClose={handleClose} />
          </Box>
        </Modal>
        <div className="div-profile">
          {/* css 손보기 */}
          <div style={{ display: 'flex', width: 'auto' }}>
            <div style={{ marginRight: '53px' }}>
              <img
                src={
                  mypageInfo.imgPath === 'path'
                    ? DefaultImg
                    : mypageInfo.imgPath
                }
                alt="profile"
                style={{ width: '220px', margin: '0px' }}
              />
            </div>
            <div style={{ marginLeft: '100px' }}>
              <div className="div-profile-notPicture">
                <div>
                  <b>{mypageInfo.nickname}</b>
                  <p>{mypageInfo.username}</p>
                  <div className="div-profile-Count">
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">영상</p>
                      <b>{publicStation.length + privateStation.length}</b>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">팔로워</p>
                      <b>{mypageInfo.followerCnt}</b>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">팔로잉</p>
                      <b>{mypageInfo.followingCnt}</b>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex'
                      // justifyContent: 'space-between'
                    }}
                  >
                    {mypageInfo.party && (
                      <p
                        style={{
                          backgroundColor: 'rgba(227, 95, 173, 1)',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '5px'
                        }}
                      >
                        {mypageInfo.party}
                      </p>
                    )}
                    {mypageInfo.party && mypageInfo.instruments && <p> | </p>}
                    {mypageInfo.instruments &&
                      mypageInfo.instruments.map((inst, i) => {
                        return (
                          <p
                            key={i}
                            style={{
                              backgroundColor: 'rgba(245, 245, 245, 1)',
                              color: 'rgba(80, 80, 80, 1)',
                              padding: '5px',
                              borderRadius: '10px'
                            }}
                          >
                            {inst}
                          </p>
                        )
                      })}
                  </div>
                </div>
                <div style={{ display: 'flex', marginLeft: '100px' }}>
                  <p
                    onClick={(event) => {
                      event.preventDefault()
                      setIsfollow(!isfollowing)
                    }}
                  >
                    {followbutton}
                  </p>
                  <p>
                    <Button variant="outlined" size="small" color="secondary">
                      <MailOutlineIcon></MailOutlineIcon>
                    </Button>
                  </p>
                </div>
              </div>
              <div>
                <p style={{ whiteSpace: 'pre-wrap' }}>{mypageInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mypage-result">
            <div className="station-tap">
              <div className="tapmenu-ul">
                {menuArr.map((el, index) => (
                  <li
                    key={el.i}
                    className={
                      index === currentTab ? 'mystation focused' : 'mystation'
                    }
                    onClick={() => {
                      if (profileUsername === loginUser.username) {
                        selectMenuHandler(index)
                      }
                    }}
                  >
                    {el.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="tab-content">{menuArr[currentTab].content}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPage
