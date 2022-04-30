import { useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { Flex, Icon, Input } from '@chakra-ui/react'

export const SearchBox = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return(
    <Flex 
      as='label'
      py='4'
      px='8'
      ml='6'
      bg='gray.800'
      flex='1'
      maxW={400}
      color='gray.200'
      position='relative'
      alignSelf='center'
      borderRadius='full'
    >
      <Input 
        px='4'
        mr='4'
        color='gray.50'
        variant='unstyled'
        placeholder='Buscar na plataforma'
        _placeholder={{ color: 'gray.400'}}
        ref={searchInputRef}
      />
      <Icon as={RiSearchLine} alignSelf='center'/>
    </Flex>
  )
}