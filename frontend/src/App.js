/* eslint-disable */
import React, { useEffect } from 'react'
import router from './router.js'
import { RouterProvider } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LogInState } from './store.js'
import axios from 'axios'

function App() {
  const isLogged = useSelector((state) => {
    return state.user.isLogged
  })

  const total = useSelector((state) => {
    return state.user
  })
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(isLogged)
    if (isLogged) {
      axios({
        method: 'GET',
        url: '/api/v1/user',
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

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
