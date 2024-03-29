import { useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../hooks'
import { TYPE_FILTER } from '../constants'
import { postHistory } from '../../redux/userSlice'
/*
export const useSearchHandler = () => {
  const location = useLocation()
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> =
    useAppDispatch()
  const userEmail = useCurrentUser()?.email as string

  const [query, setQuery] = useState<string>(() => {
    const params = new URLSearchParams(location.search)
    const name = params.get('name') || 'simpsons'
    return `name=${name}`
  })

  const { name } = useParams<{ name: string }>()
  const [searchName, setSearchName] = useState<string>(name || '')
  const navigate = useNavigate()
  const generateQueryParams = (searchName: string, filterState: any) => {
    const resultQueryParams: string[] = [`name=${searchName || 'simpsons'}`]

    for (let key in filterState) {
      if (filterState[key] && key !== 'All') {
        resultQueryParams.push(`type=${key}`)
      }
    }

    return resultQueryParams.join('&')
  }

  const applyFilters = (
    location: any,
    userEmail: string,
    searchName: string,
    filterState: any
  ) => {
    const resultQueryParams = generateQueryParams(searchName, filterState)
    const url: string = `${location.pathname}?${resultQueryParams}`
    const payload = { url, userEmail }
    dispatch(postHistory(payload))
    navigate(url)
    setQuery(resultQueryParams)
  }

  return {
    query,
    setQuery,
    searchName,
    setSearchName,
    applyFilters,
  }
}
*/
