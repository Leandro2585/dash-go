import { theme } from '@styles/theme'
import { ApexOptions } from 'apexcharts'

export const chartOptions: ApexOptions = {
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

export const charData = [
  { name: 'series1', data: [31,120, 10, 20, 11, 18, 109]}
]