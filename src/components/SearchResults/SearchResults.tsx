import { MovieInfo, useFetchMoviesQuery } from '../../API/omdbAPI'
import { Card } from '../Card/Card'
import styles from './SearchResults.module.css'

/*
type Props = {
  searchName: string
}

const SearchResults = ({ searchName }: Props) => {
  const { data, error, isLoading, isFetching } = useFetchMoviesQuery(searchName)
  const movies: MovieInfo[] = data || []

  if (error) {
    return (
      <div className={styles.status}>
        Something went wrong. Maybe too many movies were found.
      </div>
    )
  }

  if (isLoading) {
    return <div className={styles.status}>Loading...</div>
  }

  if (isFetching) {
    return <div className={styles.status}>Fetching...</div>
  }

  return (
    <section className={styles.results}>
      {movies.length === 0 ? (
        <div className={styles.status}>Nothing was found</div>
      ) : (
        movies.map((movie: MovieInfo) => (
          <Card
            key={movie.imdbID}
            imdbID={movie.imdbID}
            poster={movie.Poster}
            title={movie.Title || ''}
          />
        ))
      )}
    </section>
  )
}
*/

type Props = {
  searchName: string
}

const SearchResults = (props: Props) => {
  const { searchName } = props
  const { data, error, isLoading, isFetching } = useFetchMoviesQuery(searchName)
  const movies = data ?? []

  if (error) {
    return (
      <div className={styles.status}>
        Something went wrong. Maybe too many movies were found.
      </div>
    )
  }

  if (isLoading) {
    return <div className={styles.status}>Loading...</div>
  }

  if (isFetching) {
    return <div className={styles.status}>Fetching...</div>
  }

  if (movies.length >= 1) {
    return (
      <section className={styles.results}>
        {movies.map((movie: Record<string, any>) => (
          <Card
            key={movie.imdbID}
            imdbID={movie.imdbID}
            poster={movie.poster}
            title={movie.title}
          />
        ))}
      </section>
    )
  }

  return null
}

export default SearchResults
