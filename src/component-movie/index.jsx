import { useEffect, useState } from "react"
import "./movies.css"
import { Hero } from "./hero"
import { Featured } from "./featured"
import { FilteredSection } from "./filtered"

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
          <Hero fetchedData={fetchedData} />
          <div className="h-px bg-white/7" />
          <Featured fetchedData={fetchedData} />
          <div className="h-px bg-white/7" />
          <FilteredSection fetchedData={fetchedData} />
        </div>
      )}
    </div>
  )
}

export default Movies
