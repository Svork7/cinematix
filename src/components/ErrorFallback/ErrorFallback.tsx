import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import s from './ErrorFallback.module.css'

export const ErrorFallback = () => {
  return (
    <div className={s.errorBoundary}>
      <p className={s.errorBoundaryP}>Oops! Something went wrong!</p>
      <Link to="/">
        <Button buttonName="Go to Main Page"></Button>
      </Link>
    </div>
  )
}
