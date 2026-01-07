import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './firebaseContext';
import './App.css';
import Portfolio from './pages/Portfolio';


const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <div className="app">
          <main className="content">
            <Routes>
                {/* <Route path="/" element={<PortfolioIntro />}/> */}
              <Route path="/" element={<Portfolio />} />
        
            </Routes>
          </main>
        </div>
      </Router>
    </FirebaseProvider>
  );
};

export default App;