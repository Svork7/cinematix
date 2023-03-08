import PropTypes from 'prop-types'
import styles from './PageHeader.module.css'

interface Prop {
  text: string
}

const PageHeader = ({ text }: Prop) => {
  return <h1 className={styles.pageHeader}> {text} </h1>
}

PageHeader.propTypes = {
  text: PropTypes.string,
}

export default PageHeader
