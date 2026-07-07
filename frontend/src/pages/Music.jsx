import React, { useState, useEffect } from 'react';

export default function Music({ wishlist, toggleWishlist, playMusicTrackIndex, currentTrackIndex, isAudioPlaying, togglePlayAudio }) {
  const [musicList, setMusicList] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => setMusicList(data))
      .catch(e => console.error("Error loading music:", e));
  }, []);

  const categories = ['All', 'Pop', 'Tamil', 'Synthwave', 'Romance'];

  const filteredMusic = filter === 'All' 
    ? musicList 
    : musicList.filter(m => m.genre.toLowerCase().includes(filter.toLowerCase()) || m.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div id="main">
      <div className="explore-header">
        <h1 className="explore-title"><i className="fas fa-music" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Music Hits Explorer</h1>
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
        {filteredMusic.map((track, idx) => {
          const originalIndex = musicList.findIndex(t => t.title === track.title);
          const isCurrentPlaying = originalIndex === currentTrackIndex && isAudioPlaying;
          const isInWishlist = wishlist.some(item => item.name === track.title);

          return (
            <div key={track.id} className="poster" style={{ flex: '1 1 240px' }}>
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
                
                {originalIndex === currentTrackIndex ? (
                  <button 
                    className="open-modal-btn" 
                    onClick={togglePlayAudio}
                    style={{ backgroundColor: 'var(--primary-blue)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
                  >
                    <i className={`fas ${isCurrentPlaying ? 'fa-pause' : 'fa-play'}`}></i> 
                    {isCurrentPlaying ? 'Pause Track' : 'Resume Track'}
                  </button>
                ) : (
                  <button 
                    className="open-modal-btn" 
                    onClick={() => playMusicTrackIndex(originalIndex)}
                  >
                    <i className="fas fa-play"></i> Play Track
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
