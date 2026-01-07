import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <h1 className="name">Mahlatse Naum Modiba</h1>
        <p className="tagline">Design first. Ship fast. Fix what matters.</p>
        <p className="context">
          Product designer and developer with over 3 years of experience across product design
          and frontend development. Experienced in turning ideas into functional, user-friendly
          digital products. Based in South Africa.
        </p>
        <a href="mailto:mahlatse.modiba@gmail.com" className="contact-link">
          mahlatse.modiba@gmail.com
        </a>
      </section>

      {/* Recent Work */}
      <section className="work">
        <h2 className="section-title">Recent work</h2>
        
        <Link to="/project/zoolo" className="project">
          <div className="project-content">
            <div className="project-info">
              <div className="project-header">
                <h3 className="project-title">Zoolo</h3>
                <span className="project-year">2026</span>
              </div>
              <p className="project-type">Two-Sided Marketplace</p>
              <p className="project-description">
                A two-sided marketplace built after running NATS Pets Courier for 11 months. 
                Used real operational data to solve pricing transparency, provider verification, 
                and trust issues in South Africa's R8B pet transport market.
              </p>
              <div className="project-meta">
                <span>React Native</span>
                <span>Firebase</span>
                <span>Marketplace</span>
              </div>
            </div>
            <div className="project-image">
              <img 
                src="https://i.ibb.co/5h1zLYFk/mock1.png" 
                alt="Zoolo marketplace app interface" 
                className="project-screenshot"
              />
            </div>
          </div>
        </Link>

        <Link to="/project/hard-hat" className="project">
          <div className="project-content">
            <div className="project-info">
              <div className="project-header">
                <h3 className="project-title">Hard Hat</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-type">B2B E-commerce Platform</p>
              <p className="project-description">
                Generator Components needed to compete with GenStream's modern site. 
                Instead of copying competitors, we built an e-commerce-style product 
                showcase for B2B industrial parts.
              </p>
              <div className="project-meta">
                <span>React</span>
                <span>Supabase</span>
                <span>B2B E-commerce</span>
              </div>
            </div>
            <div className="project-image">
              <img 
                src="https://i.ibb.co/xq4MGv3J/mock2.png" 
                alt="Hard Hat B2B platform mockup"
                className="project-screenshot"
              />
            </div>
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Available for product design and development work.</p>
        <div className="footer-links">
          <a href="mailto:mahlatse.modiba@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;