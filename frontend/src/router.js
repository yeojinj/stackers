import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainRoom from './pages/main_room/MainRoom'
import RecordRoom from './pages/record_room/RecordRoom'
import StationRoom from './pages/station_room/stationview/StationRoom'
import LogIn from './pages/sign_folder/LogIn/LogIn'
import SignUp from './pages/sign_folder/SignUp/SignUp'
import SearchView from './pages/searchview/SearchView'
import MyPage from './pages/my_page/MyPage'
import AccountList from './components/account/AccountList'
import ProfileEdit from './pages/profile_edit/ProfileEdit'
import UploadLoading from './pages/record_room/UploadLoading'
import HeaderAndFooter from './components/HeaderAndFooter'
import NotFound from './components/NotFound'
import Forbidden from './components/Forbidden'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderAndFooter />,
    children: [
      {
        path: '',
        element: <MainRoom />
      },
      {
        path: 'SearchView',
        element: <SearchView />
      },
      {
        path: 'MyPage/:username',
        element: <MyPage />
      },
      {
        path: '/Follow/:username',
        element: <AccountList />
      }
    ]
  },
  {
    path: '/RecordRoom/:preId',
    element: <RecordRoom />
  },
  {
    path: '/StationRoom/:id',
    element: <StationRoom />
  },
  {
    path: '/LogIn',
    element: <LogIn />
  },
  {
    path: '/SearchView/:keyword',
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
  },
  {
    path: '/Forbidden',
    element: <Forbidden />
  },
  // {
  //   path: '/NotFound',
  //   element: <NotFound />
  // },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
