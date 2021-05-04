import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Videos, SingleVideo, History, WatchLater, LikedVideos, Playlists, SinglePlaylist } from './screens';
import { Footer } from './components';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/channel/:id" element={<Videos />} />
          <Route path="/video/watch" element={<SingleVideo />} />
          <Route path="/videos/history" element={<History />} />
          <Route path="/videos/watchlater" element={<WatchLater />} />
          <Route path="/videos/liked" element={<LikedVideos />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:id" element={<SinglePlaylist />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
