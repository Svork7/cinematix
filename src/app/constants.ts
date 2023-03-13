// ключ API
export const API_KEY = '1a9307d6'
// url API
export const OMDB_API_URL = 'http://www.omdbapi.com/'
//правила sign Up
const USERNAME_ERROR_MESSAGE =
  'Username should be from 4 to 16 letters or numbers without special symbols'
const EMAIL_ERROR_MESSAGE = 'Invalid email address'
const PASSWORD_ERROR_MESSAGE =
  'Password should be from 6 to 20 characters and should contain at least one number and one special symbol'

export const USERNAME_PATTERN = '^[A-Za-z0-9]{4,16}$'
export const PASSWORD_PATTERN =
  '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'

export const SIGNUP_INPUTS = [
  {
    id: 1,
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    label: 'Username',
    pattern: USERNAME_PATTERN,
    required: true,
    errorMessage: USERNAME_ERROR_MESSAGE,
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    label: 'Email',
    required: true,
    errorMessage: EMAIL_ERROR_MESSAGE,
  },
  {
    id: 3,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    pattern: PASSWORD_PATTERN,
    required: true,
    errorMessage: PASSWORD_ERROR_MESSAGE,
  },
]
// правила Sign in
export const LOGIN_INPUTS = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    errorMessage: EMAIL_ERROR_MESSAGE,
    label: 'Email',
    required: true,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    errorMessage: 'Invalid Password',
    label: 'Password',
    pattern: PASSWORD_PATTERN,
    required: true,
  },
]

//фильтры поиска
export const TYPE_FILTER = ['All', 'Movie', 'Series']
