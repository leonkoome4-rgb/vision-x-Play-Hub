import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components-game-section/GameGrid";
import GameHeading from "./components-game-section/GameHeading";
import GenreList from "./components-game-section/GenreList";
import NavBar from "./components-game-section/NavBar";
import PlatformSelector from "./components-game-section/PlatformSelector";
import SortSelector from "./components-game-section/SortSelector";
function App() {
  const [gameQuery, setGameQuery] = useState({
    genre: null,
    platform: null,
    sortOrder: '',
    searchText: ''
  });
  const [currentPage, setCurrentPage] = useState('games');
  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg: `"nav nav" "aside main"`
  }} templateColumns={{
    base: '1fr',
    lg: '250px 1fr'
  }}>
      <GridItem area="nav">
        <NavBar onSearch={searchText => setGameQuery({
        ...gameQuery,
        searchText
      })} currentPage={currentPage} onPageChange={setCurrentPage} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          {currentPage === 'games' && <GenreList selectedGenre={gameQuery.genre} onSelectGenre={genre => setGameQuery({
          ...gameQuery,
          genre
        })} />}
        </GridItem>
      </Show>
      <GridItem area="main">
        {currentPage === 'games' && <Box paddingLeft={2}>
            <GameHeading gameQuery={gameQuery} />
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector selectedPlatform={gameQuery.platform} onSelectPlatform={platform => setGameQuery({
              ...gameQuery,
              platform
            })} />
              </Box>
              <SortSelector sortOrder={gameQuery.sortOrder} onSelectSortOrder={sortOrder => setGameQuery({
            ...gameQuery,
            sortOrder
          })} />
            </Flex>
            <GameGrid gameQuery={gameQuery} />
          </Box>}
        {currentPage === 'home' && <Box paddingLeft={2}>
            <Box as="h1" fontSize="3xl" fontWeight="bold" marginTop={10}>Welcome to Game Explorer</Box>
            <Box fontSize="lg" marginTop={4}>Browse and explore your favorite games!</Box>
          </Box>}
        {currentPage === 'movies' && <Box paddingLeft={2}>
            <Box as="h1" fontSize="3xl" fontWeight="bold" marginTop={10}>Movies</Box>
            <Box fontSize="lg" marginTop={4}>Movie section coming soon...</Box>
          </Box>}
        {currentPage === 'about' && <Box paddingLeft={2}>
            <Box as="h1" fontSize="3xl" fontWeight="bold" marginTop={10}>About</Box>
            <Box fontSize="lg" marginTop={4}>This is a game and movie explorer application built with React and Chakra UI.</Box>
          </Box>}
      </GridItem>
    </Grid>;
}
export default App;