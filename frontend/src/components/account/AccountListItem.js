import React from 'react'
import profileTest from '../../assets/profileTest.svg'
import '../../styles/accountlistitem.css'

function AccountListItem() {
  const accountInfo = {
    profile_img: profileTest,
    username: 'apricot',
    nickname: '리콧',
    band: '텐텐'
  }

  const IsBand = () => {
    if (accountInfo.band) {
      return ` · ${accountInfo.band}`
    }
  }
  return (
    <>
      <div className="account-info">
        <img
          className="account-profile-img"
          src={accountInfo.profile_img}
        ></img>
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
