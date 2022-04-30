import { cloneElement, ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface Props extends LinkProps {
  shouldMatchExactHref?: boolean
  children: ReactElement
}

export const ActiveLink = ({ children, shouldMatchExactHref = false,...rest }: Props) => {
  let isActive = false
  const { asPath } = useRouter()
  if(shouldMatchExactHref && asPath === rest.href || asPath === rest.as) isActive = true
  if(!shouldMatchExactHref && 
    (asPath.startsWith(String(rest.href))) ||
    (asPath.startsWith(String(rest.as)))
  ) isActive = true
  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}