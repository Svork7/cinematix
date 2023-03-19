import { useParams, useLocation } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useFetchMovieQuery } from '../../../API/omdbAPI'
import { addFavorite } from '../../../redux/userSlice'
import { Loader } from '../../Loader/Loader'
import PageHeader from '../PageHeader'

import s from './Movie.module.css'

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
      <div className={s.movie}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={s.movie}>
      <PageHeader text="Movie info:" />
      <div className={s.movieContainer}>
        <div className={s.movieMain}>
          <div className={s.moviePoster}>
            <img src={data?.poster} alt={data?.title} />
          </div>
          <div className={s.movieMainInfos}>
            <div className={s.movieFavorite}>
              {user?.email ? (
                isInFavorite ? (
                  <div className={s.favoriteBtn} onClick={toggleFavorites}>
                    <p className={s.btnText}>Delete from Favorites</p>
                    <FavoriteIcon />
                  </div>
                ) : (
                  <div className={s.favoriteBtn} onClick={toggleFavorites}>
                    <p className={s.btnText}>Add to Favorites</p>
                    <FavoriteBorderIcon />
                  </div>
                )
              ) : null}
            </div>
            <div className={s.movieInfo}>
              <span>Title:</span> {data.title}
            </div>
            <div className={s.movieInfo}>
              <span>Cast:</span> {data.actors}
            </div>
            <div className={s.movieInfo}>
              <span>Country:</span> {data.country}
            </div>
            <div className={s.movieInfo}>
              <span>Director:</span> {data.director}
            </div>
            <div className={s.movieInfo}>
              <span>Year:</span> {data.year}
            </div>
            <div className={s.movieInfo}>
              <span>Released:</span> {data.released}
            </div>
            <div className={s.movieInfo}>
              <span>BoxOffice:</span> {data.boxoffice}
            </div>
            <div className={s.movieInfo}>
              <span>imdb Rating:</span> {data.imdbrating}
            </div>
            <div className={s.movieInfo}>
              <span>About:</span> {data.plot}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
