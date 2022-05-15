import { Permissions, Roles } from '@contexts/global'
import { useCan } from '@hooks/global'
import { ReactNode } from 'react'

type CanProps = {
  children: ReactNode
  permissions?: Permissions[],
  roles?: Roles[]
}

export const Can = ({ children, permissions, roles }: CanProps) => {
  const userCanSeeComponent = useCan({ permissions, roles })
  if(!userCanSeeComponent) return null
  return (
    <>
      {children}
    </>
  )
}