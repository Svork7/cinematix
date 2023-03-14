import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../../../app/hooks'
import Button from '../../UI/Button/Button'
import { Loader } from '../../Loader/Loader'

import styles from './Home.module.css'

const Home = () => {
  const { username } = useCurrentUser() || {}

  return (
    <div className={styles.home}>
      <Suspense fallback={<Loader />}>
        <div className={styles.homeHeader}>
          <h1>Movies, Cartoons, Series, TV shows and more.</h1>
        </div>
        <h2 className={styles.homeText}>
          Welcome, {username || 'Dear Guest'}!
        </h2>
        <Link to="/movies">
          <Button buttonName="Start exploring world of cinema!" />
        </Link>
      </Suspense>
    </div>
  )
}

export default Home
