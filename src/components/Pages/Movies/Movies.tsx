import React, { useState, Suspense, useCallback } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import ForwardIcon from '@mui/icons-material/Forward'
import useDebounce from '../../../app/useDebounce'
import { useFetchAllMoviesQuery } from '../../../API/omdbAPI'
import { SearchInput } from '../../UI/SearchInput/SearchInput'
import { Loader } from '../../Loader/Loader'
import { Card } from '../../Card/Card'
import PageHeader from '../../Pages/PageHeader'
import styles from './Movies.module.css'

const SearchResults = React.lazy(
  () => import('../../SearchResults/SearchResults')
)

export const Movies = () => {
  const location = useLocation()
  const movieName = new URLSearchParams(location.search).get('search')
  const navigate = useNavigate()

  const { data = [], isLoading } = useFetchAllMoviesQuery()
  const [searchName, setSearchName] = useState(movieName || '')
  const debouncedSearchName = useDebounce(searchName, 1500)

  const onChange = useCallback(
    (e: { target: HTMLInputElement }) => {
      setSearchName(e.target.value)
    },
    [setSearchName]
  )

  React.useEffect(() => {
    if (searchName.length > 0) {
      navigate(`?search=${debouncedSearchName}`)
    }
  }, [debouncedSearchName])

  return (
    <div className={styles.movies}>
      <PageHeader
        text={
          'Here you can find info about Movies, Cartoons, Series and TV Shows in real time. Just start to type its name'
        }
      />
      <div className={styles.dynamicSearch}>
        <SearchInput
          placeholder="Start to type here..."
          value={searchName}
          onChange={onChange}
        />
        <Link className={styles.advancedSearch} to="/search">
          Switch to Advanced Search {<ForwardIcon />}
        </Link>
      </div>
      <PageHeader text={'Movies found:'} />
      {debouncedSearchName ? (
        <Suspense fallback={<Loader />}>
          <SearchResults searchName={debouncedSearchName} />
        </Suspense>
      ) : isLoading ? (
        <Loader />
      ) : (
        <section className={styles.moviesSection}>
          {data.map((movie) => (
            <Card
              key={movie.imdbID}
              imdbID={movie.imdbID}
              poster={movie.poster}
              title={movie.title}
            />
          ))}
        </section>
      )}
    </div>
  )
}
