import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { signIn } from '../../../redux/userSlice'
import { LOGIN_INPUTS } from '../../../app/constants'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import styles from './SignIn.module.css'

interface FormValues {
  email: string
  password: string
}

interface User {
  email: string
  password: string
}

export const SignIn = () => {
  const [formData, setFormData] = useState<FormValues>({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.user[formData.email])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (currentUser && formData.password === currentUser.password) {
        dispatch(signIn(formData.email))
        navigate('/')
      } else {
        handleError('Invalid password.')
      }
    } catch (err) {
      handleError("User doesn't exist.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleError = (message: string) => {
    console.error(message)
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInForm}>
        <form className={styles.signInFormForm} onSubmit={handleLogin}>
          <h1 className={styles.signInFormHeader}>Log in</h1>
          <div>
            {LOGIN_INPUTS.map((input) => (
              <Input
                key={input.id}
                id={input.id}
                name={input.name}
                type={input.type}
                errorMessage={input.errorMessage}
                label={input.label}
                pattern={input.pattern}
                required={input.required}
                placeholder={input.placeholder}
                value={formData[input.name as keyof FormValues]}
                onChange={handleChange}
              />
            ))}
          </div>
          <Button buttonName="Login" />
        </form>
        <div className={styles.signInRedirect}>
          <Link to="/signup">
            <span className={styles.signInRedirectSpan}>Sign up Now!</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
