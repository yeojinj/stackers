import { React, useState } from 'react'
import './MyPage.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import StationListItem from '../../components/station/StationListItem'
import profile from '../../assets/profileTest.svg'
import Button from '@mui/material/Button'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

function MyPage() {
  const [isfollowing, setIsfollow] = useState(true)
  const [currentTab, clickTab] = useState(0)

  const resultsListVideo = [
    { id: 1, isPrivate: true },
    { id: 2, isPrivate: true },
    { id: 3, isPrivate: false },
    { id: 4, isPrivate: true },
    { id: 5, isPrivate: false },
    { id: 6, isPrivate: true },
    { id: 7, isPrivate: true }
  ]
  const viewStation = () => {
    const canView = resultsListVideo.filter((station) => {
      return !station.isPrivate
    })
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {canView.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }

  const privateStation = () => {
    return (
      <>
        <div className="mystation-tap">
          <div className="popular-video">
            {resultsListVideo.map((result, i) => {
              return (
                <div key={i}>
                  <StationListItem />
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  const menuArr = [
    { i: 1, name: '공개', content: viewStation() },
    { i: 2, name: '비공개', content: privateStation() }
  ]

  let followbutton = null
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
  const introduce = `안녕하세요~ 기타로 일상의 행복을 배달하는 기타리스트 @dearsanta입니다.
  문의는 dearsanta@gmail.com으로 부탁드려요~`

  const selectMenuHandler = (index) => {
    clickTab(index)
  }
  return (
    <>
      <Header />
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
        <Footer />
      </div>
    </>
  )
}

export default MyPage
