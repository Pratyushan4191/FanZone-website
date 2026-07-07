import React, { useState, useEffect } from 'react';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [filter, setFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(e => console.error("Error loading news:", e));
  }, []);

  const categories = ['All', 'Music', 'Movies', 'Sports', 'Gaming'];

  const filteredNews = filter === 'All'
    ? newsList
    : newsList.filter(n => n.category.toLowerCase() === filter.toLowerCase());

  return (
    <div id="main">
      <div className="explore-header">
        <h1 className="explore-title"><i className="fas fa-newspaper" style={{ color: 'var(--primary-blue)', marginRight: '10px' }}></i> Portal News Hub</h1>
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

      <div className="news-gallery" style={{ marginTop: '20px' }}>
        {filteredNews.map(news => (
          <div key={news.id} className="news-item" onClick={() => setActiveModalItem(news)}>
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
                <p>{news.description}</p>
              </div>
            </div>
          </div>
        ))}
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
              <span className={`category-badge ${activeModalItem.category.toLowerCase()}`} style={{ position: 'static', display: 'inline-flex', marginBottom: '15px' }}>
                {activeModalItem.category}
              </span>
              <h2 className="modal-title" style={{ marginTop: '10px' }}>{activeModalItem.title}</h2>
              <p className="modal-description" style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '15px' }}>
                {activeModalItem.description}
              </p>
              <div className="modal-buttons" style={{ marginTop: '25px' }}>
                <button className="btn btn-info" onClick={() => setActiveModalItem(null)}>
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
