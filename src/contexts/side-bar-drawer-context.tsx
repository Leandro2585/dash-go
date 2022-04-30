import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect } from 'react';

type SideBarDrawerContextData = UseDisclosureReturn

const SideBarDrawerContext = createContext({} as SideBarDrawerContextData)

type Props = {
  children: ReactNode
}


export const SideBarDrawerProvider = ({ children }: Props) => {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath, disclosure])

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      {children}
    </SideBarDrawerContext.Provider>
  )
}

export const useSideBarDrawer = () => useContext(SideBarDrawerContext)