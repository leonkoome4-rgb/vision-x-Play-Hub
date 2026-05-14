import { useState } from "react"

export const SearchBar = ({ searchedMovie, setSearchedMovie, setQuery, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchedMovie.trim()) {
      setQuery(searchedMovie.trim())
      onClose?.()
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search movies, series, episodes..."
            value={searchedMovie}
            onChange={e => setSearchedMovie(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </div>
        <p className="search-caption">Press Enter or click Search — powered by TMDB API</p>
      </form>
    </div>
  )
}

export default SearchBar
