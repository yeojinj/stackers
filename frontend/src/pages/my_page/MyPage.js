import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './MyPage.css'
import DefaultImg from '../../assets/default_profile.png'
import StationListItem from '../../components/station/StationListItem'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import MarkunreadIcon from '@mui/icons-material/Markunread'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ProfileEdit from '../profile_edit/ProfileEdit'

function MyPage() {
  const token = localStorage.getItem('accessToken')
  // 팔로잉/팔로우
  const [isfollowing, setIsFollowwing] = useState(false)
  const [followingCnt, setFollowingCnt] = useState(0)
  const [followerCnt, setFollwerCnt] = useState(0)
  // 공개/비공개 스테이션
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
  // 프로필 편집 모달 열기, 닫기
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // 마이페이지 정보 조회
  async function getUserInfo() {
    if (profileUsername === loginUser.username) {
      await axios
        .get(`/api/member/${loginUser.username}`, {
          headers: {
            Authorization: token
          }
        })
        .then((res) => {
          setMypageInfo(res.data)
          setFollowingCnt(res.data.followingCnt)
          setFollwerCnt(res.data.followerCnt)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await axios
        .get(`/api/member/${profileUsername}`, {
          headers: {
            Authorization: token
          }
        })
        .then((res) => {
          setMypageInfo(res.data)
          setFollowingCnt(res.data.followingCnt)
          setFollwerCnt(res.data.followerCnt)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // 마이페이지 공개 스테이션 조회
  async function publicStationList() {
    // 내가 나의 마이페이지 볼때
    if (profileUsername === loginUser.username) {
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
    } else {
      // 다른사람의 마이페이지를 볼때
      await axios
        .get(`/api/station/${profileUsername}/public`, {
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
  }

  // 마이페이지 비공개 스테이션 조회
  async function privateStationList() {
    await axios({
      method: 'get',
      url: '/api/station/private',
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

  // 현재 사용자가 현재 마이페이지 계정 주인을 팔로우하고 있는지 조회
  async function isFollowing() {
    await axios({
      method: 'get',
      url: `/api/follow/isfollowing/${profileUsername}`,
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log('[현재 마이페이지 주인의 팔로우 여부]', res.data)
        setIsFollowwing(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 팔로잉 요청
  async function wantfollowing() {
    await axios({
      method: 'post',
      url: '/api/follow',
      data: {
        username: profileUsername
      },
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log('[팔로잉이 되었습니다!]', res.data)
        setIsFollowwing(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 팔로잉 취소
  async function unfollowing() {
    await axios({
      method: 'delete',
      url: '/api/follow',
      data: {
        username: profileUsername
      },
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log('[팔로잉이 취소되었습니다!]', res.data)
        setIsFollowwing(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (profileUsername !== loginUser.username) {
      console.log('다른사람의 페이지를 보고잇어요')
      getUserInfo()
      publicStationList()
      privateStationList()
      isFollowing()
      clickTab(0)
    } else {
      getUserInfo()
      publicStationList()
      privateStationList()
    }
  }, [profileUsername])

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
                    // saveList={publicStation}
                    saveList={dummy}
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
                    // saveList={privateStation}
                    saveList={dummy}
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
    { i: 2, name: '비공개', content: noViewStation() }
  ]

  // 팔로우 버튼, 프로필 편집 버튼
  let followbutton = null
  if (loginUser.username === profileUsername) {
    followbutton = (
      <button
        className="button-profile"
        style={{
          backgroundColor: 'rgba(217, 217, 217, 1)',
          color: 'rgba(73, 73, 73, 1)',
          fontWeight: 'bold'
        }}
        onClick={handleOpen}
      >
        프로필 편집
      </button>
    )
  } else {
    if (!isfollowing) {
      followbutton = (
        <button
          className="button-profile"
          onClick={(event) => {
            setIsFollowwing(true)
            setFollwerCnt((followerCnt) => followerCnt + 1)
            wantfollowing()
          }}
        >
          팔로우
        </button>
      )
    } else if (isfollowing) {
      followbutton = (
        <button
          className="button-profile"
          onClick={(event) => {
            setIsFollowwing(false)
            setFollwerCnt((followerCnt) => followerCnt - 1)
            unfollowing()
          }}
        >
          팔로우 취소
        </button>
      )
    }
  }

  const selectMenuHandler = (index) => {
    clickTab(index)
  }
  return (
    <div className="my-page-container">
      <Modal open={open} onClose={handleClose}>
        <Box>
          <ProfileEdit handleClose={handleClose} />
        </Box>
      </Modal>
      <div className="div-profile">
        {/* css 손보기 */}
        <div style={{ display: 'flex', width: 'auto' }}>
          <div className="div-img-container">
            <img
              src={
                mypageInfo.imgPath === 'path' ? DefaultImg : mypageInfo.imgPath
              }
              alt="profile"
              className="mypage-profile-img"
            />
          </div>
          <div className="div-text-container">
            <div className="div-profile-notPicture">
              <div className="div-items__1">
                <p className="p-nickname-bold">{mypageInfo.username}</p>
                <div className="div-buttons">
                  <p>{followbutton}</p>
                  <p>
                    <button className="button-profile">
                      <a href={'mailto:' + mypageInfo.email}>
                        <MarkunreadIcon
                          style={{
                            color: 'whitesmoke'
                          }}
                        />
                      </a>
                    </button>
                  </p>
                </div>
              </div>

              <div>
                <div className="div-profile-Count">
                  <div style={{ display: 'flex', marginRight: '8%' }}>
                    <p className="profile-Count-content">스테이션</p>
                    <b>{publicStation.length + privateStation.length}</b>
                  </div>
                  <div style={{ display: 'flex', marginRight: '8%' }}>
                    <p className="profile-Count-content">팔로워</p>
                    <b>{followerCnt}</b>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <p className="profile-Count-content">팔로잉</p>
                    <b>{followingCnt}</b>
                  </div>
                </div>
                <div className="extra-info-container">
                  {mypageInfo.party && (
                    <p
                      className="extra-info-party"
                      style={{ marginRight: '0' }}
                    >
                      {mypageInfo.party}
                    </p>
                  )}
                  <DragIndicatorIcon />
                  {mypageInfo.instruments &&
                    mypageInfo.instruments.map((inst, i) => {
                      return (
                        <p
                          key={i}
                          className="extra-info-party"
                          style={{ color: 'black', background: '#c4c4c4e0' }}
                        >
                          {inst}
                        </p>
                      )
                    })}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.95em' }}>
              <span style={{ fontWeight: '600', fontSize: '1.1em' }}>
                {mypageInfo.nickname}
              </span>
              <p style={{ whiteSpace: 'pre-wrap', marginTop: '1px' }}>
                {mypageInfo.bio}
              </p>
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
                    } else {
                      alert('비공개는 본인만 확인할 수 있습니다')
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
  )
}

export default MyPage
