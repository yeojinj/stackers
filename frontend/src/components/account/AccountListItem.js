import React from 'react'
import { useNavigate } from 'react-router'
import DefaultImg from '../../assets/default_profile.png'
import '../../styles/accountlistitem.css'

function AccountListItem({ account }) {
  const accountInfo = account

  const IsBand = () => {
    console.log('소속', accountInfo.teamName)
    if (accountInfo.teamName) {
      return ` · ${accountInfo.teamName}`
    }
  }

  const navigate = useNavigate()
  const gotoMypage = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    navigate(`/MyPage/${accountInfo.username}`)
  }

  return (
    <>
      <div className="account-info">
        <img
          src={
            accountInfo.imgPath !== 'path' ? accountInfo.imgPath : DefaultImg
          }
          alt=""
          className="account-profile-img"
          onClick={gotoMypage}
        />
        <div className="account-names">
          <div className="account-username">{accountInfo.username}</div>
          <div className="account-nickname">
            <span>{accountInfo.nickname}</span>
            <span className="account-band">
              <IsBand />
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountListItem
