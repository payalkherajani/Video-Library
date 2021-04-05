import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing, Videos } from './screens';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/channel/:id" element={<Videos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
