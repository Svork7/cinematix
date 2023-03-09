import { useState } from 'react'
import styles from './Input.module.css'

// Определяем интерфейс для пропсов компонента Input
interface InputProps {
  id: string
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

// Определяем компонент Input
const Input = ({
  id,
  value,
  name,
  type,
  placeholder,
  errorMessage,
  label,
  pattern,
  required,
  onChange,
}: InputProps) => {
  // Используем хук useState для отслеживания состояния фокуса
  const [isFocused, setIsFocused] = useState(false)

  // Обработчик фокуса
  const handleFocus = () => {
    setIsFocused(true)
  }

  // Определяем, является ли элемент input для подтверждения пароля
  const isConfirmPasswordInput = name === 'confirmPassword'

  return (
    <div className={styles.input}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.inputInput}
        id={id}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        required={required}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={isConfirmPasswordInput ? handleFocus : undefined}
        data-focused={isFocused.toString()}
      />
      <span className={styles.inputError}>{errorMessage}</span>
    </div>
  )
}

export default Input
