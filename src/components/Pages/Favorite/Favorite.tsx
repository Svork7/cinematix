import { Link } from 'react-router-dom'
import {
  useAppDispatch,
  useAppSelector,
  useCurrentUser,
} from '../../../app/hooks'
import { User, deleteFavorite } from '../../../redux/userSlice'
import PageHeader from '../PageHeader'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './Favorite.module.css'
/*
interface Favorites {
  name: string
  url: string
}
*/
export const Favorite = () => {
  const dispatch = useAppDispatch()
  /*
  
  if (currentFavoriteUser?.favorites?.length === 0) {
    return (
      <div className={styles.favorite}>
        <PageHeader text="There is no favorites yet" />
      </div>
    )
  } else {
    return (
      <div className={styles.favorite}>
        <PageHeader text="Your favorites:" />

        <ul className={styles.favoriteList}>
          {currentFavoriteUser?.favorites
            ?.filter(
              (el: Favorites) => el.name !== undefined && el.url !== undefined
            )
            .map((el: Favorites, i: number) => (
              <li className={styles.favoriteListItem} key={i}>
                <Link to={el.url}>{el.name}</Link>
                <div onClick={() => deleteFavorites(el)}>
                  <FavoriteIcon />
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}
*/
  /** */

  const usersFromState = useAppSelector((state) => state.user)
  let currentFavoriteUser: User = {}
  const userIsAuth = useCurrentUser()

  if (userIsAuth?.email) {
    currentFavoriteUser = usersFromState[`${userIsAuth.email}`]
  }

  const deleteFavorites = (el: { name: string; url: string }) => {
    dispatch(deleteFavorite({ name: el.name, userEmail: userIsAuth.email }))
  }

  if (currentFavoriteUser?.favorites?.length === 0) {
    return (
      <div className={styles.favorite}>
        <PageHeader text="There is no favorites yet" />
      </div>
    )
  }

  return (
    <div className="app_favorites">
      <p className="app_favorites-full-p">Favorites list</p>
      <ul className="app__favorites-ul">
        {currentFavoriteUser?.favorites
          ?.filter((el) => el.name !== undefined && el.url !== undefined)
          .map((el: { name: string; url: string }, i: number) => (
            <li className="app__favorites-li" key={i}>
              <Link to={el.url}>{el.name}</Link>
              <div onClick={() => deleteFavorites(el)}>
                <FavoriteIcon />
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
/** */
