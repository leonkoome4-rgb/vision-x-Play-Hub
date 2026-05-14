import React from "react"

export const TrailerModal = ({ open, onClose, videoKey, title }) => {
  if (!open) return null

  const embedUrl = videoKey ? `https://www.youtube.com/embed/${videoKey}?autoplay=1` : null

  return (
    <div style={{position: 'fixed', inset:0, zIndex:1200, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.8)'}}>
      <div style={{position:'relative', width:'90%', maxWidth:900, aspectRatio:16/9, background:'#000', borderRadius:12, overflow:'hidden'}}>
        <button onClick={onClose} style={{position:'absolute', right:12, top:12, zIndex:10, background:'rgba(255,255,255,0.06)', border:'none', color:'#fff', padding:'8px 10px', borderRadius:8, cursor:'pointer'}}>Close ✕</button>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title || 'Trailer'}
            width="100%"
            height="100%"
            style={{border:0}}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#fff', padding:20}}>No trailer available.</div>
        )}
      </div>
    </div>
  )
}

export default TrailerModal
