/* для себя, чтобы понимать какие данные отдает апишка
{"Title":"Sunshine","Year":"2007","Rated":"R","Released":"27 Jul 2007","Runtime":"107 min","Genre":"Sci-Fi, Thriller","Director":"Danny Boyle","Writer":"Alex Garland","Actors":"Cillian Murphy, Rose Byrne, Chris Evans","Plot":"A team of international astronauts is sent on a dangerous mission to reignite the dying Sun with a nuclear fission bomb in 2057.","Language":"English","Country":"United Kingdom, United States","Awards":"1 win & 23 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMDliNGY4ZGQtMjU5MS00ODhjLWExMDEtNzI1NmIwZDkzZWQwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.2/10"},{"Source":"Rotten Tomatoes","Value":"76%"},{"Source":"Metacritic","Value":"64/100"}],"Metascore":"64","imdbRating":"7.2","imdbVotes":"254,462","imdbID":"tt0448134","Type":"movie","DVD":"08 Jan 2008","BoxOffice":"$3,675,753","Production":"Fox","Website":"N/A","Response":"True"}
*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEY, OMDB_API_URL } from '../app/constants'
import { SearchType } from '../app/types'

// Тип для объекта фильма
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

// Тип для объекта ответа от API
export interface OmdbAPIResponse {
  Search: MovieInfo[]
  totalResults: string
  Response: string
  [propName: string]: any
}

// Создаем экземпляр API с помощью createApi
export const omdbAPI = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({ baseUrl: OMDB_API_URL }),

  // endpoint-ы для запросов к API
  endpoints: (build) => ({
    // Получаем список всех фильмов
    fetchAllMovies: build.query<MovieInfo[], void>({
      query: () => ({
        url: `?apikey=${API_KEY}&s=sunshine`,
      }),
      transformResponse: (data: OmdbAPIResponse): MovieInfo[] => {
        return data.Search.map((movie) =>
          Object.keys(movie).reduce((acc, key) => {
            acc[key.toLowerCase()] = movie[key]
            return acc
          }, {} as MovieInfo)
        )
      },
    }),

    // Получаем информацию о конкретном фильме по его названию
    fetchMovie: build.query<MovieInfo, string>({
      query: (query) => ({
        url: `?apikey=${API_KEY}&t=${query}&plot=full`,
      }),
      transformResponse: (data: OmdbAPIResponse): MovieInfo =>
        Object.keys(data).reduce((acc, key) => {
          acc[key.toLowerCase()] = data[key]
          return acc
        }, {} as MovieInfo),
    }),

    // поиск фильмов по запросу
    fetchMovies: build.query<MovieInfo[], string>({
      query: (query) => ({
        url: `?apikey=${API_KEY}&s=${query}`,
      }),
      transformResponse: (data: OmdbAPIResponse): MovieInfo[] => {
        if (data.Response === 'False' && data.Error === 'Movie not found!') {
          return []
        } else {
          // ответ API в список фильмов
          return data.Search.map((movie) =>
            Object.keys(movie).reduce((acc, key) => {
              acc[key.toLowerCase()] = movie[key]
              return acc
            }, {} as MovieInfo)
          )
        }
      },
    }),
  }),
})

// Экспортируем утилиты для использования в приложении
export const {
  useFetchAllMoviesQuery,
  useFetchMovieQuery,
  useFetchMoviesQuery,
} = omdbAPI
