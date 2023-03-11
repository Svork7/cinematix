import { useState, useEffect } from 'react'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { User } from '../redux/userSlice'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCurrentUser = (): User | null => {
  const users = useAppSelector((state) => state.user)
  const currentUser = Object.entries(users || {}).find(
    ([, user]) => user.isAuth
  )?.[1]

  return currentUser || null
}
