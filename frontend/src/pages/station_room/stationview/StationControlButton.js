import React, { useState } from 'react'
import '../Station.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import stacking from '../assets/stacking.png'
import LogIn from '../../sign_folder/LogIn/LogIn'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'

function StationControlButton() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [isliked, setIsliked] = useState(false)

  let likeStation = null
  if (isliked) {
    likeStation = (
      <FavoriteIcon
        sx={{ fontSize: 30 }}
        style={{ color: 'rgba(227, 95, 173, 1)' }}
      />
    )
  } else {
    likeStation = (
      <FavoriteBorderIcon sx={{ fontSize: 30 }} style={{ color: 'white' }} />
    )
  }
  return (
    <div>
      <IconButton
        style={{
          padding: '0px'
        }}
        onClick={() => {
          handleOpen()
        }}
      >
        <img src={stacking} alt="stacking" style={{ width: '30px' }} />
      </IconButton>
      <VolumeUpIcon sx={{ fontSize: 30 }} />
      <IconButton
        style={{ padding: '0px' }}
        onClick={() => {
          setIsliked(!isliked)
        }}
      >
        {likeStation}
      </IconButton>

      <IosShareRoundedIcon sx={{ fontSize: 30 }} />
      <Modal open={open} onClose={handleClose}>
        <Box>
          <LogIn handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  )
}
export default StationControlButton
