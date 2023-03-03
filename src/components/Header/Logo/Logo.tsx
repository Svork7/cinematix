import { NavLink, Link } from 'react-router-dom'
import logo from './logo.png'

import './Logo.css'

const Logo = () => {
  return (
    <NavLink to="/">
      <img className="logo" src={logo} alt="logo" />
    </NavLink>
  )
}
export default Logo
