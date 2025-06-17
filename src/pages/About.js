import React, { useState } from 'react';
import './About.css';

const AboutPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations = {
    en: {
      name: "Mahlatse Naum Modiba",
      title: "UI/UX Designer & Web Developer",
      location: "Centurion, South Africa",
      about: "About",
      education: "Education",
      experience: "Experience",
      skills: "Technical Skills",
      languages: "Languages",
      certifications: "Certifications & Training",
      summary: "Experienced software engineer and agile project manager with a solid foundation in financial markets and web development. Adept at leveraging React to build intuitive educational platforms focused on forex, futures, and cryptocurrency. Demonstrates strong leadership in managing cross-functional teams, executing rigorous testing protocols, and coordinating requirements analysis. Combines technical expertise with business acumen to deliver user-centric solutions and drive sustainable organizational growth.",
      downloadResume: "Download Resume",
      contact: "Contact Me"
    },
    zu: {
      name: "Mahlatse Naum Modiba",
      title: "Umklami we-UI/UX & Umthuthukisi Wewebhu",
      location: "Centurion, South Africa",
      about: "Mayelana",
      education: "Imfundo",
      experience: "Ulwazi",
      skills: "Amakhono Wezobuchwepheshe",
      languages: "Izilimi",
      certifications: "Izitifiketi Nokuqeqeshwa",
      summary: "Experienced software engineer and agile project manager with a solid foundation in financial markets and web development. Adept at leveraging React to build intuitive educational platforms focused on forex, futures, and cryptocurrency. Demonstrates strong leadership in managing cross-functional teams, executing rigorous testing protocols, and coordinating requirements analysis. Combines technical expertise with business acumen to deliver user-centric solutions and drive sustainable organizational growth.",
      downloadResume: "Landa i-Resume",
      contact: "Ngithinte"
    },
    af: {
      name: "Mahlatse Naum Modiba",
      title: "UI/UX Ontwerper & Web Ontwikkelaar",
      location: "Centurion, South Africa",
      about: "Oor",
      education: "Opvoeding",
      experience: "Ervaring",
      skills: "Tegniese Vaardighede",
      languages: "Tale",
      certifications: "Sertifikate & Opleiding",
      summary: "Experienced software engineer and agile project manager with a solid foundation in financial markets and web development. Adept at leveraging React to build intuitive educational platforms focused on forex, futures, and cryptocurrency. Demonstrates strong leadership in managing cross-functional teams, executing rigorous testing protocols, and coordinating requirements analysis. Combines technical expertise with business acumen to deliver user-centric solutions and drive sustainable organizational growth.",
      downloadResume: "Laai CV Af",
      contact: "Kontak My"
    }
  };

  return (
    <div className="about-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-name">{translations[currentLanguage].name}</span>
        </div>
        
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link active">About</a>
          <a href="/portfolio" className="nav-link">Portfolio</a>
          <a href="/contact" className="nav-link">Contact</a>
          
          <div className="language-switcher">
            {Object.keys(translations).map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${currentLanguage === lang ? 'active' : ''}`}
                onClick={() => setCurrentLanguage(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Resume Content */}
      <div className="resume-container">
        <div className="resume-content">
          {/* Header Section */}
          <header className="resume-header">
            <div className="profile-section">
              <div className="profile-image">
                <img src="/api/placeholder/150/150" alt="Naum Modiba" className="profile-img" />
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{translations[currentLanguage].name}</h1>
                <h2 className="profile-title">{translations[currentLanguage].title}</h2>
                <div className="contact-info">
                  <span className="location">{translations[currentLanguage].location}</span>
                  <span className="email">mahlatse.modiba@gmail.com</span>
                  <span className="phone">(+27) 061 626 5828</span>
                  <span className="linkedin">linkedin.com/in/naummodiba</span>
                </div>
              </div>
            </div>
            
            <div className="header-actions">
              <a href="/contact" className="btn-primary">{translations[currentLanguage].contact}</a>
              <a href="/resume.pdf" className="btn-secondary" download>{translations[currentLanguage].downloadResume}</a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="resume-section">
            <h3 className="section-title">Professional Summary</h3>
            <p className="summary-text">{translations[currentLanguage].summary}</p>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h3 className="section-title">{translations[currentLanguage].experience}</h3>
            
            <div className="experience-item">
              <div className="job-header">
                <h4 className="job-title">Software Engineer & Agile Project Manager</h4>
                <span className="company">Global Expedyte</span>
                <span className="duration">June 2024 - Present</span>
              </div>
              <ul className="job-responsibilities">
                <li>Leverage React and agile methodologies to design and develop interactive educational platforms for financial markets (forex, futures, and cryptocurrency)</li>
                <li>Create user-centric applications that simplify complex market concepts and deliver real-time, actionable insights</li>
                <li>Engineer robust educational tools using modern React frameworks and manage community engagement with brokers and crypto exchanges</li>
                <li>Conduct gap analysis of market requirements through comprehensive requirements analysis process, gathering information and clarifying needs with industry traders</li>
                <li>Coordinate cross-functional teams and guide projects from ideation through production using both automated and manual testing practices</li>
                <li>Document requirements and ensure high-quality, sustainable code delivery</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="job-header">
                <h4 className="job-title">Senior UI/UX Designer & Team Lead</h4>
                <span className="company">MyCFO</span>
                <span className="duration">Aug 2023 - May 2024</span>
              </div>
              <ul className="job-responsibilities">
                <li>Led and mentored a team of 5 designers, achieving 95% productivity efficiency within the first month</li>
                <li>Designed user interfaces and experiences for clients across 5 diverse industries: engineering, pharmaceutical, IT, marketing research, and journalism</li>
                <li>Implemented design systems and style guides to ensure consistency across all digital products</li>
                <li>Conducted user research and usability testing to inform design decisions and improve user satisfaction</li>
                <li>Collaborated with development teams to ensure pixel-perfect implementation of designs</li>
                <li>Created wireframes, prototypes, and high-fidelity mockups using industry-standard design tools</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="job-header">
                <h4 className="job-title">Co-Founder & Lead Designer</h4>
                <span className="company">FateBonds</span>
                <span className="duration">Jul 2023</span>
              </div>
              <ul className="job-responsibilities">
                <li>Founded fintech startup recognized among South Africa's top emerging companies</li>
                <li>Designed complete brand identity, user interface, and user experience for the platform</li>
                <li>Created social media design campaigns resulting in 220% growth in 3 months</li>
                <li>Developed responsive web applications and mobile-first design strategies</li>
                <li>Pitched design concepts to investors and stakeholders at AfricanArena Dakar Summit</li>
                <li>Hosted and designed visual content for Top 100 Business Podcast in South Africa</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="job-header">
                <h4 className="job-title">Frontend Developer & UX Analyst</h4>
                <span className="company">Brainnest (Remote)</span>
                <span className="duration">Sep 2021 - Oct 2021</span>
              </div>
              <ul className="job-responsibilities">
                <li>Analyzed user behavior and created data-driven design recommendations</li>
                <li>Developed responsive frontend interfaces for financial dashboard applications</li>
                <li>Designed and implemented user flows for complex financial data visualization</li>
                <li>Created interactive prototypes for investment risk assessment tools</li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section className="resume-section">
            <h3 className="section-title">{translations[currentLanguage].skills}</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4 className="skill-category-title">Design Tools</h4>
                <div className="skill-items">
                  <span className="skill-item advanced">Figma</span>
                  <span className="skill-item advanced">Adobe XD</span>
                  <span className="skill-item intermediate">Sketch</span>
                  <span className="skill-item advanced">Photoshop</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4 className="skill-category-title">Frontend Development</h4>
                <div className="skill-items">
                  <span className="skill-item advanced">HTML5</span>
                  <span className="skill-item advanced">CSS3</span>
                  <span className="skill-item advanced">JavaScript (ES6)</span>
                  <span className="skill-item advanced">React</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4 className="skill-category-title">Backend & Database</h4>
                <div className="skill-items">
                  <span className="skill-item intermediate">Node.js</span>
                  <span className="skill-item intermediate">MongoDB</span>
                  <span className="skill-item intermediate">APIs</span>
                  <span className="skill-item basic">SQL</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h4 className="skill-category-title">Emerging Technologies</h4>
                <div className="skill-items">
                  <span className="skill-item advanced">Web3</span>
                  <span className="skill-item intermediate">DApp Development</span>
                  <span className="skill-item intermediate">WordPress</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h3 className="section-title">{translations[currentLanguage].education}</h3>
            
            <div className="education-item">
              <div className="education-header">
                <h4 className="degree">Bachelor of Commerce</h4>
                <span className="institution">University of Witwatersrand</span>
              </div>
              <div className="education-details">
                <span className="specialization">Insurance & Risk Management • Marketing</span>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="resume-section">
            <h3 className="section-title">{translations[currentLanguage].certifications}</h3>
            
            <div className="certification-item">
              <h4 className="cert-title">The Complete 2022 Web Development Bootcamp</h4>
              <span className="cert-provider">Udemy - Angela Yu</span>
              <ul className="cert-skills">
                <li>Full-stack web development with modern frameworks</li>
                <li>User experience design and wireframing</li>
                <li>Responsive web design and mobile-first development</li>
                <li>Database design and management with MongoDB</li>
              </ul>
            </div>
            
            <div className="certification-item">
              <h4 className="cert-title">The Complete JavaScript Course 2022: From Zero to Expert</h4>
              <span className="cert-provider">Udemy - Jonas Schmedtmann</span>
              <ul className="cert-skills">
                <li>Advanced JavaScript programming and ES6+ features</li>
                <li>RESTful API development and integration</li>
                <li>Performance optimization and debugging techniques</li>
                <li>Security best practices in web development</li>
              </ul>
            </div>
          </section>

          {/* Languages */}
          <section className="resume-section">
            <h3 className="section-title">{translations[currentLanguage].languages}</h3>
            <div className="languages-list">
              <div className="language-item">
                <span className="language-name">English</span>
                <span className="language-level">Fluent</span>
              </div>
              <div className="language-item">
                <span className="language-name">Zulu</span>
                <span className="language-level">Native</span>
              </div>
              <div className="language-item">
                <span className="language-name">Afrikaans</span>
                <span className="language-level">Conversational</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;