import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { historyAPI } from '../API/historyAPI'

export const postHistory = createAsyncThunk(
  'user/postHistory',
  async (args: { url: string; userEmail: string }, thunkAPI: any) => {
    const { url, userEmail } = args
    const currentUser = thunkAPI.getState().user[userEmail]

    if (currentUser) {
      return await historyAPI.post(currentUser, url)
    } else {
      return
    }
  }
)

export const getHistory = createAsyncThunk(
  'user/getHistory',
  async (userEmail: string, thunkAPI: any) => {
    const currentUser: User = thunkAPI.getState().user[userEmail]
    return await historyAPI.get(currentUser)
  }
)

export const deleteHistory = createAsyncThunk(
  'user/deleteHistory',
  async (userEmail: string, thunkAPI: any) => {
    const currentUser: User = thunkAPI.getState().user[userEmail]
    return await historyAPI.delete(currentUser)
  }
)

export interface User {
  [prop: string]: any
  username?: string
  email?: string
  password?: string
  isAuth?: boolean
  favorites?: { name: string; url: string }[]
  historySearch?: string[]
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as Record<string, User>,
  reducers: {
    signIn(state, action) {
      const currentUser = action.payload
      state[currentUser].isAuth = true
    },

    logOut(state, action) {
      const currentUser = action.payload
      state[currentUser].isAuth = false
    },

    addUser(state, action) {
      const newUser = action.payload.email
      state[newUser] = action.payload
      state[newUser].isAuth = false
      state[newUser].favorites = []
      state[newUser].historySearch = []
    },

    addFavorite(state, action) {
      const { name, url, userEmail } = action.payload
      const newFavorite = { name, url }

      const userState = current(state[userEmail])
      let flagDeletedOrAdd = ''

      if (userState?.favorites?.length === 0) {
        flagDeletedOrAdd = 'add'
      } else {
        userState.favorites?.forEach((el) => {
          if (el.name === name) {
            flagDeletedOrAdd = 'delete'
          } else {
            flagDeletedOrAdd = 'add'
          }
        })
      }

      if (flagDeletedOrAdd === 'add') {
        let newFavorites = userState.favorites
        const newFavoritesCopy = [...(newFavorites as []), newFavorite]
        state[userEmail].favorites = newFavoritesCopy
      } else if (flagDeletedOrAdd === 'delete') {
        const newFavorites = userState.favorites?.filter(
          (el) => el.name !== name
        )
        state[userEmail].favorites = newFavorites
      }
    },

    deleteFavorite(state, action) {
      const { name, userEmail } = action.payload
      const userState = current(state[userEmail])
      const newFavorites = userState.favorites?.filter((el) => el.name !== name)
      state[userEmail].favorites = newFavorites
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postHistory.fulfilled, (state, action) => {
      const userEmail = action.payload?.currentUser.email
      if (userEmail) {
        state[userEmail].historySearch = action.payload?.historySearchCopy
      }
    })

    builder.addCase(getHistory.fulfilled, (state, action) => {
      const userEmail = action.payload.currentUser.email
      if (userEmail) {
        state.user[userEmail].historySearch = action.payload.links
      }
    })

    builder.addCase(deleteHistory.fulfilled, (state, action) => {
      const userEmail = action.payload.currentUser.email
      if (userEmail) {
        state[userEmail].historySearch = []
      }
    })
  },
})

export const { signIn, logOut, addUser, addFavorite, deleteFavorite } =
  userSlice.actions

export default userSlice.reducer
