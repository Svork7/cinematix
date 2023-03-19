import { Link } from 'react-router-dom'
import {
  useAppSelector,
  useCurrentUser,
  useAppDispatch,
} from '../../../app/hooks'
import { deleteHistory } from '../../../redux/userSlice'
import PageHeader from '../PageHeader'
import s from './History.module.css'

export const History = () => {
  const dispatch = useAppDispatch()
  const currentUser = useCurrentUser()
  const links: string[] = useAppSelector(
    (state) =>
      state.user[currentUser?.email as string].historySearch as string[]
  )

  const clearHistory = () => {
    dispatch(deleteHistory(currentUser?.email as string))
  }
  if (links.length > 0) {
    return (
      <div className={s.history}>
        <PageHeader text={'Search history'} />
        <div className={s.historyWrap}>
          <button onClick={clearHistory} className={s.historyClear}>
            Clear History
          </button>
          {links.map((link, i) => (
            <Link to={link} className={s.historyLink} key={i}>
              {link.toString().split('?=')[1]}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={s.history}>
      <PageHeader text={'History is empty'} />
    </div>
  )
}
