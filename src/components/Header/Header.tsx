import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Menu from './Menu/Menu'
import './Header.css'
import Logo from './Logo/Logo'

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Menu />
    </div>
  )
}

export default Header
