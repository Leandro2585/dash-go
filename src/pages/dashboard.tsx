import dynamic from 'next/dynamic'
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'

import { Header } from '@components/header'
import { SideBar } from '@components/side-bar'
import { withSSRAuth } from '@lib/global'
import { charData, chartOptions } from '@constants/apex-charts'
import { setupExternalAPIClient } from '@services/api'
import { useCan } from '@hooks/global'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Dashboard() {
  const userCanSeeMetrics = useCan({ permissions: ['metrics.list'] })
  return (
    <Flex direction='column' h='100vh'>
      <Header/>
      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar/>
        {userCanSeeMetrics && (
          <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignContent='flex-start'>
            <Box p={['6','8']} bg='gray.800' borderRadius={8} pb='4'>
              <Text fontSize='lg' mb='4'>Inscritos da semana</Text>
              <Chart type='area' series={charData} options={chartOptions} height={160} />
            </Box>
            <Box p={['6','8']} bg='gray.800' pb='4' borderRadius={8}>
              <Text fontSize='lg' mb='4'>Taxa de abertura</Text>
              <Chart type='area' series={charData} options={chartOptions} height={160} />
            </Box>
          </SimpleGrid>
        )}
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = withSSRAuth(async (context) => {
  const externalApiClient = setupExternalAPIClient(context)
  const response = await externalApiClient.get('/me')
  return {
    props: {}
  }
})