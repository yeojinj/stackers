import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLogged: false,
    username: '',
    nickname: '',
    email: '',
    bio: '',
    imgPath: '',
    reducers: {
      logIn: (state, action) => {
        console.log(action)
      }
    }
  }
})

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store
