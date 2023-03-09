import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { historyApi } from "../api/historyApi";

// Создаем thunk для добавления записей в историю
export const postHistory = createAsyncThunk(
  "user/postHistory",
  async (args: { url: string; userEmail: string }, thunkAPI: any) => {
    const { url, userEmail } = args;

    // Получаем текущего пользователя из хранилища
    const currentUser = thunkAPI.getState().user[userEmail];

    // Если текущий пользователь существует, добавляем запись в историю
    if (currentUser) {
      const historySearchCopy = current(currentUser.historySearch);
      historySearchCopy.push(url);
      return await historyApi.post(currentUser, historySearchCopy);
    } else {
      return;
    }
  }
);

// Создаем thunk для получения истории поиска
export const getHistory = createAsyncThunk(
  "user/getHistory",
  async (userEmail: string, thunkAPI: any) => {
    // Получаем текущего пользователя из хранилища
    const currentUser: User = thunkAPI.getState().user[userEmail];
    
    // Если текущий пользователь существует, получаем его историю поиска
    if (currentUser) {
      return await historyApi.get(currentUser);
    }
  }
);

// Создаем thunk для удаления истории поиска
export const deleteHistory = createAsyncThunk(
  "user/deleteHistory",
  async (userEmail: string, thunkAPI: any) => {
    // Получаем текущего пользователя из хранилища
    const currentUser: User = thunkAPI.getState().user[userEmail];
    
    // Если текущий пользователь существует, удаляем его историю поиска
    if (currentUser) {
      return await historyApi.delete(currentUser);
    }
  }
);

// Описываем интерфейс для пользователей
export interface User {
  [prop: string]: any;
  username?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
  favorites?: { name: string; url: string }[];
  historySearch?: string[];
}

// Создаем slice для работы с пользователем
const userSlice = createSlice({
  name: "user",
  initialState: {} as Record<string, User>,
  reducers: {
    // Обновляем состояние для авторизации пользователя
    signIn(state, action) {
      const currentUser = action.payload;
      state[currentUser.email].isAuth = true;
    },

    // Обновляем состояние для выхода пользователя
    logOut(state, action) {
      const currentUser = action.payload;
      state[currentUser.email].isAuth = false;
    },

    // Обновляем состояние для добавления нового пользователя
    addUser(state, action) {
      const newUser = action.payload.email;
      state[newUser] = action.payload;
      state[newUser].isAuth = false;
      state[newUser].favorites = [];
      state[newUser].historySearch = [];
    },

    // Обновляем состояние для переключения избранных записей
    toggleFavorite(state, action) {
      const { name, url, userEmail } = action.payload;
      const userState = current(state[userEmail]);
      let flagDeletedOrAdd = ""; },
    },

      extraReducers: (builder) => {
        // When postHistory is fulfilled, update the user's historySearch if the payload contains a currentUser email
        builder.addCase(postHistory.fulfilled, (state, action) => {
          const userEmail = action.payload?.currentUser?.email;
          if (userEmail) {
            state[userEmail].historySearch = action.payload?.historySearchCopy;
          }
        });
      
        // When getHistory is fulfilled, update the user's historySearch if the payload contains a currentUser email
        builder.addCase(getHistory.fulfilled, (state, action) => {
          const userEmail = action.payload?.currentUser?.email;
          if (userEmail) {
            state[userEmail].historySearch = action.payload?.links;
          }
        });
      
        // When deleteHistory is fulfilled, reset the user's historySearch to an empty array if the payload contains a currentUser email
        builder.addCase(deleteHistory.fulfilled, (state, action) => {
          const userEmail = action.payload?.currentUser?.email;
          if (userEmail) {
            state[userEmail].historySearch = [];
          }
        });
      },