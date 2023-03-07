/* для себя, чтобы понимать какие данные отдает апишка
{"Title":"Sunshine","Year":"2007","Rated":"R","Released":"27 Jul 2007","Runtime":"107 min","Genre":"Sci-Fi, Thriller","Director":"Danny Boyle","Writer":"Alex Garland","Actors":"Cillian Murphy, Rose Byrne, Chris Evans","Plot":"A team of international astronauts is sent on a dangerous mission to reignite the dying Sun with a nuclear fission bomb in 2057.","Language":"English","Country":"United Kingdom, United States","Awards":"1 win & 23 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMDliNGY4ZGQtMjU5MS00ODhjLWExMDEtNzI1NmIwZDkzZWQwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.2/10"},{"Source":"Rotten Tomatoes","Value":"76%"},{"Source":"Metacritic","Value":"64/100"}],"Metascore":"64","imdbRating":"7.2","imdbVotes":"254,462","imdbID":"tt0448134","Type":"movie","DVD":"08 Jan 2008","BoxOffice":"$3,675,753","Production":"Fox","Website":"N/A","Response":"True"}
*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SearchTypes } from '../app/types'
import { API_KEY } from '../app/constants'

export interface SearchResponse {
  SearchTypes: Record<string, SearchTypes>[]
  totalResults: string
  Response: string
  [propName: string]: any
}

export interface MovieInfo {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Released: string
  Production: string
  Director: string
  Actors: string
  Plot: string
  Country: string
  imdbRating: string
  BoxOffice: string
  Website: string
}

export const ombdAPI = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: `http://www.omdbapi.com/` }),
  endpoints: (build) => ({
    fetchAllMovies: build.query<Record<string, any>[], void>({
      query: () => ({
        url: `?apikey=${API_KEY}&s=sunshine`,
      }),
      transformResponse: (data: SearchResponse) => {
        const handledResponse = []

        for (let i = 0; i < data.SearchTypes.length; i++) {
          let obj: Record<string, SearchTypes> = {}
          for (let key in data.SearchTypes[i]) {
            obj[key[0].toLowerCase() + key.slice(1)] = data.SearchTypes[i][key]
          }
          handledResponse.push(obj)
        }

        return handledResponse
      },
    }),

    fetchMovie: build.query<any, string>({
      query: (query) => ({
        url: `?apikey=${API_KEY}&t=${query}&plot=full`,
      }),
      transformResponse: (data: Array<MovieInfo>) => {
        const handledResponse: Record<string, MovieInfo> = {}

        for (let key in data) {
          handledResponse[key.toLowerCase()] = data[key]
        }

        return handledResponse
      },
    }),
    fetchMovies: build.query({
      query: (query) => ({
        url: `?apikey=${API_KEY}&s=${query}`,
      }),
      transformResponse: (data: SearchResponse) => {
        const handledResponse: Array<Record<string, SearchTypes>> = []
        if (data.Error === 'Sorry, we did not find anything') {
          return handledResponse
        } else {
          for (let i = 0; i < data.SearchTypes.length; i++) {
            let obj: Record<string, SearchTypes> = {}
            for (let key in data.SearchTypes[i]) {
              obj[key[0].toLowerCase() + key.slice(1)] =
                data.SearchTypes[i][key]
            }
            handledResponse.push(obj)
          }
          return handledResponse
        }
      },
    }),
  }),
})

export const {
  useFetchAllMoviesQuery,
  useFetchMovieQuery,
  useFetchMoviesQuery,
} = ombdAPI
