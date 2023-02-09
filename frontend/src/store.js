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

const CreateCommentSlice = createSlice({
  name: 'CreateCommentSlice',
  initialState: { value: 0 },
  reducers: {
    CreateComment: (state, action) => {
      console.log(action)
    }
  }
})

const CreateStackSlice = createSlice({
  name: 'CreateStackSlice',
  initialState: {
    content: '',
    music: '',
    instrumentId: [],
    heartCnt: 0,
    remainDepth: 0,
    isPublic: 0,
    isComplete: 0,
    tags: [],
    prevStationId: 0,
    videoName: '',
    delete: true,
    file: {}
  },
  reducers: {
    createStack: (state, action) => {
      state.content = action.payload.content
      state.music = action.payload.music
      state.instrumentId = action.payload.instrumentId
      state.remainDepth = 3
      state.isPublic = action.payload.isPublic
      state.isComplete = action.payload.isComplete
      state.tags = action.payload.tags
      state.videoName = action.payload.videoName
      state.file = action.payload.file
    }
  }
})

const CreateInstSlice = createSlice({
  name: 'CreateInstSlice',
  initialState: {
    inst: []
  },
  reducers: {
    CreateInst: (state, action) => {
      console.log(action.payload)
      const asdf = action.payload
      const instt = state.inst
      state.inst = [...instt, ...asdf]
      console.log(state.inst)
      // console.log(action)
    }
  }
})

// 검색키워드 저장
const SearchSlice = createSlice({
  name: 'SearchSlice',
  initialState: {
    keyword: ''
  },
  reducers: {
    SearchKeyword: (state, action) => {
      console.log(action.payload)
      state.keyword = action.payload
      console.log(state.keyword)
    }
  }
})

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    CreateComments: CreateCommentSlice.reducer,
    CreateStack: CreateStackSlice.reducer,
    CreateInst: CreateInstSlice.reducer,
    SearchKeyword: SearchSlice.reducer
  }
})

export default store
export const { logIn, LogInState, LogOutState } = userSlice.actions
export const { CreateComment } = CreateCommentSlice.actions
export const { CreateStack } = CreateStackSlice.actions
export const { CreateInst } = CreateInstSlice.actions
export const { SearchKeyword } = SearchSlice.actions
