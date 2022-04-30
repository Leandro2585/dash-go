import { Box, Button, Stack } from '@chakra-ui/react'
import { PageButton } from './page-button'

export const Pagination = () => {
  return(
    <Stack direction={['column', 'row']} mt='8' justify='space-between' align='center' spacing='6'>
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        <PageButton number={1} isCurrent={true}/>
        <PageButton number={2}/>
        <PageButton number={3}/>
        <PageButton number={4}/>
        <PageButton number={5}/>
      </Stack>
    </Stack>
  )
}