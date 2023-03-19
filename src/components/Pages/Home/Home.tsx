import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser } from '../../../app/hooks'
import Button from '../../UI/Button/Button'
import { Loader } from '../../Loader/Loader'

import styles from './Home.module.css'

const Home = () => {
  const { username } = useCurrentUser()
  return (
    <div className={styles.home}>
      <Suspense fallback={<Loader />}>
        <div className={styles.homeHeader}>
          <h1>
            {username || 'Dear Guest'}! Movies, cartoons, series and more here.
          </h1>
          <Link to="/movies">
            <Button buttonName="Let`s go!" />
          </Link>
        </div>
      </Suspense>
    </div>
  )
}

export default Home
