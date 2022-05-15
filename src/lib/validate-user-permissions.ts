import { User, Permissions, Roles } from '@contexts/global'

type ValidateUserPermissionsParams = {
  user: Omit<User, 'email'>
  permissions?: Permissions[]
  roles?: Roles[]
}

export const validateUserPermissions = ({ user, permissions, roles }: ValidateUserPermissionsParams): boolean => {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission)
    })
    if(!hasAllPermissions) return false
  }
  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role)
    })
    if(!hasAllRoles) return false
  }
  return true
}