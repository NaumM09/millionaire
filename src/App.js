// App.js - Main component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './firebaseContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Fitness from './pages/Fitness';
import TradingJournal from './pages/TradingJournal';
import Reading from './pages/Reading';
import About from './pages/About';
import './App.css';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FirebaseProvider>
      <Router>
        <div className="app">
          <Navbar isMobile={isMobile} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/trading-journal" element={<TradingJournal />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FirebaseProvider>
  );
};

export default App;