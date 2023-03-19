import s from './SearchInput.module.css'

interface Props {
  value: string
  placeholder?: string
  className?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchInput = ({ onChange, ...inputProps }: Props) => {
  return (
    <div>
      <input
        className={s.searchInput}
        {...inputProps}
        onChange={onChange}
        autoFocus
      />
    </div>
  )
}
