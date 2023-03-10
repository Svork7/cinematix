import styles from './SearchInput.module.css'

interface Props {
  value: string
  placeholder?: string
  className?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const SearchInput = (props: Props) => {
  const { onChange, ...inputProps } = props

  return (
    <div>
      <input
        className={styles.searchInput}
        {...inputProps}
        onChange={onChange}
        autoFocus
      />
    </div>
  )
}

export default SearchInput
