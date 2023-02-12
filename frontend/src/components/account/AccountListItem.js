import React from 'react'
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
  return (
    <>
      <div className="account-info">
        <img
          src={accountInfo.imgPath ? accountInfo.imgPath : DefaultImg}
          alt=""
          className="account-profile-img"
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
