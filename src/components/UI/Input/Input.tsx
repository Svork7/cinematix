import { useState } from 'react'
import s from './Input.module.css'

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

const Input = ({ label, errorMessage, onChange, id, ...inputProps }: Props) => {
  const [focus, setFocus] = useState(false)

  const handleFocus = () => {
    setFocus(true)
  }

  return (
    <div className={s.input}>
      <label className={s.inputLabel}>{label}</label>

      <input
        className={s.inputInput}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === 'confirmPassword' && handleFocus()}
        data-focused={focus.toString()}
      />
      <span className={s.inputSpan}>{errorMessage}</span>
    </div>
  )
}

export default Input
