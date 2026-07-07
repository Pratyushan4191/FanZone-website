import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Gaming({ wishlist, toggleWishlist, showToast }) {
  const location = useLocation();
  const [gamingList, setGamingList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    fetch('/api/gaming')
      .then(res => res.json())
      .then(data => {
        setGamingList(data);
        if (location.state && location.state.openModalId) {
          const matched = data.find(item => item.id === location.state.openModalId);
          if (matched) setActiveModalItem(matched);
        }
      })
      .catch(e => console.error("Error loading streamers:", e));
  }, [location.state]);

  const categories = ['All', 'Live', 'Minecraft', 'Variety', 'FPS', 'BGMI'];

  const filteredGaming = gamingList.filter(g => {
    if (filter === 'All') return true;
    if (filter === 'Live') return g.badge === 'LIVE';
    return g.genre.toLowerCase().includes(filter.toLowerCase()) || g.title.toLowerCase().includes(filter.toLowerCase());
  });

  const handleWatchStream = (title) => {
    showToast(`Joining "${title}" stream chat and video feed...`);
    setActiveModalItem(null);
  };

  return (
    <div id="main">
      <div className="explore-header">
        <h1 className="explore-title"><i className="fas fa-gamepad" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Gaming Streamers</h1>
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
        {filteredGaming.map(streamer => {
          const isInWishlist = wishlist.some(item => item.name === streamer.title);
          const isLive = streamer.badge === "LIVE";
          return (
            <div key={streamer.id} className="poster" style={{ flex: '1 1 240px' }}>
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
                <span><strong>Platform:</strong> YouTube Live / Twitch</span>
                <span><strong>Status:</strong> {activeModalItem.badge}</span>
                {activeModalItem.badge === 'LIVE' && (
                  <span style={{ color: 'var(--accent-red)' }}>
                    <i className="fas fa-users"></i> {activeModalItem.rating} watching
                  </span>
                )}
              </div>
              <p className="modal-description">
                {activeModalItem.description}
              </p>
              <div className="modal-buttons">
                <button className="btn btn-play" onClick={() => handleWatchStream(activeModalItem.title)}>
                  <i className="fas fa-play"></i> Watch Stream
                </button>
                <button className="btn btn-info" onClick={() => toggleWishlist(activeModalItem.title, activeModalItem.type, activeModalItem.imgUrl)}>
                  <i className="fas fa-heart"></i> Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
