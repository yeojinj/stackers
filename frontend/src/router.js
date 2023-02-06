import React from 'react'
import { createBrowserRouter, Link, Outlet } from 'react-router-dom'
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
    element: (
      <div>
        <ul>
          <li>
            <Link to="/MainRoom">Main</Link>
          </li>
          <li>
            <Link to="/RecordRoom">Record Room</Link>
          </li>
          <li>
            <Link to="/StationRoom">Station Room</Link>
          </li>
          <li>
            <Link to="/LogIn">LogIn</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/MyPage">Mypage</Link>
          </li>
          <li>
            <Link to="/ProfileEdit">ProfileEdit</Link>
          </li>
          <li>
            <Link to="/UploadLoading">UploadLoading</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/MainRoom',
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
    ]
  }
])

export default router
