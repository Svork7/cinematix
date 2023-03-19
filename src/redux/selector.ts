import { createSelector } from 'reselect'
import { User } from './userSlice'

const selectUserState = (state: any) => state.user

const selectUserHistory = createSelector(
  [selectUserState, (email: string) => email],
  (userState, email) => userState[email]?.historySearch || []
)

export const selectHistoryCount = createSelector(
  [selectUserHistory],
  (history) => history.length
)
