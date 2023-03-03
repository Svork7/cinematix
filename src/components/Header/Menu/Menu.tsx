import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../img/logo.png'

import './Menu.css'

const Menu = () => {
  return (
    <nav className="headerNav">
      <NavLink to="home">Home</NavLink>

      <NavLink to="movies">Movies</NavLink>
      <NavLink to="search">Search</NavLink>
      <NavLink to="favorites">Favorites</NavLink>
      <NavLink to="history">History</NavLink>

      <NavLink to="signin">Sign In</NavLink>

      <NavLink to="signup">Sign Up</NavLink>
    </nav>
  )
}

export default Menu
