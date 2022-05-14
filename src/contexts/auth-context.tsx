import { api, externalApi } from '@services/api'
import router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'

type Permissions = 'users.list' | 'users.create' | 'metrics.list'

type Roles = 'administrator' | 'editor'

type User = {
  email: string
  permissions: Permissions[],
  roles: Roles[]
}

export type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export const signOut = () => {
  destroyCookie(undefined, 'dashgo.token')
  destroyCookie(undefined, 'dashgo.refresh-token')
  router.push('/')
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'dashgo.token': token, 'dashgo.refresh-token': refreshToken } = parseCookies()
    if(token) externalApi.get('/me')
      .then(response => {
        const { email, permissions, roles } = response.data
        setUser({ email, permissions, roles })
      })
      .catch(() => {
        signOut()
      })
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await externalApi.post('sessions', { email, password })
      const { token, refreshToken, permissions, roles } = response.data
      setUser({ email, permissions, roles })
      setCookie(undefined, 'dashgo.token', token, { maxAge: 60 * 60 * 24 * 30, path: '/' })
      setCookie(undefined, 'dashgo.refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 30, path: '/' })
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      router.push('/dashboard')
    } catch (error){
      console.log(error)
    } 
  }, [])
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}