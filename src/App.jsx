import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Room from './pages/Room';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>

          <ThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
