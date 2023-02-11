import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
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
        {accountInfo.imgPath !== 'static/s3이미지링크.png' && (
          <img className="account-profile-img" src={accountInfo.imgPath}></img>
        )}
        {accountInfo.imgPath === 'static/s3이미지링크.png' && (
          <>
            <AccountCircleIcon style={{ width: '85px', height: '85px' }} />
          </>
        )}
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
