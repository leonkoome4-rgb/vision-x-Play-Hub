import { HStack, Image, Button, Box } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';
const NavBar = ({
  onSearch,
  currentPage,
  onPageChange
}) => {
  const navItems = [{
    label: 'Home',
    page: 'home'
  }, {
    label: 'Games',
    page: 'games'
  }, {
    label: 'Movies',
    page: 'movies'
  }, {
    label: 'About',
    page: 'about'
  }];
  return <Box>
      <HStack padding='10px'>
        <Image src={logo} boxSize='60px' />
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
      <HStack padding='10px' spacing={4} borderTop='1px' borderColor='gray.200'>
        {navItems.map(item => <Button key={item.page} onClick={() => onPageChange(item.page)} variant={currentPage === item.page ? 'solid' : 'ghost'} colorScheme={currentPage === item.page ? 'blue' : 'gray'}>
            {item.label}
          </Button>)}
      </HStack>
    </Box>;
};
export default NavBar;