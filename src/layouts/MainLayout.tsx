import { Outlet } from 'react-router-dom'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu'

const MainLayout = () => {
  return (
    <div>
      <>
        <HeaderMenu />
        <Outlet />
      </>
    </div>
  )
}

export default MainLayout
