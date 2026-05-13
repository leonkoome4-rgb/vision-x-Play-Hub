import useData from "./useData";
const useGames = gameQuery => useData("/games", {
  params: {
    genres: gameQuery.genre?.id,
    platforms: gameQuery.platform?.id || "18,1,7",
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText,
    dates: "2019-09-01,2019-09-30"
  }
}, [gameQuery]);
export default useGames;