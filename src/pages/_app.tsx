import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { SideBarDrawerProvider } from '@contexts/global'
import { theme } from '@styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SideBarDrawerProvider>
        <Component {...pageProps} />
      </SideBarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp
