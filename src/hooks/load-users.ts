import { api } from '@services/api'
import { useQuery } from 'react-query'
import { string } from 'yup'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

export const loadUsers = async (): Promise<User[]> => {
  const { data: response } = await api.get('users')
  const users = response.users.map(user => Object.assign(user, { 
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))
  return users
}

export const useLoadUsers = () => {
  return useQuery('users', loadUsers, {
    staleTime: 1000 * 5
  })
}