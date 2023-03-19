import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAppDispatch, useCurrentUser } from '../../../app/hooks'
import { logOut } from '../../../redux/userSlice'

import s from './Menu.module.css'

const Menu = () => {
  const dispatch = useAppDispatch()
  const { isAuth, username, email } = useCurrentUser() || {}
  const logout = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(logOut(email))
  }
  return (
    <nav className={s.headerNav}>
      <NavLink to="home">Home</NavLink>
      <NavLink to="movies">Movies</NavLink>
      <NavLink to="search">Search</NavLink>
      {isAuth && (
        <>
          <NavLink to="favorites">Favorites</NavLink>
          <NavLink to="history">History</NavLink>
        </>
      )}
      {isAuth ? (
        <>
          <Link to="/" onClick={logout} className="">
            Log Out
          </Link>
          <span className={s.username}>{username?.[0]}</span>
        </>
      ) : (
        <>
          <NavLink to="signin">Sign In</NavLink>
          <NavLink to="signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  )
}

export default Menu
