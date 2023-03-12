import React, { useState, Suspense } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import { TYPE_FILTER } from '../../../app/constants'
import { postHistory } from '../../../redux/userSlice'
import { Loader } from '../../Loader/Loader'
import Button from '../../UI/Button/Button'
import SearchInput from '../../UI/SearchInput/SearchInput'
import PageHeader from '../../Pages/PageHeader'
import ForwardIcon from '@mui/icons-material/Forward'
import styles from './Search.module.css'

const SearchResults = React.lazy(
  () => import('../../SearchResults/SearchResults')
)

interface SearchSectionProps {}

interface FilterState {
  [key: string]: boolean
}

export const SearchSection: React.FC<SearchSectionProps> = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const urlQuery = window.location.href.split('?')[1]
  const name = new URLSearchParams(location.search).get('name')
  const userEmail = useCurrentUser()?.email as string

  const [filterState, setFilterState] = useState<FilterState>({})
  const [query, setQuery] = useState<string>(urlQuery || 'simpsons')
  const [searchName, setSearchName] = useState<string>(name || '')
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const toggleFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const value = target.innerText
    target.classList.toggle('active')

    const newFilterState = Object.assign({}, filterState)
    newFilterState[value] = !newFilterState[value]

    setFilterState(newFilterState)
    setSearchName(name || '')
  }

  const applyFilters = () => {
    const resultQueryParams: string[] = [`name=${searchName || 'simpsons'}`]

    for (let key in filterState) {
      if (filterState[key] && key !== 'All') {
        resultQueryParams.push(`type=${key}`)
      }
    }

    const url = `${location.pathname}?${resultQueryParams.join('&')}`
    dispatch(postHistory({ url, userEmail }))
    navigate(`?${resultQueryParams.join('&')}`)
    setQuery(resultQueryParams.join('&'))
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
                className={styles.searchFilterItem}
                key={i}
                onClick={toggleFilterItem}
              >
                {el}
              </div>
            )
          })}
        </div>
      </div>
      <Button buttonName="Search" onClick={applyFilters} />
      <PageHeader text={'Search Results:'} />
      <Suspense fallback={<Loader />}>
        <SearchResults searchName={query} />
      </Suspense>
    </div>
  )
}
