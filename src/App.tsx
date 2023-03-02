import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './components/Pages/Home/Home'
import SignIn from './components/Pages/SignIn/SignIn'
import SignUp from './components/Pages/SignUp/SignUp'
import Movies from './components/Pages/Movies/Movies'
import Search from './components/Pages/Search/Search'
import Favorite from './components/Pages/Favorite/Favorite'
import History from './components/Pages/History/History'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="movies" element={<Movies />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorite />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
