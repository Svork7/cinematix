import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '../../../app/hooks'

export const ProtectedRoute = () => {
  const userEmail = useCurrentUser()?.email
  return userEmail ? <Outlet /> : <Navigate to="/signin" />
}
