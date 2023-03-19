import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import styles from './MainLayout.module.css'

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
