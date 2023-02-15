/* eslint-disable */
import React, { useEffect } from 'react'
import router from './router.js'
import { RouterProvider } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, LogInState } from './store.js'
import axios from 'axios'

function App() {
  const isLogged = useSelector((state) => {
    return state.user.isLogged
  })

  const dispatch = useDispatch()
  useEffect(() => {
    if (isLogged) {
      axios({
        method: 'GET',
        url: '/api/member/user',
        headers: {
          Authorization: localStorage.accessToken
        }
      })
        .then((response) => {
          dispatch(LogInState(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLogged])

  useEffect(() => {
    const Token = localStorage.getItem('accessToken')
    if (isLogged || Token) {
      axios({
        method: 'GET',
        url: '/api/member/user',
        headers: {
          Authorization: Token
        }
      })
        .then((response) => {
          dispatch(logIn())
          dispatch(LogInState(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
