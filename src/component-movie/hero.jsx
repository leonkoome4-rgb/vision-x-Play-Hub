import React from "react"
import "./movies.css"

export const Hero = ({ fetchedData, onWatch }) => {
  const item = (fetchedData?.Search || [])[0]
  if (!item) return null

  const poster = item.Poster !== "N/A" ? item.Poster : null

  return (
    <section className="relative h-[60vh] w-full overflow-hidden flex items-end bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {poster && (
        <img src={poster} alt={item.Title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
      )}
      <div className="relative z-10 p-8 md:p-12 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{item.Title}</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6">{item.Year} • {item.Type}</p>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => onWatch?.(item)} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
              Watch Now
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-all backdrop-blur-sm">
              Add to List
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
