/* для себя, чтобы понимать какие данные отдает апишка
{"Title":"Sunshine","Year":"2007","Rated":"R","Released":"27 Jul 2007","Runtime":"107 min","Genre":"Sci-Fi, Thriller","Director":"Danny Boyle","Writer":"Alex Garland","Actors":"Cillian Murphy, Rose Byrne, Chris Evans","Plot":"A team of international astronauts is sent on a dangerous mission to reignite the dying Sun with a nuclear fission bomb in 2057.","Language":"English","Country":"United Kingdom, United States","Awards":"1 win & 23 nominations","Poster":"https://m.media-amazon.com/images/M/MV5BMDliNGY4ZGQtMjU5MS00ODhjLWExMDEtNzI1NmIwZDkzZWQwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.2/10"},{"Source":"Rotten Tomatoes","Value":"76%"},{"Source":"Metacritic","Value":"64/100"}],"Metascore":"64","imdbRating":"7.2","imdbVotes":"254,462","imdbID":"tt0448134","Type":"movie","DVD":"08 Jan 2008","BoxOffice":"$3,675,753","Production":"Fox","Website":"N/A","Response":"True"}
*/

// типы для поиска

export type Search = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Released: string
  Director: string
  Actors: string
  Plot: string
  Country: string
  imdbRating: string
  BoxOffice: string
}
