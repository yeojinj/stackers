import React from 'react'
import MainRoom from './pages/main_room/MainRoom'
import RecordRoom from './pages/record_room/RecordRoom'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <Link to="/RecordRoom">Record Room</Link>
          </li>
          <li>
            <Link to="/testRoom">testRoom</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/RecordRoom" element={<RecordRoom />} />
          <Route path="/testRoom" element={<testRoom />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
