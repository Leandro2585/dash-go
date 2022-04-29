import { Icon, Text, Link, LinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'

interface Props extends LinkProps {
  icon: ElementType
  children: string
}

export const NavLink = ({ icon, children, ...rest }: Props) => {
  return (
    <Link display='flex' alignItems='center' {...rest}>
      <Icon as={icon} fontSize='20'/>
      <Text ml='4' fontWeight='medium'>{children}</Text>
    </Link>
  )
}