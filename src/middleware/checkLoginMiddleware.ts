import { Middleware } from 'redux'
import { RootState } from '../app/store'
import { User } from '../redux/userSlice'

type Action = { type: string; payload: { email: string } }

const checkLoginMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: Action) => {
    const state: RootState = store.getState()
    const existingUser: User | undefined = Object.values(state.user).find(
      (user) => user.email === action.payload.email
    )

    if (action.type === 'user/addUser' && existingUser) {
      alert(
        'Email address already registered! Please, try again using different email.'
      )
      return
    }

    return next(action)
  }

export default checkLoginMiddleware
