import { createSelector } from 'reselect'
import { User } from './userSlice'

// Define a selector to get the user state
const selectUserState = (state: any) => state.user

// Define a selector to get the user's history array by email
const selectUserHistory = createSelector(
  [selectUserState, (email: string) => email],
  (userState, email) => userState[email]?.historySearch || []
)

// Define a selector to count the number of history items for a user
export const selectHistoryCount = createSelector(
  [selectUserHistory],
  (history) => history.length
)
