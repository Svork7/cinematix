import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSliceReducer from '../redux/userSlice'
import { checkLoginMiddleware } from '../middleware/checkLoginMiddleware'
import { omdbAPI } from '../API/omdbAPI'

const rootReducer = combineReducers({
  user: userSliceReducer,
  [omdbAPI.reducerPath]: omdbAPI.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [omdbAPI.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([checkLoginMiddleware, omdbAPI.middleware]),
})
export default store
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
