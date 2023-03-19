import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from './components/Header/Menu/ProtectedRoute'
import Home from './components/Pages/Home/Home'
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback'
import { SignIn } from './components/Pages/SignIn/SignIn'
import { SignUp } from './components/Pages/SignUp/SignUp'
import { Movies } from './components/Pages/Movies/Movies'
import { Search } from './components/Pages/Search/Search'
import { Favorite } from './components/Pages/Favorite/Favorite'
import { History } from './components/Pages/History/History'
import { Movie } from './components/Pages/Movie/Movie'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="movies" element={<Movies />} />

            <Route
              path="/movies/:name"
              element={
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <Movie />
                </ErrorBoundary>
              }
            />

            <Route path="/search/" element={<Search />} />
            <Route
              path="/search/:name"
              element={
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <Movie />
                </ErrorBoundary>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="favorites" element={<Favorite />} />
              <Route path="history" element={<History />} />
            </Route>

            {/*<Route path="*" element={<NotFound />} />*/}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
