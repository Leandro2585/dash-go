import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

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
    return fn(context)
  }
}