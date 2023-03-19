import { NavLink } from 'react-router-dom'
import logo from './logo.png'
import styles from './Logo.module.css'

const Logo = () => {
  return (
    <div>
      <NavLink to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>
    </div>
  )
}
export default Logo
