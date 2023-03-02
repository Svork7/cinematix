import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/logo.png'

import './HeaderMenu.css'

const HeaderMenu = () => {
  return (
    <>
      <h1>Menu</h1>
      <img className="app__logo" src={logo} alt="logo" />
    </>
  )
}

export default HeaderMenu
