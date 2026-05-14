import { useEffect, useState } from "react"
import "./movies.css"
import { Hero } from "./hero"
import { Featured } from "./featured"
import { FilteredSection } from "./filtered"
import SearchBar from "./SearchBar"
import TrailerModal from "./TrailerModal"

const key = import.meta.env.VITE_TMDB_KEY
const IMG_BASE = "https://image.tmdb.org/t/p/w500"

const formatMovies = (results) =>
  (results || []).map(item => ({
    imdbID: String(item.id),
    Title: item.title || item.name,
    Year: (item.release_date || item.first_air_date || "").slice(0, 4),
    Type: item.media_type === "tv" ? "series" : "movie",
    Poster: item.poster_path ? `${IMG_BASE}${item.poster_path}` : "N/A"
  }))

export const Movies = () => {
  const [fetchedData, setFetchedData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchedMovie, setSearchedMovie] = useState("")
  const [query, setQuery] = useState("")
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState("")
  const [trailerTitle, setTrailerTitle] = useState("")

  useEffect(() => {
    const fetchTrending = async () => {
      if (!key) {
        setError("Missing TMDB API key. Set VITE_TMDB_KEY in your environment.")
        return
      }
      setLoading(true)
      setError("")
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${key}`)
        const data = await response.json()
        setFetchedData({ Search: formatMovies(data.results || []) })
      } catch (e) {
        setError("Failed to fetch trending movies.")
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  useEffect(() => {
    // If no query, show trending (do nothing since trending already fetched on mount),
    // otherwise fetch search results from TMDB
    if (!query) return

    const fetchSearch = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        )
        const data = await response.json()
        setFetchedData({ Search: formatMovies(data.results || []) })
      } catch (e) {
        setError("Failed to search movies.")
      } finally {
        setLoading(false)
      }
    }

    fetchSearch()
  }, [query])

  const handleFetchTrailer = async (movie) => {
    if (!movie || !movie.imdbID) return
    if (!key) {
      setError("Missing TMDB API key. Set VITE_TMDB_KEY in your environment.")
      return
    }

    setLoading(true)
    setError("")
    try {
      const id = movie.imdbID
      const isTv = (movie.Type || '').toLowerCase() === 'series'
      const url = `https://api.themoviedb.org/3/${isTv ? 'tv' : 'movie'}/${id}/videos?api_key=${key}`
      const res = await fetch(url)
      const data = await res.json()
      const videos = data.results || []
      // Prefer YouTube Trailer, then any YouTube, then any
      let video = videos.find(v => v.site === 'YouTube' && /trailer/i.test(v.type))
      if (!video) video = videos.find(v => v.site === 'YouTube')
      if (!video) video = videos[0]

      if (video && video.key) {
        setTrailerKey(video.key)
        setTrailerTitle(movie.Title)
        setTrailerOpen(true)
      } else {
        setError('No trailer found for this title.')
      }
    } catch (e) {
      setError('Failed to fetch trailer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {loading ? (
        <div className="text-center py-16 font-mono text-[13px] tracking-[2px] uppercase text-dim">
          <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
          Loading trending...
        </div>
      ) : error ? (
        <div className="text-center py-16 font-mono text-[13px] tracking-[2px] uppercase text-accent">
          {error}
        </div>
      ) : (
        <div className="main-container">
          <SearchBar
            searchedMovie={searchedMovie}
            setSearchedMovie={setSearchedMovie}
            setQuery={setQuery}
          />
          <Hero fetchedData={fetchedData} onWatch={handleFetchTrailer} />
          <div className="h-px bg-white/7" />
          <Featured fetchedData={fetchedData} onWatch={handleFetchTrailer} />
          <div className="h-px bg-white/7" />
          <FilteredSection fetchedData={fetchedData} onWatch={handleFetchTrailer} />
          <TrailerModal open={trailerOpen} onClose={() => setTrailerOpen(false)} videoKey={trailerKey} title={trailerTitle} />
        </div>
      )}
    </div>
  )
}

export default Movies
