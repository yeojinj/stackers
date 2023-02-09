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

  const total = useSelector((state) => {
    return state.user
  })
  // console.log(localStorage.getItem('refreshToken'))
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
          // console.log(response.data)
          dispatch(LogInState(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLogged])

  useEffect(() => {
    // console.log(localStorage.getItem('accessToken'))
    const Token = localStorage.getItem('accessToken')
    // console.log(Token)
    if (Token) {
      axios({
        method: 'GET',
        url: '/api/member/user',
        headers: {
          Authorization: Token
        }
      })
        .then((response) => {
          // console.log(response.data)
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
