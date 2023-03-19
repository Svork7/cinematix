import React, { useState, Suspense } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import ForwardIcon from '@mui/icons-material/Forward'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import { TYPE_FILTER } from '../../../app/constants'
import { postHistory } from '../../../redux/userSlice'
//import { useSearchHandler } from '../../../app/utils/useSearchHandler'
import Button from '../../UI/Button/Button'
import { SearchInput } from '../../UI/SearchInput/SearchInput'
import { Loader } from '../../Loader/Loader'
import PageHeader from '../../Pages/PageHeader'
import styles from './Search.module.css'

const SearchResults = React.lazy(
  () => import('../../SearchResults/SearchResults')
)

export const Search = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  const name = new URLSearchParams(location.search).get('name')
  const userEmail = useCurrentUser()?.email as string

  const [filterState, setFilterState] = React.useState<Record<string, boolean>>(
    {}
  )
  const [query, setQuery] = React.useState(location.search || 'break')
  const [searchName, setSearchName] = useState(name || '')
  const navigate = useNavigate()

  const clickOnFilterItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const value = target.innerText
    target.classList.toggle('active')

    setFilterState((prevState) => {
      const result = { ...prevState }
      result[value] = !prevState[value]
      return result
    })

    setSearchName(name || '')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  const applyFilters = () => {
    const resultQueryParams: string[] = []
    resultQueryParams.push(`=${searchName || 'break'}`)

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
        <Link className={styles.rtSearch} to="/movies">
          Switch to Real-time Search {<ForwardIcon />}
        </Link>
      </div>

      <div className={styles.searchFilterWrap}>
        <span className={styles.searchFilterType}>Choose filters: </span>
        <div className={styles.searchFilterItems}>
          {TYPE_FILTER.map((el, i) => {
            return (
              <div key={i} onClick={clickOnFilterItem}>
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
