import Link from 'next/link'
import { ElementType } from 'react'
import { Icon, Text, Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { ActiveLink } from '@components/side-bar'

interface Props extends LinkProps {
  icon: ElementType
  href: string
  children: string
}

export const NavLink = ({ icon, children, href, ...rest }: Props) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display='flex' alignItems='center' {...rest}>
        <Icon as={icon} fontSize='20'/>
        <Text ml='4' fontWeight='medium'>{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}