import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainRoom from './pages/main_room/MainRoom'
import RecordRoom from './pages/record_room/RecordRoom'
import StationRoom from './pages/station_room/stationview/StationRoom'
import LogIn from './pages/sign_folder/LogIn/LogIn'
import SignUp from './pages/sign_folder/SignUp/SignUp'
import SearchView from './pages/searchview/SearchView'
import MyPage from './pages/my_page/MyPage'
import ProfileEdit from './pages/profile_edit/ProfileEdit'
import UploadLoading from './pages/record_room/UploadLoading'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainRoom />
  },
  {
    path: '/RecordRoom',
    element: <RecordRoom />
  },
  {
    path: '/StationRoom',
    element: <StationRoom />
  },
  {
    path: '/LogIn',
    element: <LogIn />
  },
  {
    path: '/SearchView',
    element: <SearchView />
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/MyPage',
    element: <MyPage />
  },
  {
    path: '/ProfileEdit',
    element: <ProfileEdit />
  },
  {
    path: '/UploadLoading',
    element: <UploadLoading />
  }
])

export default router
