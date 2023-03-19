import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { addUser } from '../../../redux/userSlice'
import { SIGNUP_INPUTS } from '../../../app/constants'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import styles from './SignUp.module.css'

export const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const confirmPswInput = [
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Password not the same!',
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ]

  const inputs = [...SIGNUP_INPUTS, ...confirmPswInput]

  const createUser = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    dispatch(addUser(newUser))
    navigate('/signin')
  }
  const onChange = (value: string, name: string) => {
    setValues({ ...values, [name]: value })
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpForm}>
        <form className={styles.signUpFormForm} onSubmit={createUser}>
          <h1 className={styles.signUpFormHeader}>
            Ready to continue? <br /> Sign Up for free!
          </h1>
          <div>
            {inputs.map((input) => (
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
                onChange={(e: any) => onChange(e.target.value, e.target.name)}
              />
            ))}
          </div>
          <Button buttonName="SUBMIT" />
          <div className={styles.signUpFormRedirect}>
            <p className={styles.signUpFormRedirectP}>
              Already registered?
              <Link to="/signin">
                <span className={styles.signUpFormRedirectSpan}>
                  Log In Now!
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
