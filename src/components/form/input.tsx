import React from 'react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
}

export const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return(
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput id={name} name={name} {...rest} focusBorderColor='pink.500' bgColor='gray.900' variant='filled' _hover={{ bgColor: 'gray.900' }}/>
    </FormControl>
  )
}