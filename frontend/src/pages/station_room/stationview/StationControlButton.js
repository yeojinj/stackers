import React, { useState } from 'react'
import '../Station.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import stacking from '../assets/stacking.png'
import LogIn from '../../sign_folder/LogIn/LogIn'

function StationControlButton() {
  const [modalOpen, setModalOpen] = useState(false)

  const showModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }
  return (
    <div>
      {modalOpen && <LogIn setModalOpen={setModalOpen} />}
      <img
        src={stacking}
        alt="stacking"
        style={{ width: '30px' }}
        onClick={showModal}
      />
      <VolumeUpIcon sx={{ fontSize: 30 }} />
      <FavoriteSharpIcon
        sx={{ fontSize: 30 }}
        style={{ color: 'rgba(227, 95, 173, 1)' }}
      />
      <IosShareRoundedIcon sx={{ fontSize: 30 }} />
    </div>
  )
}
export default StationControlButton
