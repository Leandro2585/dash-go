import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export const Profile = () => {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Leandro Real</Text>
        <Text color='gray.300' fontSize='small'>leo.real2585@gmail.com</Text>
      </Box>
      <Avatar size='md' name='Leandro Real' src='https://github.com/leandro2585.png'/>
    </Flex>
  )
}