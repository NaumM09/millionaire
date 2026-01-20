import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectsShowcase.css';

const ProjectsShowcase = () => {
  const projects = [
    {
      id: 'hard-hat',
      title: 'Hard Hat',
      category: 'B2B E-commerce Platform',
      description: 'Transforming an industrial parts supplier into a competitive digital marketplace with professional design and optimized user experience. Built for Generator Components.',
      thumbnail: '/images/hardhat-preview.jpg',
      color: '#2563eb',
      tags: ['Product Design', 'React', 'E-commerce', 'UX Strategy']
    },
    {
      id: 'zoolo',
      title: 'Zoolo',
      category: 'Two-Sided Marketplace',
      description: 'A comprehensive pet transportation marketplace connecting verified transport providers with pet owners. From NATS Pets market research to full marketplace launch.',
      thumbnail: '/images/zoolo-preview.jpg',
      color: '#10b981',
      tags: ['Mobile App', 'React Native', 'Firebase', 'Marketplace']
    }
  ];

  return (
    <div className="projects-showcase">
      {/* Hero Section */}
      <section className="showcase-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Available for work</span>
          </div>
          <h1 className="hero-title">
            Naum Mahlaba, Product Designer
            <br />
            <span className="gradient-text">Based in South Africa</span>
          </h1>
          <p className="hero-description">
            Creating digital experiences that drive business growth. Specializing in web and mobile design,
            from concept to launch. The success of the collaboration is my priority on every project I work on.
          </p>
          <button className="cta-button">
            View All Projects
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid">
        {projects.map((project, index) => (
          <Link 
            to={`/project/${project.id}`} 
            key={project.id}
            className="project-card"
            style={{ '--card-color': project.color }}
          >
            <div className="card-image">
              <div className="image-placeholder" style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}>
                <div className="placeholder-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke={project.color} strokeWidth="2"/>
                    <path d="M3 9h18M9 3v18" stroke={project.color} strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="card-overlay">
                <span className="view-project">View Project →</span>
              </div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <span className="card-category">{project.category}</span>
                <div className="card-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-description">{project.description}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h3 className="stat-number">6+</h3>
          <p className="stat-label">Major Projects</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">2</h3>
          <p className="stat-label">Active Companies</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">4+</h3>
          <p className="stat-label">Years Experience</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">100%</h3>
          <p className="stat-label">Client Satisfaction</p>
        </div>
      </section>
    </div>
  );
};

export default ProjectsShowcase;