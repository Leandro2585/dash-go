import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'

import { SideBarDrawerProvider, AuthContextProvider } from '@contexts/global'
import { queryClient, makeHttpServer } from '@services/global'
import { theme } from '@styles/theme'

if(process.env.NODE_ENV === 'development') makeHttpServer()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default MyApp
