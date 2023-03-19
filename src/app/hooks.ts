import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { User } from '../redux/userSlice'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCurrentUser = (): User | { [key: string]: never } => {
  const users = useAppSelector((state) => state.user)
  let currentUser

  if (users) {
    currentUser = Object.values(users).find((obj) => obj.isAuth === true)
  }

  if (currentUser) {
    return currentUser
  }

  return {}
}
