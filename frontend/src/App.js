import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Landing, Videos, SingleVideo, History, WatchLater, LikedVideos, Playlists, SinglePlaylist, Register, Login } from './screens';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Footer } from './components';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Navigate path="/" to="/login" />
          <Route path="/landing" element={<Landing />} />
          <Route path="/channel/:id" element={<Videos />} />
          <Route path="/video/watch" element={<SingleVideo />} />
          <Route path="/videos/history" element={<History />} />
          <Route path="/videos/watchlater" element={<WatchLater />} />
          <Route path="/videos/liked" element={<LikedVideos />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:id" element={<SinglePlaylist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
