import { Middleware } from 'redux'
import { RootState } from '../app/store'

export const checkLoginMiddleware: Middleware =
  (store) => (next) => (action) => {
    let result
    const currentStore: RootState = store.getState()

    if (action.type === 'user/addUser') {
      const emailUsed = Object.values(currentStore.user).find(
        (user) => user.email === action.payload.email
      )

      if (emailUsed) {
        alert('Email address already registered!')

        return result
      }
    }

    result = next(action)

    return result
  }
