import React, { useState, Suspense } from 'react'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import { TYPE_FILTER } from '../../../app/constants'
import { postHistory } from '../../../redux/userSlice'
import { Loader } from '../../Loader/Loader'
import useSearchHandler from '../../../app/utils/useSearchHandler'
import Button from '../../UI/Button/Button'
import SearchInput from '../../UI/SearchInput/SearchInput'
import PageHeader from '../../Pages/PageHeader'
import ForwardIcon from '@mui/icons-material/Forward'
import styles from './Search.module.css'

const SearchResults = React.lazy(
  () => import('../../SearchResults/SearchResults')
)

interface SearchProps {}

interface FilterState {
  [key: string]: boolean
}

export const Search: React.FC<SearchProps> = () => {
  const location = useLocation()
  const [filterState, setFilterState] = useState<FilterState>(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    const initialFilterState: FilterState = {}
    TYPE_FILTER.forEach((el) => {
      initialFilterState[el] = type
        ? type.split(',').includes(el)
        : el === 'All'
    })
    return initiaSlFilterState
  })

  const [query, setQuery] = useState<string>(() => {
    const params = new URLSearchParams(location.search)
    const name = params.get('name') || 'simpsons'
    return `name=${name}`
  })

  const [searchName, setSearchName] = useState<string>(name || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const toggleFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const value = target.innerText

    const newFilterState = Object.assign({}, filterState)
    newFilterState[value] = !newFilterState[value]

    setFilterState(newFilterState)
    setSearchName(name || '')
  }

  return (
    <div className={styles.search}>
      <PageHeader
        text={' Here you can find info about Movies, Cartoons and Series!'}
      />

      <div className={styles.searchInput}>
        <SearchInput
          placeholder="Enter your search request here"
          value={searchName}
          onChange={onChange}
        />
        <Link to="/movies">Switch to Dynamic Search {<ForwardIcon />}</Link>
      </div>

      <div className={styles.searchFilterWrap}>
        <span className={styles.searchFilterType}>Type :</span>
        <div className={styles.searchFilterItems}>
          {TYPE_FILTER.map((el, i) => {
            return (
              <div
                className={`${styles.searchFilterItem} ${
                  filterState[el] ? styles.active : ''
                }`}
                key={i}
                onClick={toggleFilterItem}
              >
                {el}
              </div>
            )
          })}
        </div>
      </div>
      <Button buttonName="Search" onClick={useSearchHandler} />
      <PageHeader text={'Search Results:'} />
      <Suspense fallback={<Loader />}>
        <SearchResults searchName={query} />
      </Suspense>
    </div>
  )
}
