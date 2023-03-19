import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

interface Props {
  imdbID: string
  poster: string
  title: string
}

export const Card = ({ poster, imdbID, title }: Props) => {
  return (
    <div className={styles.card} key={imdbID}>
      <div className={styles.cardContainer}>
        <Link to={title}>
          <img
            className={styles.cardImg}
            src={poster}
            alt={title + ' has no poster'}
            title={title}
          />{' '}
        </Link>
      </div>
    </div>
  )
}

Card.propTypes = {
  props: PropTypes.objectOf(PropTypes.string),
  imdbid: PropTypes.string,
  toster: PropTypes.string,
  title: PropTypes.string,
}
