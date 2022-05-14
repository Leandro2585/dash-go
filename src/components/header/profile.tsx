import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { AuthContext } from '@contexts/auth-context'
import { useContext } from 'react'

type Props = {
  showProfileData?: boolean 
}

export const Profile = ({ showProfileData }: Props) => {
  const { user } = useContext(AuthContext)

  return (
    <Flex align='center'>
      { showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Leandro Real</Text>
          <Text color='gray.300' fontSize='small'>{user?.email}</Text>
        </Box>
      )}
      <Avatar size='md' name='Leandro Real' src='https://github.com/leandro2585.png'/>
    </Flex>
  )
}