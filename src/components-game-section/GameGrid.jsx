import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import useGames from "../hooks/useGames";
const GameGrid = ({
  gameQuery
}) => {
  const {
    data,
    error,
    isLoading
  } = useGames(gameQuery);
  if (error) return <Box padding={5}>Failed to load games.</Box>;
  if (isLoading) {
    return <SimpleGrid columns={{
      base: 1,
      md: 2,
      lg: 3
    }} spacing={6} alignItems="stretch">
        {Array.from({
        length: 6
      }).map((_, index) => <GameCardSkeleton key={index} />)}
      </SimpleGrid>;
  }
  const games = Array.isArray(data) ? data : data?.results || [];
  if (!games.length) {
    return <Box padding={5}>
        <Text>No games found.</Text>
      </Box>;
  }
  return <SimpleGrid columns={{
    base: 1,
    md: 2,
    lg: 3
  }} spacing={6} alignItems="stretch">
      {games.map(game => <GameCard key={game.id} game={game} />)}
    </SimpleGrid>;
};
export default GameGrid;