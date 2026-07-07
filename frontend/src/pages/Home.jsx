import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Home({ wishlist, toggleWishlist, playMusicTrack, showToast }) {
  const location = useLocation();

  // API Data states
  const [moviesList, setMoviesList] = useState([]);
  const [gamingList, setGamingList] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [sportsList, setSportsList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  // Modal State
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Carousel Refs for smooth horizontal scrolling
  const moviesScrollRef = useRef(null);
  const gamingScrollRef = useRef(null);
  const musicScrollRef = useRef(null);
  const sportsScrollRef = useRef(null);

  const scrollCarousel = (ref, amount) => {
    if (ref.current) {
      ref.current.scroll({
        left: ref.current.scrollLeft + amount,
        behavior: 'smooth'
      });
    }
  };

  // Load API Data
  useEffect(() => {
    fetch('/api/movies').then(res => res.json()).then(data => setMoviesList(data)).catch(e => console.error(e));
    fetch('/api/gaming').then(res => res.json()).then(data => setGamingList(data)).catch(e => console.error(e));
    fetch('/api/music').then(res => res.json()).then(data => setMusicList(data)).catch(e => console.error(e));
    fetch('/api/sports').then(res => res.json()).then(data => setSportsList(data)).catch(e => console.error(e));
    fetch('/api/news').then(res => res.json()).then(data => setNewsList(data)).catch(e => console.error(e));
  }, []);

  // Handle openModalId passed from search state redirection
  useEffect(() => {
    if (location.state && location.state.openModalId) {
      const modalId = location.state.openModalId;
      // Search all lists for matching ID
      const foundItem = 
        moviesList.find(m => m.id === modalId) ||
        gamingList.find(g => g.id === modalId) ||
        sportsList.find(s => s.id === modalId);
      if (foundItem) {
        setActiveModalItem(foundItem);
      }
    }
  }, [location.state, moviesList, gamingList, sportsList]);

  const handleWatchTrailer = (title) => {
    showToast(`Opening trailer player for "${title}"...`);
    setActiveModalItem(null);
  };

  return (
    <div id="main">
      {/* Netflix Style Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge-container">
            <span className="hero-badge">Trending #1</span>
            <span className="hero-rating"><i className="fas fa-star"></i> IMDb 8.9</span>
            <span className="hero-rating" style={{ color: 'var(--text-secondary)' }}>2025</span>
            <span className="hero-rating" style={{ color: 'var(--text-secondary)' }}>1h 56m</span>
          </div>
          <h1 className="hero-title">Solo Leveling: Reawaken</h1>
          <p className="hero-desc">
            In a world where hunters must battle deadly monsters to protect mankind, Sung Jinwoo, the weakest hunter of all, finds himself in a struggle for survival inside a double dungeon. Re-awakened with a mysterious leveling system, his journey to become the strongest hunter begins.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-play" 
              onClick={() => {
                const soloLeveling = moviesList.find(m => m.title.includes("Solo Leveling"));
                if (soloLeveling) setActiveModalItem(soloLeveling);
              }}
            >
              <i className="fas fa-play"></i> Play
            </button>
            <button 
              className="btn btn-info"
              onClick={() => {
                const soloLeveling = moviesList.find(m => m.title.includes("Solo Leveling"));
                if (soloLeveling) setActiveModalItem(soloLeveling);
              }}
            >
              <i className="fas fa-info-circle"></i> Details
            </button>
          </div>
        </div>
      </section>

      {/* MOVIES SECTION (Now with 8 items) */}
      <section className="media-section">
        <div className="section-header">
          <h2 className="section-title-premium"><i class="fas fa-film"></i> Trending Movies & Anime</h2>
          <Link to="/movies" className="see-all">See All <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="carousel-container-wrapper">
          <button className="carousel-arrow prev" onClick={() => scrollCarousel(moviesScrollRef, -300)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={() => scrollCarousel(moviesScrollRef, 300)}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="scrolling" ref={moviesScrollRef}>
            {moviesList.map((movie) => {
              const isInWishlist = wishlist.some(item => item.name === movie.title);
              return (
                <div key={movie.id} className="poster">
                  <div className="card-img-container">
                    {movie.badge && <span className={`card-badge ${movie.badge.toLowerCase().replace(' ', '')}`}>{movie.badge}</span>}
                    <button 
                      className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(movie.title, 'movies', movie.imgUrl)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <img src={movie.imgUrl} alt={movie.title} />
                    <div className="card-metadata">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{movie.title}</h3>
                    <div className="card-genre-rating">
                      <span>{movie.genre}</span>
                      <span className="card-rating-stars"><i className="fas fa-star"></i> {movie.rating}</span>
                    </div>
                    <button className="open-modal-btn" onClick={() => setActiveModalItem(movie)}>
                      <i className="fas fa-play"></i> Watch Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GAMING SECTION (Now with 8 items) */}
      <section className="media-section">
        <div className="section-header">
          <h2 className="section-title-premium"><i className="fas fa-gamepad"></i> Top Gaming Streamers</h2>
          <Link to="/gaming" className="see-all">See All <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="carousel-container-wrapper">
          <button className="carousel-arrow prev" onClick={() => scrollCarousel(gamingScrollRef, -300)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={() => scrollCarousel(gamingScrollRef, 300)}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="scrolling" ref={gamingScrollRef}>
            {gamingList.map((streamer) => {
              const isInWishlist = wishlist.some(item => item.name === streamer.title);
              const isLive = streamer.badge === "LIVE";
              return (
                <div key={streamer.id} className="poster">
                  <div className="card-img-container">
                    <span className={`card-badge ${isLive ? 'trending' : 'offline'}`}>{streamer.badge}</span>
                    <button 
                      className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(streamer.title, 'streamer', streamer.imgUrl)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <img src={streamer.imgUrl} alt={streamer.title} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{streamer.title}</h3>
                    <div className="card-genre-rating">
                      <span>{streamer.genre}</span>
                      <span className="card-rating-stars" style={{ color: isLive ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                        <i className="fas fa-users"></i> {isLive ? streamer.rating : 'Offline'}
                      </span>
                    </div>
                    <button className="open-modal-btn" onClick={() => setActiveModalItem(streamer)}>
                      <i className="fas fa-info-circle"></i> View Streamer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MUSIC SECTION (Now with 8 items) */}
      <section className="media-section">
        <div className="section-header">
          <h2 className="section-title-premium"><i className="fas fa-music"></i> Trending Music Hits</h2>
          <Link to="/music" className="see-all">See All <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="carousel-container-wrapper">
          <button className="carousel-arrow prev" onClick={() => scrollCarousel(musicScrollRef, -300)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={() => scrollCarousel(musicScrollRef, 300)}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="scrolling" ref={musicScrollRef}>
            {musicList.map((track) => {
              const isInWishlist = wishlist.some(item => item.name === track.title);
              return (
                <div key={track.id} className="poster">
                  <div className="card-img-container">
                    {track.badge && <span className="card-badge new">{track.badge}</span>}
                    <button 
                      className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(track.title, 'music', track.imgUrl)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <img src={track.imgUrl} alt={track.title} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{track.title}</h3>
                    <div className="card-genre-rating">
                      <span>{track.genre}</span>
                      <span className="card-rating-stars"><i className="fas fa-star"></i> {track.rating}</span>
                    </div>
                    <button 
                      className="open-modal-btn" 
                      onClick={() => playMusicTrack(track.title)}
                    >
                      <i className="fas fa-play"></i> Play Track
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPORTS SECTION (Now with 8 items) */}
      <section className="media-section">
        <div className="section-header">
          <h2 className="section-title-premium"><i className="fas fa-running"></i> Sports Highlights</h2>
          <Link to="/sports" className="see-all">See All <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="carousel-container-wrapper">
          <button className="carousel-arrow prev" onClick={() => scrollCarousel(sportsScrollRef, -300)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="carousel-arrow next" onClick={() => scrollCarousel(sportsScrollRef, 300)}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="scrolling" ref={sportsScrollRef}>
            {sportsList.map((sport) => {
              const isInWishlist = wishlist.some(item => item.name === sport.title);
              const isLive = sport.rating === "Live";
              return (
                <div key={sport.id} className="poster">
                  <div className="card-img-container">
                    {isLive && <span className="card-badge trending">LIVE</span>}
                    <button 
                      className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                      onClick={() => toggleWishlist(sport.title, 'sports', sport.imgUrl)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                    <img src={sport.imgUrl} alt={sport.title} />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title">{sport.title}</h3>
                    <div className="card-genre-rating">
                      <span>{sport.genre}</span>
                      <span className="card-rating-stars" style={{ color: isLive ? 'var(--accent-red)' : '#facc15' }}>
                        <i className={isLive ? "fas fa-circle-play" : "fas fa-star"}></i> {sport.rating}
                      </span>
                    </div>
                    <button className="open-modal-btn" onClick={() => setActiveModalItem(sport)}>
                      <i className="fas fa-info-circle"></i> Match details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRENDING NEWS SECTION (Now with 8 items) */}
      <section className="trending-news">
        <div className="section-header" style={{ padding: '0 0 20px 0' }}>
          <h2 className="section-title-premium" style={{ margin: 0 }}><i className="fas fa-newspaper"></i> Trending Portal News</h2>
          <Link to="/news" className="see-all">See All News <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="news-gallery">
          {newsList.map((news) => (
            <div key={news.id} className="news-item" onClick={() => setActiveModalItem({ ...news, type: 'news' })}>
              <div className="news-card">
                <span className={`category-badge ${news.category.toLowerCase()}`}>
                  <i className={`fas ${
                    news.category === 'Music' ? 'fa-music' :
                    news.category === 'Movies' ? 'fa-film' :
                    news.category === 'Sports' ? 'fa-running' : 'fa-gamepad'
                  }`}></i> {news.category}
                </span>
                <div className="image-container">
                  <img src={news.imgUrl} alt={news.title} className="news-image" />
                </div>
                <div className="news-desc">
                  <h3>{news.title}</h3>
                  <p>{news.description.substring(0, 110)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Detail Modal Overlay */}
      {activeModalItem && (
        <div className="modal-overlay" onClick={() => setActiveModalItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActiveModalItem(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-poster">
              <img src={activeModalItem.imgUrl} alt={activeModalItem.title} />
            </div>
            
            <div className="modal-content-details">
              {activeModalItem.type === 'news' ? (
                <>
                  <span className={`category-badge ${activeModalItem.category.toLowerCase()}`} style={{ position: 'static', display: 'inline-flex', marginBottom: '15px' }}>
                    {activeModalItem.category}
                  </span>
                  <h2 className="modal-title">{activeModalItem.title}</h2>
                  <p className="modal-description" style={{ fontSize: '14px', color: '#cbd5e1' }}>
                    {activeModalItem.description}
                  </p>
                  <div className="modal-buttons">
                    <button className="btn btn-info" onClick={() => setActiveModalItem(null)}>
                      Close Article
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="modal-title">{activeModalItem.title}</h2>
                  <div className="modal-genre-rating">
                    <span><strong>Genre:</strong> {activeModalItem.genre}</span>
                    {activeModalItem.year && <span><strong>Year:</strong> {activeModalItem.year}</span>}
                    {activeModalItem.duration && <span><strong>Length:</strong> {activeModalItem.duration}</span>}
                    {activeModalItem.rating && (
                      <span style={{ color: '#facc15' }}>
                        <i className="fas fa-star"></i> {activeModalItem.rating}
                      </span>
                    )}
                  </div>
                  <p className="modal-description">
                    {activeModalItem.description}
                  </p>
                  <div className="modal-buttons">
                    {activeModalItem.type === 'movies' && (
                      <button className="btn btn-play" onClick={() => handleWatchTrailer(activeModalItem.title)}>
                        <i className="fas fa-play"></i> Watch Trailer
                      </button>
                    )}
                    {activeModalItem.type === 'sports' && (
                      <button className="btn btn-play" onClick={() => handleWatchTrailer(activeModalItem.title)}>
                        <i className="fas fa-play"></i> View Broadcast
                      </button>
                    )}
                    {activeModalItem.type === 'streamer' && (
                      <button className="btn btn-play" onClick={() => handleWatchTrailer(activeModalItem.title)}>
                        <i className="fas fa-play"></i> Watch Live Stream
                      </button>
                    )}
                    <button className="btn btn-info" onClick={() => toggleWishlist(activeModalItem.title, activeModalItem.type, activeModalItem.imgUrl)}>
                      <i className="fas fa-heart"></i> Wishlist
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
