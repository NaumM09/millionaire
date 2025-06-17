import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './firebaseContext';
import './App.css';
import PremiumPortfolio from './pages/Portfolio'; // Updated import
import AboutPage from './pages/About';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<PremiumPortfolio />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FirebaseProvider>
  );
};

export default App;