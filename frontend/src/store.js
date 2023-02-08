import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLogged: false,
    username: '',
    nickname: '',
    email: '',
    bio: '',
    imgPath: ''
  },
  reducers: {
    logIn: (state, action) => {
      // console.log(action)
      state.isLogged = true
    },
    LogInState: (state, action) => {
      // console.log(action.payload)
      state.username = action.payload.username
      state.nickname = action.payload.nickname
      state.email = action.payload.email
      state.imgPath = action.payload.imgPath
      // state.bio = state.payload.bio
    },
    LogOutState: (state, action) => {
      state.isLogged = false
      state.username = ''
      state.nickname = ''
      state.email = ''
      state.imgPath = ''
      state.bio = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store
export const { logIn, LogInState, LogOutState } = userSlice.actions
