import { useState } from "react"
import "./movies.css"

const GENRES = ["All", "Movie", "Series", "Episode"]

export const FilteredSection = ({ fetchedData }) => {
  const [activeFilter, setActiveFilter] = useState("All")
  const movies = fetchedData?.Search || []

  const filtered = activeFilter === "All"
    ? movies
    : movies.filter(m => m.Type?.toLowerCase() === activeFilter.toLowerCase())

  if (movies.length === 0) return null

  return (
    <section className="px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-red-600 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Browse All</h2>
        </div>
        <span className="text-sm text-gray-400 font-mono">
          {filtered.length} titles
        </span>
      </div>

      <div className="flex gap-3 flex-wrap mb-8 justify-center md:justify-start">
        {GENRES.map(g => (
          <button
            key={g}
            onClick={() => setActiveFilter(g)}
            className={`px-4 py-2 rounded-full border font-medium text-sm transition-all
                ${activeFilter === g
                  ? "bg-red-600 border-red-600 text-white shadow-lg"
                  : "bg-transparent border-gray-600 text-gray-300 hover:border-red-400 hover:text-white"
                }`}
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="moviegrid">
          {filtered.map(movie => {
            const poster = movie.Poster !== "N/A"
              ? movie.Poster
              : "https://placehold.co/300x450/1c1c20/ff4500?text=No+Poster"
            return (
              <div key={movie.imdbID}>
                <img src={poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                <p className="text-sm text-gray-400">{movie.Year}</p>
                <span className="inline-block mt-2 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full uppercase tracking-wide">
                  {movie.Type}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 font-mono text-sm tracking-wider uppercase">
          No {activeFilter.toLowerCase()} titles found
        </div>
      )}
    </section>
  )
}

export default FilteredSection
