import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Import Pages
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import Music from './pages/Music.jsx';
import Sports from './pages/Sports.jsx';
import Gaming from './pages/Gaming.jsx';
import News from './pages/News.jsx';
import Polls from './pages/Polls.jsx';
import Events from './pages/Events.jsx';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sidebar and Dropdown navigation states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  
  // Custom Toast System
  const [toasts, setToasts] = useState([]);
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Wishlist state (LocalStorage backed)
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('fanzone_wishlist')) || [];
  });

  useEffect(() => {
    localStorage.setItem('fanzone_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (name, type, imgUrl) => {
    const exists = wishlist.some((item) => item.name === name);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.name !== name));
      showToast(`Removed "${name}" from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, { name, type, imgUrl }]);
      showToast(`Added "${name}" to Wishlist!`);
    }
  };

  // Notification state
  const [notifications, setNotifications] = useState([
    { id: 1, type: "film", title: "New Release Added!", desc: "Solo Leveling Season 2 is now trending.", unread: true },
    { id: 2, type: "trophy", title: "IPL 2025 Match Alert", desc: "Live scores for Chennai vs Mumbai are updating.", unread: true },
    { id: 3, type: "gamepad", title: "Streamer Online", desc: "Techno Gamerz is now live streaming.", unread: false }
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Global Search Engine
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error("Search error:", err));
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Global Audio Player
  const [musicTracks, setMusicTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMinimized, setIsAudioMinimized] = useState(true);
  const audioRef = useRef(null);

  // Fetch music tracks on mount
  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => {
        setMusicTracks(data);
        if (data.length > 0) {
          // Set default track as "Die With A Smile" (index 1)
          setCurrentTrackIndex(1);
        }
      })
      .catch(err => console.error("Error fetching music list:", err));
  }, []);

  const playMusicTrack = (trackTitle) => {
    const idx = musicTracks.findIndex(t => t.title.toLowerCase().includes(trackTitle.toLowerCase()));
    if (idx > -1) {
      setCurrentTrackIndex(idx);
      setIsAudioPlaying(true);
      setIsAudioMinimized(false);
      showToast(`Streaming "${musicTracks[idx].title}" preview track...`);
    }
  };

  const playMusicTrackIndex = (idx) => {
    if (idx >= 0 && idx < musicTracks.length) {
      setCurrentTrackIndex(idx);
      setIsAudioPlaying(true);
      setIsAudioMinimized(false);
      showToast(`Streaming "${musicTracks[idx].title}" preview track...`);
    }
  };

  const togglePlayAudio = () => {
    if (currentTrackIndex === -1) return;
    setIsAudioPlaying(!isAudioPlaying);
    if (!isAudioPlaying) {
      showToast(`Resumed "${musicTracks[currentTrackIndex].title}"`);
    } else {
      showToast(`Paused Playback`);
    }
  };

  const nextTrack = () => {
    if (musicTracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % musicTracks.length;
    setCurrentTrackIndex(nextIdx);
    setIsAudioPlaying(true);
    showToast(`Streaming "${musicTracks[nextIdx].title}" preview...`);
  };

  const prevTrack = () => {
    if (musicTracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    setCurrentTrackIndex(prevIdx);
    setIsAudioPlaying(true);
    showToast(`Streaming "${musicTracks[prevIdx].title}" preview...`);
  };

  // Sync Audio Playback
  useEffect(() => {
    if (!audioRef.current || currentTrackIndex === -1 || musicTracks.length === 0) return;
    
    const track = musicTracks[currentTrackIndex];
    if (audioRef.current.src !== track.audioUrl) {
      audioRef.current.src = track.audioUrl;
    }
    
    if (isAudioPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex, isAudioPlaying, musicTracks]);

  // Click outside to close menus
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.profile-container')) setShowProfileMenu(false);
      if (!e.target.closest('.notification-container')) setShowNotifications(false);
      if (!e.target.closest('.search-container')) {
        setSearchQuery('');
        setSuggestions([]);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const currentTrack = musicTracks[currentTrackIndex] || null;

  // Check if we are on the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="app-container">
      {/* HTML Audio element */}
      <audio ref={audioRef} loop />

      {/* Glass Navigation Header (Not visible on landing page) */}
      {!isLandingPage && (
        <nav className="topnav">
          <div className="nav-left">
            <button className="openbtn" onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
            <Link to="/home" className="logo">
              <i className="fas fa-bolt"></i> Fan<span>Zone</span>
            </Link>
          </div>
          
          <div className="nav-links">
            <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
              <i className="fas fa-home"></i> Home
            </Link>
            <Link to="/news" className={location.pathname === '/news' ? 'active' : ''}>
              <i className="fas fa-newspaper"></i> News
            </Link>
            <Link to="/events" className="events">
              <i className="fas fa-calendar-alt"></i> Events
            </Link>
            <Link to="/polls" className={location.pathname === '/polls' ? 'active' : ''}>
              <i className="fas fa-poll"></i> Polls
            </Link>
          </div>

          <div className="nav-right">
            {/* Search Bar with autocomplete */}
            <div className="search-container">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Search movies, streamers, music..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <div className="search-suggestions" style={{ display: 'block' }}>
                  {suggestions.map((item, index) => (
                    <div 
                      key={index} 
                      className="suggestion-item"
                      onClick={() => {
                        setSearchQuery('');
                        setSuggestions([]);
                        if (item.playerTrack !== undefined) {
                          playMusicTrackIndex(item.playerTrack);
                          navigate(item.page);
                        } else {
                          navigate(item.page, { state: { openModalId: item.triggerId } });
                        }
                      }}
                    >
                      <img src={item.img} alt={item.name} />
                      <div className="suggestion-info">
                        <h4>{item.name}</h4>
                        <p>{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell Dropdown */}
            <div className="notification-container">
              <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </div>
              {showNotifications && (
                <div className="notification-dropdown">
                  <header>
                    <h3>Notifications</h3>
                    <span onClick={markAllRead}>Clear all</span>
                  </header>
                  <div className="notification-list">
                    {notifications.map((n) => (
                      <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                        <i className={`fas fa-${n.type}`}></i>
                        <div className="notification-item-content">
                          <h4>{n.title}</h4>
                          <p>{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="profile-container">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=80&w=200" 
                alt="Profile Avatar" 
                className="profile-avatar" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <h4>Guest Fan</h4>
                    <p>fan.member@fanzone.com</p>
                  </div>
                  <a href="#wishlist" onClick={(e) => { e.preventDefault(); setShowWishlist(true); setShowProfileMenu(false); }}>
                    <i className="fas fa-heart"></i> My Wishlist ({wishlist.length})
                  </a>
                  <Link to="/" onClick={() => setShowProfileMenu(false)}>
                    <i className="fas fa-sign-in-alt"></i> Login / Register
                  </Link>
                  <a href="#settings" onClick={(e) => { e.preventDefault(); showToast("Settings menu coming soon!"); setShowProfileMenu(false); }}>
                    <i className="fas fa-cog"></i> Settings
                  </a>
                  <Link to="/" onClick={() => { setShowProfileMenu(false); showToast("Logged out successfully"); }}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Sidebar navigation */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <span className="closebtn" onClick={() => setIsSidebarOpen(false)}>&times;</span>
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/sports" className={location.pathname === '/sports' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-running"></i> Sports
        </Link>
        <Link to="/music" className={location.pathname === '/music' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-music"></i> Music
        </Link>
        <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-film"></i> Movies
        </Link>
        <Link to="/gaming" className={location.pathname === '/gaming' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-gamepad"></i> Gaming
        </Link>
        <Link to="/news" className={location.pathname === '/news' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-newspaper"></i> News
        </Link>
        <Link to="/polls" className={location.pathname === '/polls' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
          <i className="fas fa-poll"></i> Polls
        </Link>
      </div>

      {/* Main Pages Content Area */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/home" 
          element={
            <Home 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
              playMusicTrack={playMusicTrack}
              showToast={showToast}
            />
          } 
        />
        <Route 
          path="/movies" 
          element={
            <Movies 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
              showToast={showToast}
            />
          } 
        />
        <Route 
          path="/music" 
          element={
            <Music 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
              playMusicTrackIndex={playMusicTrackIndex}
              currentTrackIndex={currentTrackIndex}
              isAudioPlaying={isAudioPlaying}
              togglePlayAudio={togglePlayAudio}
            />
          } 
        />
        <Route 
          path="/sports" 
          element={
            <Sports 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
              showToast={showToast}
            />
          } 
        />
        <Route 
          path="/gaming" 
          element={
            <Gaming 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
              showToast={showToast}
            />
          } 
        />
        <Route path="/news" element={<News />} />
        <Route path="/polls" element={<Polls showToast={showToast} />} />
        <Route path="/events" element={<Events showToast={showToast} />} />
      </Routes>

      {/* Floating Audio Player Widget */}
      {currentTrack && (
        <div className={`audio-player-widget ${isAudioMinimized ? 'minimized' : ''}`}>
          <button 
            className="btn-minimize" 
            onClick={(e) => { e.stopPropagation(); setIsAudioMinimized(!isAudioMinimized); }}
          >
            <i className={`fas ${isAudioMinimized ? 'fa-expand-alt' : 'fa-compress-alt'}`}></i>
          </button>
          
          <div className="player-img-container" onClick={() => setIsAudioMinimized(false)}>
            <img src={currentTrack.imgUrl} alt="Album Art" />
          </div>
          
          <div className="player-info">
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.artist}</p>
          </div>
          
          <div className="player-controls">
            <button onClick={prevTrack}><i className="fas fa-backward-step"></i></button>
            <button className="btn-play-pause" onClick={togglePlayAudio}>
              <i className={`fas ${isAudioPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button onClick={nextTrack}><i className="fas fa-forward-step"></i></button>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      <div className={`wishlist-drawer ${showWishlist ? 'open' : ''}`}>
        <header>
          <h3><i className="fas fa-heart"></i> My Wishlist</h3>
          <span className="close-wishlist" onClick={() => setShowWishlist(false)}>&times;</span>
        </header>
        <div className="wishlist-items">
          {wishlist.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '30px' }}>
              Your wishlist is empty.
            </p>
          ) : (
            wishlist.map((item, idx) => (
              <div key={idx} className="wishlist-item">
                <img src={item.imgUrl} alt={item.name} />
                <div className="wishlist-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                </div>
                <span 
                  className="remove-wishlist-item" 
                  onClick={() => toggleWishlist(item.name, item.type, item.imgUrl)}
                >
                  <i className="fas fa-trash"></i>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dynamic Toast Alert Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            {toast.message}
          </div>
        ))}
      </div>

      {/* Footer (Not visible on landing page) */}
      {!isLandingPage && (
        <footer>
          <p>Copyright &copy; 2025 FanZone. All rights reserved. | Created by Danta Pratyushan Sai</p>
          <div className="footer-marquee" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <marquee scrollamount="5" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
              ✦ Latest Updates: Solo Leveling Season 2 is now streaming! ✦ Live: IPL 2025 coverage starting soon. ✦ Join the community and vote on active polls!
            </marquee>
          </div>
        </footer>
      )}
    </div>
  );
}
