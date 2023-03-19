import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { signIn } from '../../../redux/userSlice'
import { LOGIN_INPUTS } from '../../../app/constants'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import styles from './SignIn.module.css'

export const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.user)

  const checkUser = (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      let checkEmail = user[values.email as keyof typeof user]['email']

      if (
        checkEmail &&
        values.password === user[values.email as keyof typeof user]['password']
      ) {
        dispatch(signIn(values.email))

        navigate('/')
      } else {
        alert('Invalid password.')
      }
    } catch (err) {
      alert("User doesn't exist.")
    }
  }

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setValues({ ...values, [target.name]: target.value })
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInForm}>
        {' '}
        <form className={styles.signInFormForm} onSubmit={checkUser}>
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
                value={values[input.name as keyof typeof values]}
                onChange={onChange}
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
