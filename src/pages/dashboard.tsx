import dynamic from 'next/dynamic'
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { Header } from '@components/header'
import { SideBar } from '@components/side-bar'
import { charData, chartOptions } from 'src/constants/apex-charts'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth-context'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header/>
      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar/>
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
      </Flex>
    </Flex>
  )
}