import dynamic from 'next/dynamic'
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { Header } from '@components/header'
import { ApexOptions } from 'apexcharts'
import { SideBar } from '@components/side-bar'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-04-28T00:00:00.000Z',
      '2022-04-29T00:00:00.000Z',
      '2022-04-30T00:00:00.000Z',
      '2022-05-01T00:00:00.000Z',
      '2022-05-02T00:00:00.000Z',
      '2022-05-03T00:00:00.000Z',
      '2022-05-04T00:00:00.000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}

const series = [
  { name: 'series1', data: [31,120, 10, 20, 11, 18, 109]}
]

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header/>
      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar/>
        <SimpleGrid flex='1' gap='4' minChildWidth='320px' alignContent='flex-start'>
          <Box p={['6','8']} bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg' mb='4'>Inscritos da semana</Text>
            <Chart type='area' series={series} options={options} height={160} />
          </Box>
          <Box p={['6','8']} bg='gray.800' pb='4' borderRadius={8}>
            <Text fontSize='lg' mb='4'>Taxa de abertura</Text>
            <Chart type='area' series={series} options={options} height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}