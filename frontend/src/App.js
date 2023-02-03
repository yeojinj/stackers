import React from 'react'
import MainRoom from './pages/main_room/MainRoom'
import RecordRoom from './pages/record_room/RecordRoom'
import StationRoom from './pages/station_room/stationview/StationRoom'
import LogIn from './pages/sign_folder/LogIn/LogIn'
import SignUp from './pages/sign_folder/SignUp/SignUp'
import SearchView from './pages/searchview/SearchView'
import MyPage from './pages/my_page/MyPage'
import ProfileEdit from './pages/profile_edit/ProfileEdit'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
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
      </ul>
      <Routes>
        <Route path="/MainRoom" element={<MainRoom />} />
        <Route path="/RecordRoom" element={<RecordRoom />} />
        <Route path="/StationRoom" element={<StationRoom />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SearchView" element={<SearchView />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/ProfileEdit" element={<ProfileEdit />} />
      </Routes>
    </div>
  )
}

export default App
