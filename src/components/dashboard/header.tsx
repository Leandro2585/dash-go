import { RiSearchLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { Flex, Icon, Input, HStack, Text, Box, Avatar } from '@chakra-ui/react';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <Flex as='header' w='100%' maxW={1480} h='20' mx='auto' mt='4' px='6' align='center'>
      <Text fontSize='3xl' fontWeight='bold' letterSpacing='tight' w='64'>
        dashgo
        <Text ml='1' as='span' color='pink.500'>.</Text>
      </Text>
      <Flex as='label' flex='1' py='4' px='8' ml='6' maxW={400} alignSelf='center' color='gray.200' position='relative' bg='gray.800' borderRadius='full'>
        <Input color='gray.50' variant='unstyled' px='4' mr='4' placeholder='Buscar na plataforma' _placeholder={{ color: 'gray.400'}}/>
        <Icon as={RiSearchLine} alignSelf='center'/>
      </Flex>
      <Flex align='center' ml='auto'>
        <HStack spacing='4' mx='8' pr='8' py='1' color='gray.300' borderRightWidth={1} borderColor='gray.700'>
          <Icon as={RiNotificationLine} fontSize='20'/>
          <Icon as={RiUserAddLine} fontSize='20'/>
        </HStack>
        <Flex align='center'>
          <Box mr='4' textAlign='right'>
            <Text>Leandro Real</Text>
            <Text color='gray.300' fontSize='small'>leo.real2585@gmail.com</Text>
          </Box>
          <Avatar size='md' name='Leandro Real' src='https://github.com/leandro2585.png'/>
        </Flex>
      </Flex>
    </Flex>
  )
}