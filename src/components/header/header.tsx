import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { Logo, NotificationsNav, Profile, SearchBox } from '@components/header'
import { useSideBarDrawer } from '@contexts/global'
import { RiMenuLine } from 'react-icons/ri'

export const Header = () => {
  const { onOpen } = useSideBarDrawer()
  const isWideVersion = useBreakpointValue({ base: false, lg: true })
  return (
    <Flex as='header' w='100%' maxW={1480} h='20' mx='auto' mt='4' px='6' align='center'>
      { !isWideVersion && (
        <IconButton 
          icon={<Icon as={RiMenuLine}/>} 
          onClick={onOpen} 
          variant='unstyled' 
          fontSize='24' 
          aria-label='Open navigation'
          mr='2'
        />
      )}
      <Logo/>
      { isWideVersion && <SearchBox/> }
      <Flex align='center' ml='auto'>
        <NotificationsNav/>
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  )
}