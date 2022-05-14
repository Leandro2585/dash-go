import { Box, Button, Link, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { useState } from 'react'
import NextLink from 'next/link'

import { loadUsers, useLoadUsers } from '@hooks/load-users'
import { queryClient } from '@services/react-query'
import { Pagination } from '@components/pagination'
import { SideBar } from '@components/side-bar'
import { Header } from '@components/header'
import { api } from '@services/api'
import { GetServerSideProps } from 'next'

export default function UserList({ users }) {
  const [page, setPage] = useState(1)
  
  const { isLoading, isFetching, error, data } = useLoadUsers({ page }, { initialData: users })
  const isWideVersion = useBreakpointValue({ base: false, lg: true })

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data
    }, { staleTime: 1000 * 60 * 10 })
  }
  return (
    <Box>
      <Header/>
      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar/>
        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4'/> }
            </Heading>
            <NextLink href='/users/create' passHref>
              <Button 
                as='a' 
                size='sm' 
                fontSize='sm' 
                colorScheme='pink' 
                leftIcon={<Icon as={RiAddLine} fontSize='20'/>}>
                Criar novo
              </Button>
            </NextLink>
          </Flex>          
          {isLoading ? (
            <Flex justify='center'>
              <Spinner/>
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
            <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px={['4', '4', '6']} color='gray.300' w='8'>
                  <Checkbox colorScheme='pink'/>
                </Th>
                <Th>Usuário</Th>
                { isWideVersion && <><Th>Data de cadastro</Th><Th/></> }
              </Tr>
            </Thead>
            <Tbody>
              {data.users.map(user => {
                return (
                  <Tr key={user.id}>
                    <Td px={['4', '4', '6']}>
                      <Checkbox colorScheme='pink'/>
                    </Td>
                    <Td>
                      <Box>
                        <Link 
                          color='purple.400' 
                          onMouseEnter={() => handlePrefetchUser(user.id)}
                        >
                          <Text fontWeight='bold'>{user.name}</Text>
                        </Link>
                        <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                      </Box>
                    </Td>
                    { isWideVersion && (
                      <>
                        <Td>{user.createdAt}</Td>
                        <Td>
                          <Button 
                            as='a' 
                            size='sm' 
                            fontSize='sm' 
                            colorScheme='purple' 
                            leftIcon={<Icon as={RiPencilLine} fontSize='16'/>}>
                            Editar
                          </Button>
                        </Td>
                      </>
                    )}
                  </Tr>
                )
              })}
            </Tbody>
            </Table>
            <Pagination totalCount={data.totalCount} currentPage={page} onPageChange={setPage}/>
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await loadUsers({ page: 1 })
  return {
    props: {
      users,
    }
  }
}