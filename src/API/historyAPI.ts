import { User } from '../redux/userSlice'

const delay = 1000

interface HistoryApiResponse {
  currentUser: User
  historySearchCopy?: string[]
}

const historyAPI = {
  post: (currentUser: User, url: string) =>
    new Promise<HistoryApiResponse>((resolve, reject) => {
      setTimeout(() => {
        if (!currentUser.email) {
          reject('User does not exist')
        }

        let historySearchCopy

        if (currentUser.historySearch) {
          historySearchCopy = [...currentUser.historySearch, url]
        }

        resolve({ currentUser, historySearchCopy })
      }, delay)
    }),

  get: (currentUser: User) =>
    new Promise<{ currentUser: User; links: string[] }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ currentUser, links: currentUser.historySearch ?? [] })
      }, delay)
    }),

  delete: (currentUser: User) =>
    new Promise<{ currentUser: User }>((resolve, reject) => {
      setTimeout(() => {
        resolve({ currentUser })
      }, delay)
    }),
}

export default historyAPI
