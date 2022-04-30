import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '@components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInFormSchema } from 'src/validators'

type SignInFormData = {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  
  const handleSignIn: SubmitHandler<SignInFormData> = (values, event) => {
    event.preventDefault()
  }
  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex
        w='100%'
        p='8'
        as='form'
        bg='gray.800'
        maxW={360}
        flexDir='column'
        borderRadius={8}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input 
            name='email' 
            type='email' 
            label='E-mail'
            error={formState.errors.email}
            {...register('email', { required: 'E-mail obrigatório' })}
          />
          <Input 
            name='password' 
            type='password' 
            label='Senha' 
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>
        <Button 
          mt='6' 
          size='lg' 
          type='submit' 
          isLoading={formState.isSubmitting}
          colorScheme='pink' 
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
