import { Permissions, Roles, AuthContext } from '@contexts/global'
import { validateUserPermissions } from '@lib/validate-user-permissions'
import { userInfo } from 'os'
import { useContext } from 'react'

type UseCanParams = {
  permissions?: Permissions[]
  roles?: Roles[]
}

export const useCan = ({ permissions = [], roles }: UseCanParams): boolean => {
  const { user, isAuthenticated } = useContext(AuthContext)
  if(!isAuthenticated) return false
  const userHasValidPermissions = validateUserPermissions({ user, permissions, roles })
  return userHasValidPermissions
}