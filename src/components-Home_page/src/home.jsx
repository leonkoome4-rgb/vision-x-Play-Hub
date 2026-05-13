import React, { useState, useEffect, useRef } from "react";
import "./home.css";

function HomePage() {
  const [continueItem, setContinueItem] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const contentRef = useRef(null);

  const [signInVisible, setSignInVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signInError, setSignInError] = useState("");

  // Movies with stable image URLs
  const movies = [
    {
      id: 1,
      title: "Monarch: Legacy of Monsters",
      poster: "https://resizing.flixster.com/gTFpO2xFfJTp5wZ0Y2FUU7Belto=/206x305/v2/https://resizing.flixster.com/H6wBhllnWLqgz1qrdKmQAE6635w=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvYTVhZWFiNGEtOTUxZC00MWE3LWFjNjUtMmE2ZjdiNmY2N2M0LnBuZw==",
      genre: "Sci-Fi"
    },
    {
      id: 2,
      title: "Back in Action",
      poster: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Back_in_Action_poster.jpg/250px-Back_in_Action_poster.jpg",
      genre: "Action"
    },
    {
      id: 3,
      title: "Kevin Hart's Guide to Black History",
      poster: "https://resizing.flixster.com/xDJ3R7jehOUEX543YnCS9ITLL70=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQxYzZkM2E3LWEwMWYtNDY2Zi1iNTc2LWU4MTYxMWFhZGQ5NC5qcGc=",
      genre: "Comedy"
    },
    {
      id: 4,
      title: "Xo Kitty",
      poster: "https://m.economictimes.com/thumb/height-450,width-600,imgsize-92886,msid-129980274/xo-kitty-season-4-will-kitty-song-covey-and-min-ho-return-heres-how-season-3-sets-the-stage-for-a-comeback-spoilers.jpg",
      genre: "Romantic Comedy"
    },
    {
      id: 5,
      title: "Superman: Legacy",
      poster: "https://brignews.com/wp-content/uploads/2025/07/Poster.jpg",
      genre: "Superhero"
    },
    {
      id: 6,
      title: "Brigerton",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-e03ET6qbV4mqqlcdXgX_lDIcVdhcpvSjg&s",
      genre: "Period Drama"
    },
    {
      id: 7,
      title: "Emily in Paris",
      poster: "https://m.media-amazon.com/images/M/MV5BMWNiNmUyNDgtY2E2MC00ZDc2LTlkZWMtNWI0MjQxMjUxY2QwXkEyXkFqcGc@._V1_.jpg",
      genre: "Romantic Comedy"
    },
    {
        id: 8,
        title: "Brooklyn Nine-Nine",
        poster: "https://m.media-amazon.com/images/M/MV5BZTU3MWIwNWMtYTI1Yy00MzdmLTgyYzktZDM3NWNiMTkxNDVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        genre: "Comedy"

    },
        {
        id: 9,
        title: "Michael",
        poster: "https://upload.wikimedia.org/wikipedia/en/3/37/Michael_%282026_film_poster%29.png",
        genre: "Comedy"
    },
        {
        id: 10,
        title: "Stranger Things",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzT0KCj3xFEEmbs8fS7andoLlj_eX8Yv3zA&s",
        genre: "Sci-Fi / Horror"
    }

  ];

  // Games with stable image URLs
  const games = [
    {
      id: 1,
      title: "The Witcher 3",
      cover: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
      genre: "RPG"
    },
    {
      id: 2,
      title: "Cyberpunk 2077",
      cover: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
      genre: "Action RPG"
    },
    {
      id: 3,
      title: "Minecraft",
      cover: "https://cdn.mobygames.com/covers/3741959-minecraft-windows-apps-front-cover.jpg",
      genre: "Sandbox"
    },
    {
      id: 4,
      title: "Grand Theft Auto V",
      cover: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
      genre: "Action-Adventure"
    },
    {
      id: 5,
      title: "Roblox",
      cover: "https://i.ebayimg.com/images/g/CtEAAOSwUwxjPNcw/s-l1200.jpg",
      genre: "Sandbox / Online"
    },
    {
        id: 5,
      title: "Fifa 26",
      cover: "https://s.yimg.com/ny/api/res/1.2/pcba7Yb4YEb0_QJUmp0t2w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTUzODtjZj13ZWJw/https://media.zenfs.com/en/onefootball_articles_802/e4914cc871d0d0b0a1d1afaa81252084",
      genre: "football (soccer) simulation."
    },
    {
        id: 6,
      title: "Call of Duty: Modern Warfare",
      cover: "https://upload.wikimedia.org/wikipedia/en/8/87/Call_of_Duty_Infinite_Warfare_cover.jpg",
      genre: "First-person shooter"
    },
    {
        id: 7,
      title: "Konami eFootball 2026",
      cover: "https://efootballchampionship.konami.net/media/club-exclusive/2026_efootball_championship.jpg",
      genre: "football (soccer) simulation."
    },
    {
        id: 8,
      title: "NBA 2K26",
      cover: "https://a.espncdn.com/photo/2026/0412/nba_playoffs_mega_preview_cr_16x9.jpg",
      genre: "Basketball Simulation"
    },
    {
        id: 9,
      title: "PUBG: Battlegrounds",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscWkDDGgFcX6UFRppMzYA4VGlyh_f2FFOlQ&s",
      genre: "Battle Royale"
    },
    {
        id: 10,
      title: "Fortnite",
      cover: "https://m.media-amazon.com/images/I/91jydvF8TzL._AC_UF894,1000_QL80_.jpg",
      genre: "Battle Royale"
    }
  ];

  useEffect(() => {
    const savedItem = localStorage.getItem("continueItem");
    const savedSignedIn = localStorage.getItem("signedIn") === "true";
    const savedUsername = localStorage.getItem("username");

    if (savedItem) {
      setContinueItem(JSON.parse(savedItem));
    }
    if (savedSignedIn && savedUsername) {
      setSignedIn(true);
      setUsername(savedUsername);
    }
  }, []);

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

    const derivedName = credentials.email.split("@")[0];
    setSignedIn(true);
    setUsername(derivedName);
    setSignInVisible(false);
    setSignInError("");
    localStorage.setItem("signedIn", "true");
    localStorage.setItem("username", derivedName);
    setCredentials({ email: "", password: "" });
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setUsername("");
    localStorage.removeItem("signedIn");
    localStorage.removeItem("username");
  };

  const filteredMovies = movies;
  const filteredGames = games;

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="overlay">
          <h1>Vision X Play Hub</h1>
          <p className="typewriter">Stream movies. Play games. All in one universe.</p>
          <div className="cta-buttons">
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
      </header>

      {signInVisible && (
        <section className="signin-section">
          <div className="signin-card">
            <h2>Sign In</h2>
            <form onSubmit={handleSignInSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={credentials.email}
                  onChange={handleSignInChange("email")}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={credentials.password}
                  onChange={handleSignInChange("password")}
                  required
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
        </section>
      )}

      {signedIn && (
        <section className="welcome-hero">
          <p>Welcome back, {username} 👋</p>
        </section>
      )}

      {/* Continue Watching/Playing */}
      {continueItem && (
        <section className="continue-section">
          <h2>Continue {continueItem.cover ? "Playing" : "Watching"}</h2>
          <div className="continue-card">
            <img 
              src={continueItem.poster || continueItem.cover} 
              alt={continueItem.title} 
              style={{ width: "200px", height: "300px", objectFit: "cover" }}
            />
            <h3>{continueItem.title}</h3>
            <p>{continueItem.genre}</p>
          </div>
        </section>
      )}

      {/* Movies Section */}
      <main className="content" ref={contentRef}>
        <section className="carousel-section">
          <h2>🎬 Movies</h2>
          <div className="carousel">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="carousel-card"
                onClick={() => handleContinue({ ...movie, type: "movie" })}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  style={{ width: "150px", height: "225px", objectFit: "cover" }}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section className="carousel-section">
          <h2>🎮 Games</h2>
          <div className="carousel">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="carousel-card"
                onClick={() => handleContinue({ ...game, type: "game" })}
              >
                <img 
                  src={game.cover} 
                  alt={game.title} 
                  style={{ width: "150px", height: "225px", objectFit: "cover" }}
                />
                <h3>{game.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Vision X Play Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
