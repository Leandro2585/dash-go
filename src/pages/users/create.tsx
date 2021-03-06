import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { createUserFormSchema } from '@validators/create-user-form-schema';
import { SideBar } from '@components/side-bar';
import { Header } from '@components/header';
import { Input } from '@components/form';
import { api } from '@services/api';
import { queryClient } from '@services/react-query';

type CreateUserFormSchema = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function CreateUser () {
  const router = useRouter()
  const createUser = useMutation(async (user: CreateUserFormSchema) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })
    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreateUser: SubmitHandler<CreateUserFormSchema> = async (values) => {
    await createUser.mutateAsync(values)
    router.push('/users')
  }
  return (
    <Box>
      <Header/>
      <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
        <SideBar/>
        <Box 
          p={['6','8']}
          as='form'
          bg='gray.800'
          flex='1'
          borderRadius={8}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>
          <Divider my='6' borderColor='gray.700'/>
          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
              <Input 
                name='name'
                type='text'
                label='Nome Completo'
                error={errors.name}
                {...register('name')}
              />
              <Input 
                name='email'
                type='email'
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%'>
              <Input 
                name='password'
                type='password'
                label='Senha'
                error={errors.password}
                {...register('password')}
              />
              <Input 
                name='password_confirmation'
                type='password'
                label='Confirmação da Senha'
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button type='submit' isLoading={isSubmitting} colorScheme='pink'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}