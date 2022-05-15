import { AuthTokenError } from '@errors/global'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from 'nookies'

export const withSSRAuth = <P>(fn: GetServerSideProps<P>) => {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)
    if(!cookies['dashgo.token']) {
      return {
        redirect: {
          destination: '/',
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