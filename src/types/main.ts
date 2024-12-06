import { type AnySchema } from 'yup'

export interface IAuthForm {
  name: string
  label: string
  type: string
  validation: AnySchema
}
