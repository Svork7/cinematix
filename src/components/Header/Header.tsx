import React, { useContext } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { ThemeContext } from '../ThemeProvider'
import Logo from './Logo/Logo'
import Menu from './Menu/Menu'

import styles from './Header.module.css'

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <div className={styles.header}>
      <Logo />

      {theme === 'light' ? (
        <div
          onClick={toggleTheme}
          className={`${styles.modeWrap} ${styles.modeWrapLight}`}
        >
          <DarkModeIcon className={styles.modeIcon} />
          <div>Dark mode</div>
        </div>
      ) : (
        <div
          onClick={toggleTheme}
          className={`${styles.modeWrap} ${styles.modeWrapDark}`}
        >
          <LightModeIcon className={styles.modeIcon} />
          <div>Light mode</div>
        </div>
      )}

      <Menu />
    </div>
  )
}

export default Header
