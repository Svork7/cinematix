import { Outlet } from 'react-router-dom'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'
import Footer from '../components/Footer/Footer'

const MainLayout = () => {
  return (
    <div>
      <>
        <HeaderMenu />
        <Outlet />
        <Footer />
      </>
    </div>
  )
}

export default MainLayout
