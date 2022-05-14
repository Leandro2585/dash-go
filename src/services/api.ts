import { signOut } from '@contexts/auth-context'
import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

let isRefreshing = false
let failedRequestQueue = []

export const setupExternalAPIClient = (context = undefined) => {
  let cookies = parseCookies(context)
  const externalApi = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['dashgo.token']}`
    }
  })

  externalApi.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response.status === 401) {
      const { code } = error.response.data as { code: string }

      if(code && code === 'token.expired') {
        cookies = parseCookies(context)
        const { 'dashgo.refreshToken': refreshToken } = cookies
        const requestOriginalConfig = error.config

        if(!isRefreshing) {
          isRefreshing = true
          
          externalApi.post('/refresh', { refreshToken })
            .then(response => {
              const { token } = response.data
              setCookie(context, 'dashgo.token', token, { maxAge: 60 * 60 * 24 * 30, path: '/' })
              setCookie(context, 'dashgo.refresh-token', response.data.refreshToken, { maxAge: 60 * 60 * 24 * 30, path: '/' })
              api.defaults.headers['Authorization'] = `Bearer ${token}`
              failedRequestQueue.forEach(request => request.onSuccess(token))
              failedRequestQueue.splice(0, failedRequestQueue.length)
            })
            .catch(err => {
              failedRequestQueue.forEach(request => request.onFailure(err))
              failedRequestQueue.splice(0, failedRequestQueue.length)
              if(typeof window !== 'undefined') {
                signOut()
              }
            })
            .finally(() => isRefreshing = false)
        }
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              requestOriginalConfig.headers['Authorization'] = `Bearer ${token}`
              resolve(externalApi(requestOriginalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        signOut()
      }
    }
    return Promise.reject(error)
  })
  return externalApi
}