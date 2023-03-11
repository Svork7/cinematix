import { useState } from 'react'
import styles from './Input.module.css'

interface Props {
  id: number
  value: string
  name: string
  type: string
  placeholder: string
  errorMessage: string
  label: string
  pattern?: string
  required: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input = (props: Props) => {
  const [focus, setFocus] = useState(false)
  const { label, errorMessage, onChange, id, ...inputProps } = props

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <div className={styles.input}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.inputInput}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === 'confirmPassword' && handleFocus()}
        data-focused={focus.toString()}
      />
      <span className={styles.inputSpan}>{errorMessage}</span>
    </div>
  )
}

export default Input
