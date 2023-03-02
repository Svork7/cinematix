import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../img/logo.png'

import './HeaderMenu.css'

const HeaderMenu = () => {
  return (
    <div className="Header">
      <img className="logo" src={logo} alt="logo" />
      <nav>
        <NavLink to="home">Home</NavLink>

        <NavLink to="movies">Movies</NavLink>
        <NavLink to="search">Search</NavLink>
        <NavLink to="favorites">Favorites</NavLink>
        <NavLink to="history">History</NavLink>
        <NavLink to="signin">signIn</NavLink>
        <NavLink to="signup">signUp</NavLink>
      </nav>
    </div>
  )
}

export default HeaderMenu
