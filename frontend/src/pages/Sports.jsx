import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sports({ wishlist, toggleWishlist, showToast }) {
  const location = useLocation();
  const [sportsList, setSportsList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    fetch('/api/sports')
      .then(res => res.json())
      .then(data => {
        setSportsList(data);
        if (location.state && location.state.openModalId) {
          const matched = data.find(item => item.id === location.state.openModalId);
          if (matched) setActiveModalItem(matched);
        }
      })
      .catch(e => console.error("Error loading sports:", e));
  }, [location.state]);

  const categories = ['All', 'Live', 'Football', 'Basketball', 'Motorsports', 'Tennis'];

  const filteredSports = sportsList.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Live') return s.rating === 'Live';
    return s.genre.toLowerCase().includes(filter.toLowerCase()) || s.title.toLowerCase().includes(filter.toLowerCase());
  });

  const handleWatchTrailer = (title) => {
    showToast(`Opening live broadcast for "${title}"...`);
    setActiveModalItem(null);
  };

  return (
    <div id="main">
      <div className="explore-header">
        <h1 className="explore-title"><i className="fas fa-running" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Sports Explorer</h1>
        <div className="explore-filter-row">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-layout">
        {filteredSports.map(sport => {
          const isInWishlist = wishlist.some(item => item.name === sport.title);
          const isLive = sport.rating === 'Live';
          return (
            <div key={sport.id} className="poster" style={{ flex: '1 1 240px' }}>
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
                <span><strong>Category:</strong> {activeModalItem.genre}</span>
                <span style={{ color: activeModalItem.rating === 'Live' ? 'var(--accent-red)' : '#facc15' }}>
                  <i className="fas fa-circle-play"></i> {activeModalItem.rating}
                </span>
              </div>
              <p className="modal-description">
                {activeModalItem.description}
              </p>
              <div className="modal-buttons">
                <button className="btn btn-play" onClick={() => handleWatchTrailer(activeModalItem.title)}>
                  <i className="fas fa-play"></i> View Broadcast
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
