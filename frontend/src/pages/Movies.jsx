import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Movies({ wishlist, toggleWishlist, showToast }) {
  const location = useLocation();
  const [moviesList, setMoviesList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        setMoviesList(data);
        // If coming from search and redirected with an openModalId
        if (location.state && location.state.openModalId) {
          const matched = data.find(item => item.id === location.state.openModalId);
          if (matched) setActiveModalItem(matched);
        }
      })
      .catch(e => console.error("Error loading movies:", e));
  }, [location.state]);

  // Extract unique genres for filtering
  const genres = ['All', 'Action / Drama', 'Adventure / Mystery', 'Fantasy / Action', 'Anime / Action', 'Sci-Fi / Adventure', 'Thriller / Drama'];

  const filteredMovies = filter === 'All' 
    ? moviesList 
    : moviesList.filter(m => m.genre.toLowerCase().includes(filter.split(' / ')[0].toLowerCase()));

  const handleWatchTrailer = (title) => {
    showToast(`Opening trailer player for "${title}"...`);
    setActiveModalItem(null);
  };

  return (
    <div id="main">
      <div className="explore-header">
        <h1 className="explore-title"><i className="fas fa-film" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Movies & Anime Explorer</h1>
        <div className="explore-filter-row">
          {genres.map(g => (
            <button 
              key={g} 
              className={`filter-btn ${filter === g ? 'active' : ''}`}
              onClick={() => setFilter(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-layout">
        {filteredMovies.map(movie => {
          const isInWishlist = wishlist.some(item => item.name === movie.title);
          return (
            <div key={movie.id} className="poster" style={{ flex: '1 1 240px' }}>
              <div className="card-img-container">
                {movie.badge && <span className="card-badge new">{movie.badge}</span>}
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
              <h2 className="modal-title">{activeModalItem.title}</h2>
              <div className="modal-genre-rating">
                <span><strong>Genre:</strong> {activeModalItem.genre}</span>
                <span><strong>Year:</strong> {activeModalItem.year}</span>
                <span><strong>Length:</strong> {activeModalItem.duration}</span>
                <span style={{ color: '#facc15' }}><i className="fas fa-star"></i> {activeModalItem.rating}</span>
              </div>
              <p className="modal-description">
                {activeModalItem.description}
              </p>
              <div className="modal-buttons">
                <button className="btn btn-play" onClick={() => handleWatchTrailer(activeModalItem.title)}>
                  <i className="fas fa-play"></i> Watch Trailer
                </button>
                <button className="btn btn-info" onClick={() => toggleWishlist(activeModalItem.title, activeModalItem.type, activeModalItem.imgUrl)}>
                  <i className="fas fa-heart"></i> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
