import { type IAuthForm } from '@/types/main'
import { string } from 'yup'

export const userFormFields: Array<IAuthForm> = [
  {
    name: 'userName',
    label: 'Username',
    type: 'text',
    validation: string()
      .required('Username is required')
      .min(5, 'Password must at least 5 characters long'),
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: string()
      .required('Password is required')
      .min(8, 'Password must at least 8 characters long'),
  },
]
