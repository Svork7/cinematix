import { NavLink, Link } from 'react-router-dom'
import Menu from './Menu/Menu'
import styles from './Header.module.css'
import Logo from './Logo/Logo'

const Header = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Menu />
    </div>
  )
}

export default Header
