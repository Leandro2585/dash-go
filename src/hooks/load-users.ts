import { api } from '@services/api'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type PaginationProps = {
  page: number
}

type LoadUsersResponse = {
  users: User[], 
  totalCount: number 
}

export const loadUsers = async ({ page }: PaginationProps): Promise<LoadUsersResponse> => {
  const { data: { _bodyInit: response }, config, headers, request } = await api.get('users', {
    params: {
      page
    }
  })
  const totalCount = Number(JSON.parse(request.response).headers.map['x-total-count'])
  const users = response.map(user => Object.assign(user, { 
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }))
  return { users, totalCount }
}

export const useLoadUsers = ({ page }: PaginationProps, options?: UseQueryOptions) => {
  return useQuery(['users', page], async () => await loadUsers({ page }), {
    staleTime: 1000 * 5,
    ...options
  }) as UseQueryResult<LoadUsersResponse>
}