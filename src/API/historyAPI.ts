import { User } from '../redux/userSlice'

const delay = 1000

export const historyAPI = {
  post: (currentUser: User, url: string) =>
    new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (!currentUser.email) {
          reject('User does not exist')
        }

        let historySearchCopy

        if (currentUser.historySearch) {
          historySearchCopy = [...currentUser.historySearch]
          historySearchCopy?.push(url)
        }

        resolve({ currentUser, historySearchCopy })
      }, delay)
    }),

  get: (currentUser: User) =>
    new Promise<{ currentUser: User; links: string[] }>((resolve, reject) => {
      setTimeout(() => {
        currentUser.historySearch &&
          resolve({ currentUser, links: currentUser.historySearch })
      }, delay)
    }),

  delete: (currentUser: User) =>
    new Promise<{ currentUser: User }>((resolve, reject) => {
      setTimeout(() => {
        currentUser.historySearch && resolve({ currentUser })
      }, delay)
    }),
}
