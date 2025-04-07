// pages/Projects.js
import React, { useState } from 'react';
import './Projects.css';

// Custom SVG icons
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const Projects = () => {
  // Sample projects data - you would replace this with your actual projects
  const [projects] = useState([
    {
        id: 1,
        name: "Fx Futures Crypto",
        description: "A next-gen network and marketing hub reshaping the forex space. Fx Futures Crypto builds community, transparency, and trust—empowering traders while rebranding the industry through bold content and authentic connection.",
        status: "active",
        image: "/api/placeholder/400/250",
        link: "https://www.forexfuturescrypto.com/",
        technologies: ["React", "Node.js", "Google Cloud"],
        progress: 65
      },
      {
        id: 2,
        name: "Trader Stream",
        description: "A creator-first streaming platform built for African traders. Trader Stream makes real-time screen sharing, education, and collaboration possible—without the fear of being flagged as a scam. Inspired by the TikTok era, built for transparency and growth.",
        status: "paused",
        image: "https://www.traderstream.live/",
        link: "",
        technologies: ["React", "Node.js", "Firebase"],
        progress: 40
      }
      ,
      {
        id: 3,
        name: "RSA Stable Coin",
        description: "$rsa coin is $RSA Token stands in solidarity with the people of Palestine and the Democratic Republic of Congo, bringing awareness to their struggles and advocating for freedom, justice, and economic empowerment.",
        status: "active",
        image: "https://www.republicsouthafrica.com/",
        link: "",
        technologies: ["React", "Blockchain", "Smart Contracts"],
        progress: 70
      }
      ,

  ]);
  
  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'active':
        return '#4CAF50'; // Green
      case 'paused':
        return '#FFC107'; // Amber
      case 'completed':
        return '#2196F3'; // Blue
      default:
        return '#757575'; // Grey
    }
  };
  
  // Function to determine status label
  const getStatusLabel = (status) => {
    switch(status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'On Hold';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="projects-container">
      <header className="page-header">
        <h1>Projects</h1>
        <p>Current ventures and past explorations on my path to $1M</p>
      </header>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.name} />
              <div className="project-overlay">
                <div className="overlay-content">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="overlay-link">
                      View Project <ExternalLinkIcon />
                    </a>
                  ) : (
                    <span className="overlay-info">In Development</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="project-status">
              <div className="status-badge" style={{ backgroundColor: getStatusColor(project.status) }}>
                {getStatusLabel(project.status)}
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${project.progress}%`,
                    backgroundColor: getStatusColor(project.status)
                  }}
                ></div>
              </div>
            </div>
            
            <div className="project-content">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              
              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-actions">
                <button className="details-btn">
                  View Details <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="add-project-card">
          <div className="add-icon">
            <PlusIcon />
          </div>
          <h3>New Project</h3>
          <p>Add a new venture to your portfolio</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;