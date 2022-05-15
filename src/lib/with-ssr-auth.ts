import { Permissions, Roles, User } from '@contexts/global'
import { AuthTokenError } from '@errors/global'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import decode from 'jwt-decode'
import { validateUserPermissions } from './validate-user-permissions'

type WithSSRAuthOptions = {
  permissions?: Permissions[],
  roles?: Roles[]
}

export const withSSRAuth = <P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)
    const token = cookies['dashgo.token']
    if(!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    if(options) {
      const user = decode<{ permissions: Permissions[], roles: Roles[] }>(token)
      const { permissions, roles } = options 
      const userHasValidPermissions = validateUserPermissions({ user, permissions, roles })
      if(!userHasValidPermissions) return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    try {
      return fn(context)
    } catch (err) {
      if(err instanceof AuthTokenError) {
        destroyCookie(context, 'dashgo.token')
        destroyCookie(context, 'dashgo.refresh-token')
        return { 
          redirect: { 
            destination: '/', 
            permanent: false 
          } 
        }
      }
    }
  }
}