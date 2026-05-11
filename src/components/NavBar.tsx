import { HStack, Image, Button, Box } from '@chakra-ui/react'
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
  currentPage: 'home' | 'games' | 'movies' | 'about';
  onPageChange: (page: 'home' | 'games' | 'movies' | 'about') => void;
}

const NavBar = ({ onSearch, currentPage, onPageChange }: Props) => {
  const navItems = [
    { label: 'Home', page: 'home' as const },
    { label: 'Games', page: 'games' as const },
    { label: 'Movies', page: 'movies' as const },
    { label: 'About', page: 'about' as const }
  ];

  return (
    <Box>
      <HStack padding='10px'>
        <Image src={logo} boxSize='60px' />
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
      <HStack padding='10px' spacing={4} borderTop='1px' borderColor='gray.200'>
        {navItems.map((item) => (
          <Button
            key={item.page}
            onClick={() => onPageChange(item.page)}
            variant={currentPage === item.page ? 'solid' : 'ghost'}
            colorScheme={currentPage === item.page ? 'blue' : 'gray'}
          >
            {item.label}
          </Button>
        ))}
      </HStack>
    </Box>
  )
}

export default NavBar