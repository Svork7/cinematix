import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '../UI/Button/Button'
import styles from './Card.module.css'

interface Props {
  imdbID: string
  poster: string
  title: string
}

export const Card = ({ poster, imdbID, title }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <img
          className={styles.cardImg}
          src={poster}
          alt={title + ' has no poster'}
        />
      </div>
      <Link to={title}>
        <Button className={styles.cardBtn} buttonName="More" />
      </Link>
    </div>
  )
}

Card.propTypes = {
  imdbID: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
