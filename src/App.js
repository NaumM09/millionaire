import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FirebaseProvider } from './firebaseContext';
import './App.css';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const App = () => {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <Router>
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FirebaseProvider>
    </HelmetProvider>
  );
};

export default App;