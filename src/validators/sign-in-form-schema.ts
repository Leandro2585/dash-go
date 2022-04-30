import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})