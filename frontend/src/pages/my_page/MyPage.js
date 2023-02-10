import { React, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
// import axios from 'axios'
import './MyPage.css'
import StationListItem from '../../components/station/StationListItem'
import profile from '../../assets/profileTest.svg'
import Button from '@mui/material/Button'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
// import Box from '@mui/material/Box'
// import Modal from '@mui/material/Modal'
// import ProfileEdit from '../profile_edit/ProfileEdit'

function MyPage() {
  const navigate = useNavigate()
  const [isfollowing, setIsfollow] = useState(true)
  // axios 연결시 주석 해제
  // const [resultsListVideo, setStation] = useState([])
  const [currentTab, clickTab] = useState(0)
  const params = useParams()
  const profileUsername = params.username // 프로필페이지 유저
  const loginUser = useSelector((state) => {
    // 현재 로그인한 유저
    return state.user
  })
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  // async function stationList() {
  //   await axios
  //     .get('/api/station/popular')
  //     .then((res) => {
  //       console.log('[사용자 스테이션 조회] ', res.data)
  //       // 서버 통신 되면 아래 주석 풀고 그 아래 리스트 지우기
  //       // setStation(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  // useEffect(() => {
  //   stationList()
  // }, [])

  // useEffect(() => {
  //   console.log('[useEffect 실행]]', resultsListVideo)
  // }, [resultsListVideo])
  // 일단 더미 데이터로 해보고 있음
  // axios 데이터 형식 보고 수정하기

  // 후에 useMemo 로 저장하기
  const resultsListVideo = [
    {
      id: 5,
      content: 'xptms',
      tags: ['happy', 'mood'],
      video: {
        id: 5,
        videoPath:
          'https://stackers.bucket.s3.ap-northeast-2.amazonaws.com/static/videos/2fefd436-35c9-4f55-a2e3-cfe6328e3d13a.mp4',
        videoName: null,
        videoOriName: '테스트용 비디',
        thumbnailPath: null,
        isPrivate: false // 공개/비공개 여부, 후에 데이터 형식 보고 변경
      }
    },
    {
      id: 6,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 6,
        videoPath:
          'https://stackers.bucket.s3.ap-northeast-2.amazonaws.com/static/videos/7bdc5892-05c4-4547-b3e0-41d87397579dbJVSGr8VTiyz7a31JmZDLYCHMJtY0ySLZyY2ImqYWIojM9nUVTJGQNu8GKy8Zrdt.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null,
        isPrivate: false
      }
    },
    {
      id: 7,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 7,
        videoPath:
          'https://stackers.bucket.s3.ap-northeast-2.amazonaws.com/static/videos/215eaa7d-8d58-4de2-a495-2931db5bbb37bJVSGr8VTiyz7a31JmZDLYCHMJtY0ySLZyY2ImqYWIojM9nUVTJGQNu8GKy8Zrdt.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null,
        isPrivate: true
      }
    },
    {
      id: 8,
      content: '향기로운 음악의 세계~',
      tags: ['smell_so_good', 'umm'],
      video: {
        id: 8,
        videoPath:
          'https://stackers.bucket.s3.ap-northeast-2.amazonaws.com/static/videos/215eaa7d-8d58-4de2-a495-2931db5bbb37bJVSGr8VTiyz7a31JmZDLYCHMJtY0ySLZyY2ImqYWIojM9nUVTJGQNu8GKy8Zrdt.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null,
        isPrivate: true
      }
    },
    {
      id: 9,
      content: '향기로운 음악의 세계~ 같이 들어요',
      tags: ['smell_so_good', 'umm', 'yahoo'],
      video: {
        id: 9,
        videoPath:
          'https://stackers.bucket.s3.ap-northeast-2.amazonaws.com/static/videos/215eaa7d-8d58-4de2-a495-2931db5bbb37bJVSGr8VTiyz7a31JmZDLYCHMJtY0ySLZyY2ImqYWIojM9nUVTJGQNu8GKy8Zrdt.mp4',
        videoName: null,
        videoOriName: '2023_02_07_11:08',
        thumbnailPath: null,
        isPrivate: true
      }
    }
  ]
  // 공개 스테이션
  const viewStation = () => {
    const canView = resultsListVideo.filter((station) => {
      return !station.video.isPrivate
    })
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {canView.map((result, i) => {
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
  const privateStation = () => {
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {resultsListVideo.map((result, i) => {
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
    { i: 2, name: '비공개', content: privateStation() }
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
        onClick={() => {
          navigate('/ProfileEdit')
        }}
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
  const introduce = `안녕하세요~ 기타로 일상의 행복을 배달하는 기타리스트 @dearsanta입니다.
  문의는 dearsanta@gmail.com으로 부탁드려요~`

  const selectMenuHandler = (index) => {
    clickTab(index)
  }
  return (
    <>
      <div className="MyPage">
        <div className="div-profile">
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '53px' }}>
              <img
                src={profile}
                alt="profile"
                style={{ width: '220px', margin: '0px' }}
              />
            </div>
            <div style={{ marginLeft: '100px' }}>
              <div className="div-profile-notPicture">
                <div>
                  <b>dearSanta</b>
                  <p>김산타</p>
                  <div className="div-profile-Count">
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">영상</p>
                      <b>8</b>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">팔로워</p>
                      <b>13K</b>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p className="profile-Count-content">팔로잉</p>
                      <b>342</b>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: 'rgba(227, 95, 173, 1)',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '5px'
                      }}
                    >
                      소속 밴드
                    </p>
                    <p> |</p>
                    <p
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 1)',
                        color: 'rgba(80, 80, 80, 1)',
                        padding: '5px',
                        borderRadius: '10px'
                      }}
                    >
                      악기 1
                    </p>
                    <p
                      style={{
                        backgroundColor: 'rgba(245, 245, 245, 1)',
                        color: 'rgba(80, 80, 80, 1)',
                        padding: '5px',
                        borderRadius: '10px'
                      }}
                    >
                      악기 2
                    </p>
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
                <p style={{ whiteSpace: 'pre-wrap' }}>{introduce}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="result">
            <div className="station-tap">
              <div className="tapmenu-ul">
                {menuArr.map((el, index) => (
                  <li
                    key={el.i}
                    className={
                      index === currentTab ? 'mystation focused' : 'mystation'
                    }
                    onClick={() => selectMenuHandler(index)}
                  >
                    {el.name}
                  </li>
                ))}
              </div>
            </div>
            <div className="tab-content">{menuArr[currentTab].content}</div>
          </div>
        </div>
        {/* <Modal open={open} onClose={handleClose}>
          <Box>
            <ProfileEdit handleClose={handleClose} className="LogIn" />
          </Box>
        </Modal> */}
      </div>
    </>
  )
}

export default MyPage
