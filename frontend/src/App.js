import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Videos, SingleVideo, History } from './screens';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/channel/:id" element={<Videos />} />
          <Route path="/video/watch" element={<SingleVideo />} />
          <Route path="/videos/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
