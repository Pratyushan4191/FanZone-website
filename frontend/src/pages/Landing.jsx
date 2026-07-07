import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing-body">
      <div className="landing-container">
        <header style={{ marginBottom: '30px', background: 'transparent', border: 'none' }}>
          <div className="logo" style={{ justifyContent: 'center', fontSize: '40px', textShadow: '0 0 20px rgba(37, 99, 235, 0.3)' }}>
            <i className="fas fa-bolt"></i> Fan<span>Zone</span>
          </div>
        </header>

        <h1 className="main-title">Where Passion Meets Community</h1>
        <h2 className="tagline" style={{ fontWeight: 400 }}>The Ultimate Fan Dashboard</h2>

        <p className="landing-desc">
          Join the ultimate fan community platform celebrating all things entertainment and sports. 
          Discover the latest in music, movies, sports, gaming, events, participate in polls, 
          and stay updated with fan-centric news. FanZone is your digital home for all fandoms!
        </p>

        <div style={{ marginBottom: '60px' }}>
          <Link to="/home" className="btn btn-play" style={{ padding: '16px 44px', fontSize: '18px', borderRadius: '30px', background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-purple))', color: 'white', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}>
            Enter FanZone <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
          </Link>
        </div>

        <div>
          <h2 className="categories-title">Explore Categories</h2>
          <div className="category-container">
            <Link to="/music" className="category-card">
              <i className="fas fa-music category-icon"></i>
              <h3 className="category-name">Music</h3>
              <p className="category-desc">Follow your favorite artists and discover new releases</p>
            </Link>

            <Link to="/movies" className="category-card">
              <i className="fas fa-film category-icon"></i>
              <h3 className="category-name">Movies</h3>
              <p className="category-desc">Get the scoop on blockbusters and anime hits</p>
            </Link>

            <Link to="/sports" className="category-card">
              <i className="fas fa-running category-icon"></i>
              <h3 className="category-name">Sports</h3>
              <p className="category-desc">Cheer for your teams across all major leagues</p>
            </Link>

            <Link to="/gaming" className="category-card">
              <i className="fas fa-gamepad category-icon"></i>
              <h3 className="category-name">Gaming</h3>
              <p className="category-desc">Level up with gaming news and live streams</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
