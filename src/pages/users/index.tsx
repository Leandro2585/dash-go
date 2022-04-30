import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Pagination } from '@components/pagination'
import { SideBar } from '@components/side-bar'
import { Header } from '@components/header'

export default function UserList() {
  return (
    <Box>
      <Header/>
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar/>
        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>Usuários</Heading>
            <Button as='a' size='sm' fontSize='sm' colorScheme='pink' leftIcon={<Icon as={RiAddLine} fontSize='20'/>}>Criar novo</Button>
          </Flex>

          <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px='6' color='gray.300' w='8'>
                  <Checkbox colorScheme='pink'/>
                </Th>
                <Th>Usuário</Th>
                <Th>Data de cadastro</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px='6'>
                  <Checkbox colorScheme='pink'/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight='bold'>Leandro Real</Text>
                    <Text fontSize='sm' color='gray.300'>leo.real2585@gmail.com</Text>
                  </Box>
                </Td>
                <Td>20 de Abril, 2022</Td>
                <Td>
                  <Button as='a' size='sm' fontSize='sm' colorScheme='purple' leftIcon={<Icon as={RiPencilLine} fontSize='16'/>}>Editar</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination/>
        </Box>
      </Flex>
    </Box>
  )
}