import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { projectId } = useParams();

  const projectsData = {
    'hard-hat': {
      title: 'Hard Hat',
      subtitle: 'From Industrial Website to E-commerce Experience',
      client: 'Generator Components',
      category: 'B2B E-commerce Platform',
      year: '2024',
      duration: '4 Months',
      role: 'Product Designer & Developer',
      color: '#2563eb',
      
      // Images
      heroImage:    'https://i.ibb.co/8Dq5JGkS/hardhat-1.png',
      processImages: [
        'https://i.ibb.co/C3TWYv7V/Screenshot-2026-01-07-152801.png',
     
        'https://i.ibb.co/GfYdRMNS/Screenshot-2026-01-07-153130.png',
        'https://i.ibb.co/jv7bzMXL/wireframes.png',
        'https://i.ibb.co/4gTYnz7Z/Screenshot-2026-01-07-153416.png',
        'https://i.ibb.co/5WJBgfyy/hardhat.png'
      ],
      
      overview: 'Generator Components approached us with a challenge: competitor had a modern, professional web presence that was attracting more customers. They needed to level the playing field with a website that not only matched but exceeded what competitors were offering.',
      
      challenge: 'The client\'s existing online presence was basic and lacked the professional appeal needed to compete in the B2B industrial parts market.',
      
      solution: 'Instead of following the typical industrial website template, we took a bold approach: create a product showcase with an e-commerce feel that would differentiate Hard Hat from all competitors. We built a React-based platform with Supabase backend that emphasised product discovery, visual appeal, and seamless browsing.',
      
      process: [
        {
          phase: 'Discovery & Research',
          summary: 'Competitive analysis of industrial suppliers. User interviews with existing customers about their buying journey. Identified gaps in current B2B industrial e-commerce experiences.',
          outcome: 'Customers wanted a more visual, engaging browsing experience. Traditional B2B sites felt outdated and difficult to navigate. Product discovery was a major pain point.'
        },
        {
          phase: 'Strategy & Concept',
          summary: 'Developed "E-commerce Feel" concept - bring consumer UX to B2B. Created information architecture focused on product discovery. Planned visual hierarchy to showcase products like premium goods.',
          outcome: 'Product showcase approach would set Hard Hat apart. Visual-first design could change B2B industrial perception. E-commerce patterns increase engagement and conversion.'
        },
        {
          phase: 'Design',
          summary: 'Created wireframes for key user flows. Designed high-fidelity mockups with e-commerce aesthetics. Developed comprehensive component library. Prototyped product browsing and discovery flows.',
          outcome: 'Large product images with hover effects enhanced engagement. Grid layouts with filters improved product discovery. Modern typography and spacing created premium feel.'
        },
        {
          phase: 'Development',
          summary: 'Set up React project with modern tooling. Implemented Supabase backend for product management. Built reusable component library. Developed product catalog with advanced filtering.',
          outcome: 'Component-based architecture enabled rapid development. Supabase provided robust backend without overhead. Progressive Web App features improved mobile experience.'
        },
        {
          phase: 'Launch & Results',
          summary: 'Deployed to production environment. Monitored analytics and user behavior. Gathered client and customer feedback. Made iterative improvements based on usage data.',
          outcome: 'Positive feedback on modern, intuitive design.'
        }
      ],
      
      results: [
  { metric: 'Design System', value: '40+', description: 'Reusable components built' },
  { metric: 'Page Speed', value: '95/100', description: 'Lighthouse performance score' },
  { metric: 'Product Catalog', value: '200+', description: 'Industrial parts organized' }
      ],
      
      technologies: ['React', 'Supabase', 'JavaScript', 'Responsive Design'],
      
      competitorSite: 'https://genstream.co.za/',
      liveSite: 'https://gen-ruby.vercel.app/',
      
      nextProject: 'zoolo'
    },
    
    'zoolo': {
      title: 'Zoolo',
      subtitle: 'From Market Research to Marketplace Launch',
      client: 'NATS Pets Courier → Zoolo',
      category: 'Two-Sided Marketplace',
      year: '2024',
      duration: '11 Months',
      role: 'Founder, Product Designer & Developer',
      color: '#10b981',
      
      // Images
      heroImage: 'https://i.ibb.co/8DnXNNGq/Screenshot-2026-01-07-142956.png',
      processImages: [
        'https://i.ibb.co/1ttpjnGQ/Screenshot-2026-01-07-142905.png',
        'https://i.ibb.co/2bCHMVB/analytics.png',
        'https://i.ibb.co/cKJGdNw4/architect.png',
        'https://i.ibb.co/ddvF9CG/mvp.png',
        'https://i.ibb.co/ymbSjcPv/www-zoolo-co-za.png'
      ],
      
      overview: 'Zoolo\'s journey began with NATS Pets Courier, a pet transportation service that served as real-world market research. Over 11 months, we built and operated NATS Pets, learning the pain points, opportunities, and market dynamics firsthand. This hands-on experience became the foundation for Zoolo.',
      
      challenge: '5 million South African pet owners rely on informal WhatsApp referrals for transport, facing unclear pricing, inconsistent safety standards, and no centralised way to compare vetted couriers. The market is fragmented, informal, and fails to serve most pet owners effectively.',
      
      solution: 'Built a trusted marketplace that gives pet owners transparent pricing, vetted transport options, and peace of mind when moving animals. Simultaneously, empowered couriers with consistent demand, fair pricing, and digital tools to grow and operate professionally.',
      
      process: [
        {
          phase: 'Market Research (NATS Pets)',
          summary: 'Launched and operated NATS Pets Courier as market research. Handled real customer bookings and transport logistics. Built website, booking system, and admin tools. Tested pricing models and service offerings.',
          outcome: 'Pet owners desperate for reliable, trustworthy transport. Pricing inconsistency major source of frustration. WhatsApp referrals unreliable. Market ready for marketplace disruption. Achieved peak monthly revenue - proof of concept.'
        },
        {
          phase: 'Marketplace Strategy',
          summary: 'Analysed NATS Pets data to identify marketplace opportunities. Defined two-sided marketplace model. Planned verified provider system. Designed pricing transparency approach. Created business case and pitch deck for seed funding.',
          outcome: 'R8 billion+ local pet market opportunity. Pet services market growing to USD 2.07B by 2033. 45% of South African adults are pet owners. 10% service fee model sustainable.'
        },
        {
          phase: 'Product Design',
          summary: 'Designed dual-sided experiences (pet owners + providers). Created user flows for booking and route management. Developed brand identity and visual system. Designed onboarding for both user types.',
          outcome: 'Pet owners need simplicity and peace of mind. Providers need efficiency tools and income visibility. Trust signals critical for marketplace adoption. Mobile-first essential for both user types.'
        },
        {
          phase: 'MVP Development',
          summary: 'Built React Native apps for pet owners and providers. Implemented Supabase backend for real-time data. Developed booking and matching algorithms. Created verification system for providers. Integrated payment processing.',
          outcome: 'React Native enabled rapid cross-platform development. Verification process builds immediate trust.'
        },
        {
          phase: 'Funding & Scale',
          summary: 'Pitch to seed investors ($50,000 target). Onboard verified transport providers. Launch marketing campaigns. Build partnerships with pet stores and vets. Expand service routes across South Africa.',
          outcome: '4.8/5 customer satisfaction rating. Strong product-market fit validation. Provider network growing organically. Path to USD 2.07B market by 2033.'
        }
      ],
      
      results: [
        { metric: 'User Growth', value: '393%', description: 'Beyond initial projections' },
        { metric: 'Active Users', value: '111+', description: 'Pet owners and providers' },
        { metric: 'Satisfaction', value: '4.8/5', description: 'Customer rating' }
      ],
      
      technologies: ['React Native', 'Firebase', 'Push Notifications', 'Real-time Database'],
      
      liveSite: 'https://zoolo.co.za',
      
      fundingAsk: {
        amount: '$50,000',
        purpose: 'Scale operations, onboard providers, expand routes',
        contact: {
          
        }
      },
      
      nextProject: 'hard-hat'
    }
  };

  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="project-detail">
        <div className="not-found">
          <h1>Project Not Found</h1>
          <Link to="/" className="back-link">← Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail" style={{ '--project-color': project.color }}>
      {/* Navigation */}
      <nav className="project-nav">
        <Link to="/" className="back-link">
          ← Back
        </Link>
      </nav>

      {/* Hero */}
      <section className="project-hero">
        <div className="hero-meta">
          <span className="hero-category">{project.category}</span>
          <span className="hero-year">{project.year}</span>
        </div>
        <h1 className="hero-title">{project.title}</h1>
        <p className="hero-subtitle">{project.subtitle}</p>
        
        <div className="hero-details">
          <div className="detail-item">
            <span className="detail-label">Client</span>
            <span className="detail-value">{project.client}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration</span>
            <span className="detail-value">{project.duration}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Role</span>
            <span className="detail-value">{project.role}</span>
          </div>
        </div>

        {(project.liveSite || project.competitorSite) && (
          <div className="hero-links">
            {project.liveSite && (
              <a href={project.liveSite} target="_blank" rel="noopener noreferrer" className="hero-link">
                View Live Site →
              </a>
            )}
          </div>
        )}
      </section>

      {/* Hero Image */}
      <section className="project-image-section">
        <div className="main-image">
          <img 
            src={project.heroImage} 
            alt={`${project.title} project overview`}
            className="hero-screenshot"
          />
        </div>
      </section>

      {/* Overview */}
      <section className="content-section">
        <h2 className="section-heading">Overview</h2>
        <p className="section-text">{project.overview}</p>
      </section>

      {/* Challenge & Solution */}
      <section className="content-section split-section">
        <div className="split-item">
          <h3 className="subsection-heading">The Challenge</h3>
          <p className="section-text">{project.challenge}</p>
        </div>
        <div className="split-item">
          <h3 className="subsection-heading">The Solution</h3>
          <p className="section-text">{project.solution}</p>
        </div>
      </section>

      {/* Process Flow */}
      <section className="process-section">
        <h2 className="section-heading">Process</h2>
        
        <div className="process-flow">
          {project.process.map((phase, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
              
              <div className="step-content">
                <h3 className="phase-title">{phase.phase}</h3>
                
                <div className="phase-image">
                  <img 
                    src={project.processImages[index]} 
                    alt={`${phase.phase} process step`}
                    className="phase-screenshot"
                  />
                </div>
                
                <p className="phase-summary">{phase.summary}</p>
                
                <div className="phase-outcome">
                  <h4 className="outcome-label">Outcome</h4>
                  <p className="outcome-text">{phase.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="results-section">
        <h2 className="section-heading">Results</h2>
        <div className="results-grid">
          {project.results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-value">{result.value}</div>
              <div className="result-metric">{result.metric}</div>
              <div className="result-description">{result.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Funding Ask (Zoolo only) */}
      {project.fundingAsk && (
        <section className="funding-section">
          <div className="funding-card">
            <h2 className="funding-title">Investment Opportunity</h2>
            <div className="funding-amount">{project.fundingAsk.amount}</div>
            <p className="funding-purpose">{project.fundingAsk.purpose}</p>
            <div className="funding-contact">
              <a href={`mailto:${project.fundingAsk.contact.email}`}>{project.fundingAsk.contact.email}</a>
              <span>•</span>
              <a href={`tel:${project.fundingAsk.contact.phone}`}>{project.fundingAsk.contact.phone}</a>
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="tech-section">
        <h2 className="section-heading">Technologies</h2>
        <div className="tech-list">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-item">{tech}</span>
          ))}
        </div>
      </section>

      {/* Next Project */}
      <section className="next-project-section">
        <Link to={`/project/${project.nextProject}`} className="next-project-link">
          <span className="next-label">Next Project</span>
          <span className="next-title">{projectsData[project.nextProject]?.title}</span>
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetail;