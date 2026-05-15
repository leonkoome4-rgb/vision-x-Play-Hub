import { useState, useRef, useEffect } from "react";
import "./Home.css";

function HomePage({ signedIn, username, onSignIn, onSignOut, favorites: propFavorites = [], onToggleFavorite }) {
  const [continueItem, setContinueItem] = useState(() => {
    if (typeof window === "undefined") return null;
    const savedItem = localStorage.getItem("continueItem");
    return savedItem ? JSON.parse(savedItem) : null;
  });
  const contentRef = useRef(null);

  const [signInVisible, setSignInVisible] = useState(false);
  const [usernameState, setUsernameState] = useState("");
  const [favorites, setFavorites] = useState(propFavorites || []);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signInError, setSignInError] = useState("");

  // Movies with stable image URLs
  const movies = [
    {
      id: 1,
      title: "Monarch: Legacy of Monsters",
      poster:
        "https://resizing.flixster.com/gTFpO2xFfJTp5wZ0Y2FUU7Belto=/206x305/v2/https://resizing.flixster.com/H6wBhllnWLqgz1qrdKmQAE6635w=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvYTVhZWFiNGEtOTUxZC00MWE3LWFjNjUtMmE2ZjdiNmY2N2M0LnBuZw==",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Back in Action",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Back_in_Action_poster.jpg/250px-Back_in_Action_poster.jpg",
      genre: "Action",
    },
    {
      id: 3,
      title: "Kevin Hart's Guide to Black History",
      poster:
        "https://resizing.flixster.com/xDJ3R7jehOUEX543YnCS9ITLL70=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQxYzZkM2E3LWEwMWYtNDY2Zi1iNTc2LWU4MTYxMWFhZGQ5NC5qcGc=",
      genre: "Comedy",
    },
    {
      id: 4,
      title: "Xo Kitty",
      poster:
        "https://m.economictimes.com/thumb/height-450,width-600,imgsize-92886,msid-129980274/xo-kitty-season-4-will-kitty-song-covey-and-min-ho-return-heres-how-season-3-sets-the-stage-for-a-comeback-spoilers.jpg",
      genre: "Romantic Comedy",
    },
    {
      id: 5,
      title: "Superman: Legacy",
      poster: "https://brignews.com/wp-content/uploads/2025/07/Poster.jpg",
      genre: "Superhero",
    },
    {
      id: 6,
      title: "Brigerton",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-e03ET6qbV4mqqlcdXgX_lDIcVdhcpvSjg&s",
      genre: "Period Drama",
    },
    {
      id: 7,
      title: "Emily in Paris",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMWNiNmUyNDgtY2E2MC00ZDc2LTlkZWMtNWI0MjQxMjUxY2QwXkEyXkFqcGc@._V1_.jpg",
      genre: "Romantic Comedy",
    },
    {
      id: 8,
      title: "Brooklyn Nine-Nine",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZTU3MWIwNWMtYTI1Yy00MzdmLTgyYzktZDM3NWNiMTkxNDVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      genre: "Comedy",
    },
    {
      id: 9,
      title: "Michael",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/3/37/Michael_%282026_film_poster%29.png",
      genre: "Comedy",
    },
    {
      id: 10,
      title: "Stranger Things",
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzT0KCj3xFEEmbs8fS7andoLlj_eX8Yv3zA&s",
      genre: "Sci-Fi / Horror",
    },
  ];

  // Games with stable image URLs
  const games = [
    {
      id: 1,
      title: "The Witcher 3",
      cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
      genre: "RPG",
    },
    {
      id: 2,
      title: "Cyberpunk 2077",
      cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
      genre: "Action RPG",
    },
    {
      id: 3,
      title: "Minecraft",
      cover:
        "https://cdn.mobygames.com/covers/3741959-minecraft-windows-apps-front-cover.jpg",
      genre: "Sandbox",
    },
    {
      id: 4,
      title: "Grand Theft Auto V",
      cover: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      genre: "Action-Adventure",
    },
    {
      id: 5,
      title: "Roblox",
      cover: "https://i.ebayimg.com/images/g/CtEAAOSwUwxjPNcw/s-l1200.jpg",
      genre: "Sandbox / Online",
    },
    {
      id: 6,
      title: "Fifa 26",
      cover:
        "https://s.yimg.com/ny/api/res/1.2/pcba7Yb4YEb0_QJUmp0t2w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTUzODtjZj13ZWJw/https://media.zenfs.com/en/onefootball_articles_802/e4914cc871d0d0b0a1d1afaa81252084",
      genre: "football (soccer) simulation.",
    },
    {
      id: 7,
      title: "Call of Duty: Modern Warfare",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/8/87/Call_of_Duty_Infinite_Warfare_cover.jpg",
      genre: "First-person shooter",
    },
    {
      id: 8,
      title: "Konami eFootball 2026",
      cover:
        "https://efootballchampionship.konami.net/media/club-exclusive/2026_efootball_championship.jpg",
      genre: "football (soccer) simulation.",
    },
    {
      id: 9,
      title: "NBA 2K26",
      cover: "https://a.espncdn.com/photo/2026/0412/nba_playoffs_mega_preview_cr_16x9.jpg",
      genre: "Basketball Simulation",
    },
    {
      id: 10,
      title: "PUBG: Battlegrounds",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscWkDDGgFcX6UFRppMzYA4VGlyh_f2FFOlQ&s",
      genre: "Battle Royale",
    },
  ];

  const handleContinue = (item) => {
    setContinueItem(item);
    localStorage.setItem("continueItem", JSON.stringify(item));
  };

  const handleExploreNow = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSignInOpen = () => {
    setSignInVisible(true);
    setSignInError("");
  };

  const handleSignInClose = () => {
    setSignInVisible(false);
    setSignInError("");
  };

  const handleSignInChange = (field) => (event) => {
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setSignInError("Please enter both email and password.");
      return;
    }

    // best-effort POST sign-in event, then inform parent (App) to set session and load favorites
    (async () => {
      try {
        await fetch("/dp.json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "signin", email: credentials.email })
        });
      } catch (e) {}

      const derivedName = credentials.email.split("@")[0];
      setUsernameState(derivedName);
      setSignInVisible(false);
      setSignInError("");
      setCredentials({ email: "", password: "" });
      onSignIn?.(credentials.email);
    })();
  };

  const handleSignOut = () => {
    onSignOut?.();
    setUsernameState("");
    setFavorites([]);
  };
  useEffect(() => {
    setFavorites(propFavorites || [])
  }, [propFavorites])

  const isFavorited = (item) => {
    return (favorites || []).some(f => f.id === item.id && f.type === item.type);
  }

  const handleToggleFavoriteLocal = async (item) => {
    if (!signedIn) {
      setSignInVisible(true);
      return;
    }
    // delegate to parent which manages persistence
    try {
      const updated = await onToggleFavorite?.(item)
      if (updated) setFavorites(updated)
    } catch (e) {}
  }

  const filteredMovies = movies;
  const filteredGames = games;

  // Sort movies and games alphabetically
  const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  const sortedGames = [...games].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="overlay">
          <div className="overlay-inner">
            <div className="hero-text">
              <h1>Vision X Play Hub</h1>
              <p className="subtitle">Your ultimate destination for movies and games</p>
              <p>Your streaming and gaming universe awaits</p>
              <div className="hero-ctas">
                <button className="btn primary" onClick={handleExploreNow}>
                  Explore Now
                </button>
                {!signedIn ? (
                  <button className="btn secondary" onClick={handleSignInOpen}>
                    Sign In
                  </button>
                ) : (
                  <button className="btn secondary" onClick={handleSignOut}>
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sign-in controlled inside content now (moved below) */}

      {signedIn && (
        <div className="main-container">
          <section className="welcome-hero">
            <p>Welcome back, {username} 👋</p>
          </section>
        </div>
      )}

      {signedIn && favorites.length > 0 && (
        <div className="main-container">
          <section className="section">
            <h2 className="section-header">⭐ Your Favorites</h2>
            <div className="grid-5">
              {favorites.map((fav, i) => (
                <div key={`${fav.type}-${fav.id}-${i}`} className="card">
                  <div onClick={() => handleContinue({ ...fav, type: fav.type })} style={{cursor:'pointer'}}>
                    <img className="thumb" src={fav.poster || fav.cover} alt={fav.title || fav.Title || fav.name} />
                    <div style={{padding: '0.5rem'}}>
                      <h3 className="card-title">{fav.title || fav.Title || fav.name}</h3>
                      <p className="genre-badge">{fav.genre || fav.Type || ''}</p>
                    </div>
                  </div>
                  <div style={{padding: '0.5rem'}}>
                    <button onClick={() => handleToggleFavoriteLocal(fav)} className="btn-ghost">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Movies Section (5 columns grid) */}
      <main className="content" ref={contentRef}>
        <div className="main-container">
          <section className="section">
            <h2 className="section-header movies-header">🎬 Movies</h2>
            <div className="grid-5">
              {sortedMovies.map((movie) => (
                <div key={movie.id} className="card" onClick={() => handleContinue({ ...movie, type: "movie" })}>
                  <img className="thumb" src={movie.poster} alt={movie.title} />
                  <div style={{padding: '0.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                    <div>
                      <h3 className="card-title">{movie.title}</h3>
                      <p className="genre-badge">{movie.genre}</p>
                    </div>
                    <div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleFavoriteLocal({ id: movie.id, title: movie.title, poster: movie.poster, genre: movie.genre, type: 'movie' }) }}
                        className="btn-ghost"
                        aria-label="Toggle favorite"
                      >
                        {isFavorited({ id: movie.id, type: 'movie' }) ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

              {/* Games Section (with internal search) */}
              <section className="carousel-section section--compact">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <h2 className="section-header games-header">🎮 Games</h2>
                </div>
                <div className="carousel">
                  {sortedGames.map((game) => (
                    <div key={game.id} className="carousel-card" onClick={() => handleContinue({ ...game, type: "game" })}>
                      <img className="thumb" src={game.cover} alt={game.title} />
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                        <div>
                          <h3 className="card-title">{game.title}</h3>
                          <p className="genre-badge">{game.genre}</p>
                        </div>
                        <div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleToggleFavoriteLocal({ id: game.id, title: game.title, cover: game.cover, genre: game.genre, type: 'game' }) }}
                            className="btn-ghost"
                            aria-label="Toggle favorite"
                          >
                            {isFavorited({ id: game.id, type: 'game' }) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
        </div>

              {/* sign-in modal */}
              {signInVisible && (
                <div className="signin-modal-overlay" onClick={handleSignInClose}>
                  <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
                    <h2>Sign In to Vision X</h2>
                    <form onSubmit={handleSignInSubmit}>
                      <label>
                        Email
                        <input
                          type="email"
                          value={credentials.email}
                          onChange={handleSignInChange("email")}
                          required
                          placeholder="Enter your email"
                        />
                      </label>
                      <label>
                        Password
                        <input
                          type="password"
                          value={credentials.password}
                          onChange={handleSignInChange("password")}
                          required
                          placeholder="Enter your password"
                        />
                      </label>
                      {signInError && <p className="error-text">{signInError}</p>}
                      <div className="signin-actions">
                        <button type="submit" className="btn primary">
                          Sign In
                        </button>
                        <button type="button" className="btn secondary" onClick={handleSignInClose}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Continue Watching/Playing (moved inside content to reduce gap) */}
              {continueItem && (
                <div className="main-container">
                  <section className="continue-section">
                    <h2>Continue {continueItem.cover ? "Playing" : "Watching"}</h2>
                    <div className="continue-card">
                      <img className="thumb" src={continueItem.poster || continueItem.cover} alt={continueItem.title} />
                      <div className="continue-meta">
                        <h3>{continueItem.title}</h3>
                        <p className="muted">{continueItem.genre}</p>
                      </div>
                    </div>
                  </section>
                </div>
              )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Vision X Play Hub. All rights reserved.</p>
        <p style={{marginTop: '0.25rem'}}>Meet The Vision X Team:</p>
        <ul style={{listStyle: 'none', padding: 0, margin: '.25rem 0', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <li><a href="mailto:korosoangela2@gmail.com" className="team-link">Angela</a></li>
          <li><a href="mailto:briankipchirchir964@gmail.com" className="team-link">Brian</a></li>
          <li><a href="mailto:jamesandaro0@gmail.com" className="team-link">James</a></li>
          <li><a href="mailto:leonkoome4@gmail.com" className="team-link">Leon</a></li>
          <li><a href="mailto:mwasbrayo73@gmail.com" className="team-link">Mungai</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default HomePage;
