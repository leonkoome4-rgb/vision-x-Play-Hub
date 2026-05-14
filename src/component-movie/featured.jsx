import React from "react"
import "./movies.css"

const FeaturedCard = ({ movie, size = "small" }) => {
    if (!movie) return null

    const poster = movie.Poster !== "N/A"
        ? movie.Poster
        : `https://placehold.co/400x600/141416/ff4500?text=${encodeURIComponent(movie.Title)}`

    const heightClass = {
        large: "featured-card-large",
        medium: "featured-card-medium",
        small: "featured-card-small"
    }[size]

    return (
        <div className={`featured-card ${heightClass}`}>
            <img
                src={poster}
                alt={movie.Title}
                className="featured-card-img"
            />
            <div className="featured-card-overlay">
                <span className="featured-type">
                    {movie.Type}
                </span>
                <h3 className={`featured-title-${size}`}>
                    {movie.Title}
                </h3>
                <span className="featured-year">{movie.Year}</span>

                {size === "large" && (
                    <button className="featured-watch-btn">
                        ▶ Watch Now
                    </button>
                )}
            </div>
        </div>
    )
}

export const Featured = ({ fetchedData }) => {
    const movies = fetchedData?.Search || []
    const large = movies[0]
    const medium = movies.slice(1, 3)
    const small = movies.slice(3, 7)

    if (!large) return null

    return (
        <section className="featured-section">
            {/* Header */}
            <div className="featured-header">
                <div className="featured-title-section">
                    <div className="featured-accent-bar" />
                    <h2 className="featured-title">FEATURED PICKS</h2>
                    <span className="featured-badge">
                        ✦ Editor's Choice
                    </span>
                </div>
                <button className="featured-see-all">
                    See All →
                </button>
            </div>

            {/* Top row */}
            <div className="featured-top-row">
                <FeaturedCard movie={large} size="large" />
                <div className="featured-medium-grid">
                    {medium.map((m, i) => (
                        <FeaturedCard key={m?.imdbID || i} movie={m} size="medium" />
                    ))}
                </div>
            </div>

            {/* Bottom row */}
            {small.length > 0 && (
                <div className="featured-bottom-row">
                    {small.map((m, i) => (
                        <FeaturedCard key={m?.imdbID || i} movie={m} size="small" />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Featured
