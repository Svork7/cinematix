import { useParams, useLocation } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import { useFetchMovieQuery } from '../../../API/omdbAPI'
import { addFavorite } from '../../../redux/userSlice'
import { Loader } from '../../Loader/Loader'
import PageHeader from '../PageHeader'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './Movie.module.css'

export const Movie = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const paramsName: string = useParams().name || ''
  const { data, isLoading } = useFetchMovieQuery(paramsName)
  const user = useCurrentUser()

  const isInFavorite = user?.favorites?.find(
    (el: { name: string; url: string }) => el.name === paramsName
  )
  const url = location.pathname

  const toggleFavorites = () => {
    dispatch(
      addFavorite({ name: data?.title, url: url, userEmail: user.email })
    )
  }

  if (isLoading) {
    return (
      <div className={styles.movie}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={styles.movie}>
      <PageHeader text="Movie info:" />
      <div className={styles.movieContainer}>
        <div className={styles.movieMain}>
          <div className={styles.moviePoster}>
            <img src={data?.poster} alt={data?.title} />
          </div>
          <div className={styles.movieMainInfos}>
            <div className=".movieFavorite">
              {user?.email ? (
                isInFavorite ? (
                  <div className={styles.favoriteBtn} onClick={toggleFavorites}>
                    <p className={styles.btnText}>Delete from Favorites</p>
                    <FavoriteIcon />
                  </div>
                ) : (
                  <div className={styles.favoriteBtn} onClick={toggleFavorites}>
                    <p className={styles.btnText}>Add to Favorites</p>
                    <FavoriteBorderIcon />
                  </div>
                )
              ) : null}
            </div>
            <div className={styles.moviesInfo}>
              <span>Title:</span> {data.title}
            </div>
            <div className={styles.moviesInfo}>
              <span>Cast:</span> {data.actors}
            </div>
            <div className={styles.moviesInfo}>
              <span>Country:</span> {data.country}
            </div>
            <div className={styles.moviesInfo}>
              <span>Director:</span> {data.director}
            </div>
            <div className={styles.moviesInfo}>
              <span>Year:</span> {data.year}
            </div>
            <div className={styles.moviesInfo}>
              <span>Released:</span> {data.released}
            </div>
            <div className={styles.moviesInfo}>
              <span>BoxOffice:</span> {data.boxoffice}
            </div>
            <div className={styles.moviesInfo}>
              <span>imdb Rating:</span> {data.imdbrating}
            </div>
            <div className={styles.moviesInfo}>
              <span>About:</span> {data.plot}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
