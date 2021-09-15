import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Landing, Videos, SingleVideo, History, WatchLater, LikedVideos, Playlists, SinglePlaylist, Register, Login } from './screens';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Navigate path="/" to="/login" />
          <PrivateRoute path="/landing" element={<Landing />} />
          <PrivateRoute path="/channel/:id" element={<Videos />} />
          <PrivateRoute path="/video/watch" element={<SingleVideo />} />
          <PrivateRoute path="/videos/history" element={<History />} />
          <PrivateRoute path="/videos/watchlater" element={<WatchLater />} />
          <PrivateRoute path="/videos/liked" element={<LikedVideos />} />
          <PrivateRoute path="/playlists" element={<Playlists />} />
          <PrivateRoute path="/playlist/:id" element={<SinglePlaylist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
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
