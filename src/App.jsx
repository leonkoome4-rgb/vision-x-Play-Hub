import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GameGrid from "./components-game-section/GameGrid";
import GameHeading from "./components-game-section/GameHeading";
import GenreList from "./components-game-section/GenreList";
import NavBar from "./components-game-section/NavBar";
import PlatformSelector from "./components-game-section/PlatformSelector";
import SortSelector from "./components-game-section/SortSelector";
import HomePage from "./component-home/Home";
import About from "./component-about/About";
import { Movies } from "./component-movie";
import * as favService from "./services/favorites";
function App() {
  const [gameQuery, setGameQuery] = useState({
    genre: null,
    platform: null,
    sortOrder: '',
    searchText: ''
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // when username changes and is set, try load favorites
    if (!username) return
    let mounted = true
    favService.loadFavorites(username).then(list => {
      if (mounted) setFavorites(list || [])
    }).catch(()=>{})
    return () => { mounted = false }
  }, [username])

  const handleSignIn = async (email) => {
    const derivedName = email.split("@")[0]
    setSignedIn(true)
    setUsername(derivedName)
    // loadFavorites will run via effect
  }

  const handleSignOut = () => {
    setSignedIn(false)
    setUsername("")
    setFavorites([])
  }

  const handleToggleFavorite = async (item) => {
    if (!signedIn) return null
    const exists = favorites.some(f => f.id === item.id && f.type === item.type)
    let updated = []
    if (exists) {
      updated = await favService.deleteFavorite(username, item)
    } else {
      updated = await favService.createFavorite(username, item)
    }
    setFavorites(updated)
    return updated
  }
  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg: currentPage === 'games' ? `"nav nav" "aside main"` : `"nav" "main"`
  }} templateColumns={{
    base: '1fr',
    lg: currentPage === 'games' ? '220px 1fr' : '1fr'
  }}>
      <GridItem area="nav">
        <NavBar onSearch={searchText => setGameQuery({
        ...gameQuery,
        searchText
      })} currentPage={currentPage} onPageChange={setCurrentPage} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={3}>
          {currentPage === 'games' && <GenreList selectedGenre={gameQuery.genre} onSelectGenre={genre => setGameQuery({
          ...gameQuery,
          genre
        })} />}
        </GridItem>
      </Show>
      <GridItem area="main">
        <div className="main-container">
        {currentPage === 'games' && <Box paddingLeft={0}>
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
        {currentPage === 'home' && <HomePage signedIn={signedIn} username={username} onSignIn={handleSignIn} onSignOut={handleSignOut} favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
        {currentPage === 'movies' && <Movies favorites={favorites} onToggleFavorite={handleToggleFavorite} signedIn={signedIn} username={username} />}
        {currentPage === 'about' && <About />}
        </div>
      </GridItem>
    </Grid>;
}
export default App;