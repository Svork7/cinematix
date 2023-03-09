import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit'
import { historyAPI } from '../API/historyAPI'

export interface User {
  username?: string
  email?: string
  password?: string
  isAuth?: boolean
  favorites: { name: string; url: string }[]
  historySearch: string[]
}

export const postHistory = createAsyncThunk<
  { currentUser: User; historySearchCopy: string[] },
  { url: string; userEmail: string },
  { rejectValue: string }
>('user/postHistory', async ({ url, userEmail }, thunkAPI: any) => {
  const currentUser = thunkAPI.getState().user[userEmail]

  if (!currentUser) {
    return thunkAPI.rejectWithValue('User not found.')
  }

  try {
    const response = await historyApi.post(currentUser, url)
    return { currentUser, historySearchCopy: response.historySearchCopy }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const getHistory = createAsyncThunk<
  { currentUser: User; links: string[] },
  string,
  { rejectValue: string }
>('user/getHistory', async (userEmail, thunkAPI: any) => {
  const currentUser = thunkAPI.getState().user[userEmail]

  if (!currentUser) {
    return thunkAPI.rejectWithValue('User not found.')
  }

  try {
    const response = await historyApi.get(currentUser)
    return { currentUser, links: response.links }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const deleteHistory = createAsyncThunk<
  { currentUser: User },
  string,
  { rejectValue: string }
>('user/deleteHistory', async (userEmail, thunkAPI: any) => {
  const currentUser = thunkAPI.getState().user[userEmail]

  if (!currentUser) {
    return thunkAPI.rejectWithValue('User not found.')
  }

  try {
    await historyApi.delete(currentUser)
    return { currentUser }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

interface UserState {
  [email: string]: User
}

const initialState: UserState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<string>) {
      const userEmail = action.payload
      if (state[userEmail]) {
        state[userEmail].isAuth = true
      }
    },
    logOut(state, action: PayloadAction<string>) {
      const userEmail = action.payload
      if (state[userEmail]) {
        state[userEmail].isAuth = false
      }
    },
    addUser(state, action: PayloadAction<User>) {
      const newUser: any = action.payload
      state[newUser.email] = {
        ...newUser,
        isAuth: false,
        favorites: [],
        historySearch: [],
      }
    },
    addFavorite(
      state,
      action: PayloadAction<{ name: string; url: string; userEmail: string }>
    ) {
      const { name, url, userEmail } = action.payload
      const user = state[userEmail]
      if (!user) {
        return
      }

      const favoriteIndex = user.favorites.findIndex(
        (favorite) => favorite.name === name
      )

      if (favoriteIndex === -1) {
        user.favorites.push({ name, url })
      } else {
        user.favorites.splice(favoriteIndex, 1)
      }
    },
    deleteFavorite(
      state,
      action: PayloadAction<{ name: string; userEmail: string }>
    ) {
      const { name, userEmail } = action.payload
      const user = state[userEmail]
      if (!user) {
        return
      }

      user.favorites = user.favorites.filter(
        (favorite) => favorite.name !== name
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postHistory.fulfilled, (state, action) => {
      const { currentUser, historySearchCopy } = action.payload || {}
      if (currentUser && state[currentUser.email]) {
        state[currentUser.email].historySearch = historySearchCopy || []
      }
    })
    builder.addCase(getHistory.fulfilled, (state, action) => {
      const { currentUser, links } = action.payload || {}
      if (currentUser && state[currentUser.email]) {
        state[currentUser.email].historySearch = links || []
      }
    })
    builder.addCase(deleteHistory.fulfilled, (state, action) => {
      const { currentUser } = action.payload || {}
      if (currentUser && state[currentUser.email]) {
        state[currentUser.email].historySearch = []
      }
    })
  },
})

export const { signIn, logOut, addUser, addFavorite, deleteFavorite } =
  userSlice.actions

export default userSlice.reducer
