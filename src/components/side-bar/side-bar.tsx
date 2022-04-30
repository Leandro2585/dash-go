import { SideBarNav } from '@components/side-bar'
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from '@chakra-ui/react'

export const SideBar = () => {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if(isDrawerSidebar) {
    return (
      <Drawer isOpen={true} placement='left' onClose={() => {}}>
        <DrawerOverlay>
          <DrawerContent bg='gray.800' p='4'>
            <DrawerCloseButton mt='6'/>
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <SideBarNav/>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  return (
    <Box as='aside' w='64' mr='8'>
      <SideBarNav/>
    </Box>
  )
}