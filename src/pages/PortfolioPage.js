import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Target, Palette, ArrowRight, ArrowLeft, Search, Eye, Layers, Play, Pause } from 'lucide-react';
import "./PortfolioPage.css";

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [journeyStep, setJourneyStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const projects = [
    {
      id: 1,
      title: "PetGo",
      subtitle: "Trust-First Pet Transportation",
      category: "Mobile App • B2C",
      overview: "Redesigning anxiety into confidence",
      role: "Lead UX/UI Designer",
      timeline: "16 weeks",
      heroImage: "/api/placeholder/800/500",
      
      brief: {
        problem: "Pet owners experience extreme anxiety due to lack of transparency",
        solution: "Trust-building experience with verified drivers and real-time updates",
        challenge: "How might we transform anxiety into confidence?"
      },

      research: {
        visual: "/api/placeholder/800/400",
        methods: [
          { icon: "👥", method: "User Interviews", count: "12 pet owners" },
          { icon: "📊", method: "Survey Research", count: "156 responses" },
          { icon: "🔍", method: "Competitive Analysis", count: "5 apps analyzed" },
          { icon: "🗺️", method: "Journey Mapping", count: "8 sessions" }
        ],
        insights: [
          "87% prioritize safety over cost",
          "Trust signals matter more than features",
          "Real-time updates reduce anxiety by 73%"
        ]
      },

      persona: {
        name: "Sarah Chen",
        image: "/api/placeholder/200/200",
        role: "Marketing Manager",
        age: 32,
        painPoints: ["Previous bad experience", "Can't assess driver trust", "No visibility during transport"],
        goals: ["Find trustworthy transport", "Get real-time updates", "Fair pricing"],
        quote: "I need to know my dog is safe every step of the way"
      },

      userJourney: {
        steps: [
          {
            phase: "Awareness",
            emotion: "Anxious",
            touchpoint: "App Store Search",
            action: "Searches 'pet transport'",
            painPoint: "Skeptical from past experience",
            visual: "/api/placeholder/300/200",
            solution: "Trust badges visible in listing"
          },
          {
            phase: "Onboarding",
            emotion: "Cautious",
            touchpoint: "Welcome Screen",
            action: "Downloads and opens app",
            painPoint: "Worried about reliability",
            visual: "/api/placeholder/300/200",
            solution: "Verification process explained upfront"
          },
          {
            phase: "Discovery",
            emotion: "Hopeful",
            touchpoint: "Driver Profiles",
            action: "Browses available drivers",
            painPoint: "Hard to assess trustworthiness",
            visual: "/api/placeholder/300/200",
            solution: "Pet-specific ratings and photos"
          },
          {
            phase: "Booking",
            emotion: "Nervous",
            touchpoint: "Booking Flow",
            action: "Enters trip details",
            painPoint: "Unclear pricing",
            visual: "/api/placeholder/300/200",
            solution: "Instant transparent pricing"
          },
          {
            phase: "Waiting",
            emotion: "Anxious",
            touchpoint: "Driver Arrival",
            action: "Waits for driver pickup",
            painPoint: "No communication",
            visual: "/api/placeholder/300/200",
            solution: "Live tracking and ETA updates"
          },
          {
            phase: "Journey",
            emotion: "Relieved",
            touchpoint: "Live Tracking",
            action: "Monitors pet's journey",
            painPoint: "No visibility into pet wellbeing",
            visual: "/api/placeholder/300/200",
            solution: "Photo updates and GPS tracking"
          },
          {
            phase: "Completion",
            emotion: "Satisfied",
            touchpoint: "Delivery",
            action: "Pet arrives safely",
            painPoint: "No confirmation",
            visual: "/api/placeholder/300/200",
            solution: "Photo confirmation and rating"
          }
        ]
      },

      designProcess: [
        {
          phase: "Research",
          visual: "/api/placeholder/400/300",
          methods: ["Interviews", "Surveys", "Analysis"],
          outcome: "Trust framework defined"
        },
        {
          phase: "Define",
          visual: "/api/placeholder/400/300",
          methods: ["Personas", "Journey Maps", "Principles"],
          outcome: "Problem statement refined"
        },
        {
          phase: "Ideate",
          visual: "/api/placeholder/400/300",
          methods: ["Sketching", "Concepts", "Validation"],
          outcome: "3 concepts tested"
        },
        {
          phase: "Design",
          visual: "/api/placeholder/400/300",
          methods: ["Wireframes", "Prototypes", "System"],
          outcome: "High-fidelity designs"
        },
        {
          phase: "Test",
          visual: "/api/placeholder/400/300",
          methods: ["Usability", "A/B Testing", "Iteration"],
          outcome: "Validated solution"
        }
      ],

      wireframes: [
        { name: "Onboarding", image: "/api/placeholder/200/300" },
        { name: "Driver Selection", image: "/api/placeholder/200/300" },
        { name: "Booking", image: "/api/placeholder/200/300" },
        { name: "Tracking", image: "/api/placeholder/200/300" }
      ],

      finalScreens: [
        { 
          name: "Trust-First Home",
          image: "/api/placeholder/300/500",
          features: ["Verification badges", "Safety messaging", "Clear pricing"]
        },
        { 
          name: "Driver Profiles",
          image: "/api/placeholder/300/500",
          features: ["Pet experience", "Photo gallery", "Trust signals"]
        },
        { 
          name: "Live Tracking",
          image: "/api/placeholder/300/500",
          features: ["Real-time map", "Photo updates", "Direct messaging"]
        }
      ],

      colorPalette: [
        { name: "Primary", color: "#FF6B35" },
        { name: "Trust", color: "#4ECDC4" },
        { name: "Safety", color: "#45B7D1" },
        { name: "Neutral", color: "#2C3E50" }
      ]
    },

    {
      id: 2,
      title: "WedCraft",
      subtitle: "AI-Powered Wedding Design",
      category: "Web Platform • AI",
      overview: "Simplifying complex creative decisions",
      role: "Senior Product Designer", 
      timeline: "24 weeks",
      heroImage: "/api/placeholder/800/500",

      brief: {
        problem: "Couples face decision paralysis with thousands of design choices",
        solution: "AI-guided design platform with collaborative tools",
        challenge: "How might we use AI to guide creativity without replacing it?"
      },

      research: {
        visual: "/api/placeholder/800/400",
        methods: [
          { icon: "💑", method: "Couple Interviews", count: "24 couples" },
          { icon: "⏱️", method: "Process Mapping", count: "8 observations" },
          { icon: "🎨", method: "Designer Interviews", count: "6 professionals" },
          { icon: "🤖", method: "AI Behavior Study", count: "3 weeks" }
        ],
        insights: [
          "Decision fatigue peaks at design phase",
          "Partners often have conflicting preferences", 
          "Need expert guidance without losing control"
        ]
      },

      persona: {
        name: "Thandi & David",
        image: "/api/placeholder/200/200",
        role: "Teacher & Developer",
        age: "28 & 31",
        painPoints: ["Overwhelmed by options", "Budget constraints", "Disagreements"],
        goals: ["Cohesive aesthetic", "Stay in budget", "Collaborate effectively"],
        quote: "We know what we like but don't know how to create it"
      },

      userJourney: {
        steps: [
          {
            phase: "Discovery",
            emotion: "Overwhelmed",
            touchpoint: "Pinterest Research",
            action: "Saves hundreds of ideas",
            painPoint: "No clear direction",
            visual: "/api/placeholder/300/200",
            solution: "AI style assessment"
          },
          {
            phase: "Assessment",
            emotion: "Curious",
            touchpoint: "Style Quiz",
            action: "Answers preference questions",
            painPoint: "Don't know their style",
            visual: "/api/placeholder/300/200",
            solution: "Visual preference mapping"
          },
          {
            phase: "Collaboration",
            emotion: "Conflicted",
            touchpoint: "Partner Input",
            action: "Compares preferences",
            painPoint: "Different tastes",
            visual: "/api/placeholder/300/200",
            solution: "Structured compromise tools"
          },
          {
            phase: "Creation",
            emotion: "Empowered",
            touchpoint: "Design Studio",
            action: "Customizes templates",
            painPoint: "Technical complexity",
            visual: "/api/placeholder/300/200",
            solution: "Guided customization"
          },
          {
            phase: "Preview",
            emotion: "Confident",
            touchpoint: "Real-time Preview",
            action: "Sees cohesive results",
            painPoint: "Can't visualize outcome",
            visual: "/api/placeholder/300/200",
            solution: "Live preview system"
          },
          {
            phase: "Finalization",
            emotion: "Satisfied",
            touchpoint: "Download & Print",
            action: "Gets final files",
            painPoint: "Vendor coordination",
            visual: "/api/placeholder/300/200",
            solution: "Vendor-ready packages"
          }
        ]
      },

      designProcess: [
        {
          phase: "AI Strategy",
          visual: "/api/placeholder/400/300",
          methods: ["AI Behavior", "Interaction Patterns", "Ethics"],
          outcome: "AI personality defined"
        },
        {
          phase: "Decision Architecture",
          visual: "/api/placeholder/400/300",
          methods: ["Choice Reduction", "Progressive Disclosure", "Flow Mapping"],
          outcome: "Optimized decision paths"
        },
        {
          phase: "Collaboration",
          visual: "/api/placeholder/400/300",
          methods: ["Voting Systems", "Compromise Tools", "Conflict Resolution"],
          outcome: "Partner decision framework"
        },
        {
          phase: "Visual System",
          visual: "/api/placeholder/400/300",
          methods: ["Template Engine", "Real-time Preview", "Brand Consistency"],
          outcome: "Dynamic design system"
        },
        {
          phase: "Validation",
          visual: "/api/placeholder/400/300",
          methods: ["Couple Testing", "A/B Tests", "Iteration"],
          outcome: "Refined experience"
        }
      ],

      wireframes: [
        { name: "Style Quiz", image: "/api/placeholder/200/300" },
        { name: "Design Studio", image: "/api/placeholder/200/300" },
        { name: "Collaboration", image: "/api/placeholder/200/300" },
        { name: "Preview", image: "/api/placeholder/200/300" }
      ],

      finalScreens: [
        { 
          name: "AI Style Assessment",
          image: "/api/placeholder/300/500",
          features: ["Visual preferences", "Partner sync", "Style mapping"]
        },
        { 
          name: "Design Workspace",
          image: "/api/placeholder/300/500",
          features: ["AI recommendations", "Live preview", "Easy customization"]
        },
        { 
          name: "Collaboration Hub",
          image: "/api/placeholder/300/500",
          features: ["Partner voting", "Compromise tools", "Shared decisions"]
        }
      ],

      colorPalette: [
        { name: "Primary", color: "#E91E63" },
        { name: "Secondary", color: "#9C27B0" },
        { name: "Accent", color: "#673AB7" },
        { name: "Neutral", color: "#37474F" }
      ]
    },

    {
      id: 3,
      title: "Ubuntu Learn",
      subtitle: "Cultural Language Learning",
      category: "Mobile App • Education",
      overview: "Respectful cultural language preservation",
      role: "Product Designer & Cultural Consultant",
      timeline: "32 weeks",
      heroImage: "/api/placeholder/800/500",

      brief: {
        problem: "African languages lack culturally respectful digital learning platforms",
        solution: "Community-centered platform teaching through stories and music",
        challenge: "How might we honor tradition while embracing technology?"
      },

      research: {
        visual: "/api/placeholder/800/400",
        methods: [
          { icon: "🏛️", method: "Cultural Immersion", count: "5 communities" },
          { icon: "👴", method: "Elder Interviews", count: "30 speakers" },
          { icon: "📚", method: "Traditional Methods", count: "12 teachers" },
          { icon: "📱", method: "App Analysis", count: "8 platforms" }
        ],
        insights: [
          "Stories are central to language learning",
          "Community connection essential",
          "Respect must be designed into every interaction"
        ]
      },

      persona: {
        name: "Michael Chen",
        image: "/api/placeholder/200/200",
        role: "Marketing Coordinator",
        age: 26,
        painPoints: ["Feels culturally disconnected", "Generic apps feel clinical", "Pronunciation struggles"],
        goals: ["Learn authentic Xhosa", "Understand culture", "Connect with community"],
        quote: "I want to learn the language properly, with respect for the culture"
      },

      userJourney: {
        steps: [
          {
            phase: "Cultural Welcome",
            emotion: "Respectful",
            touchpoint: "Traditional Greeting",
            action: "Receives cultural welcome",
            painPoint: "Feels like outsider",
            visual: "/api/placeholder/300/200",
            solution: "Elder-led welcome ceremony"
          },
          {
            phase: "Community Introduction",
            emotion: "Welcomed",
            touchpoint: "Learning Circle",
            action: "Joins beginner group",
            painPoint: "Learning alone",
            visual: "/api/placeholder/300/200",
            solution: "Peer learning circles"
          },
          {
            phase: "Story Learning",
            emotion: "Engaged",
            touchpoint: "Traditional Tale",
            action: "Learns through story",
            painPoint: "Boring vocabulary lists",
            visual: "/api/placeholder/300/200",
            solution: "Interactive storytelling"
          },
          {
            phase: "Pronunciation Practice",
            emotion: "Challenged",
            touchpoint: "Speaking Exercise",
            action: "Practices with AI feedback",
            painPoint: "No pronunciation help",
            visual: "/api/placeholder/300/200",
            solution: "Culturally-aware speech recognition"
          },
          {
            phase: "Cultural Context",
            emotion: "Enlightened",
            touchpoint: "Context Module",
            action: "Learns cultural significance",
            painPoint: "Missing cultural meaning",
            visual: "/api/placeholder/300/200",
            solution: "Embedded cultural lessons"
          },
          {
            phase: "Community Validation",
            emotion: "Proud",
            touchpoint: "Elder Approval",
            action: "Receives cultural validation",
            painPoint: "No cultural feedback",
            visual: "/api/placeholder/300/200",
            solution: "Community elder reviews"
          }
        ]
      },

      designProcess: [
        {
          phase: "Cultural Research",
          visual: "/api/placeholder/400/300",
          methods: ["Immersion", "Elder Consultation", "Protocol Study"],
          outcome: "Cultural framework"
        },
        {
          phase: "Community Co-Design",
          visual: "/api/placeholder/400/300",
          methods: ["Workshops", "Validation", "Iteration"],
          outcome: "Community-approved concepts"
        },
        {
          phase: "Respectful Design",
          visual: "/api/placeholder/400/300",
          methods: ["Cultural Icons", "Color Meaning", "Visual Language"],
          outcome: "Culturally appropriate system"
        },
        {
          phase: "Story Integration",
          visual: "/api/placeholder/400/300",
          methods: ["Traditional Stories", "Interactive Design", "Audio Recording"],
          outcome: "Narrative learning experience"
        },
        {
          phase: "Community Testing",
          visual: "/api/placeholder/400/300",
          methods: ["Cultural Validation", "Elder Approval", "Community Feedback"],
          outcome: "Respectful final product"
        }
      ],

      wireframes: [
        { name: "Cultural Welcome", image: "/api/placeholder/200/300" },
        { name: "Story Learning", image: "/api/placeholder/200/300" },
        { name: "Community Hub", image: "/api/placeholder/200/300" },
        { name: "Progress", image: "/api/placeholder/200/300" }
      ],

      finalScreens: [
        { 
          name: "Traditional Welcome",
          image: "/api/placeholder/300/500",
          features: ["Elder greeting", "Cultural imagery", "Respectful onboarding"]
        },
        { 
          name: "Story Mode",
          image: "/api/placeholder/300/500",
          features: ["Animated stories", "Interactive elements", "Cultural context"]
        },
        { 
          name: "Community Circle",
          image: "/api/placeholder/300/500",
          features: ["Peer learning", "Elder guidance", "Cultural validation"]
        }
      ],

      colorPalette: [
        { name: "Earth", color: "#8D6E63" },
        { name: "Sky", color: "#2196F3" },
        { name: "Growth", color: "#4CAF50" },
        { name: "Warmth", color: "#FF9800" }
      ]
    }
  ];

  // Auto-advance journey steps
  useEffect(() => {
    if (selectedProject && activeSection === 'journey' && isAutoPlay) {
      const timer = setInterval(() => {
        setJourneyStep((prev) => (prev + 1) % selectedProject.userJourney.steps.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [selectedProject, activeSection, isAutoPlay]);

  const sectionNavigation = [
    { id: 'overview', label: 'Brief', icon: Eye },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'persona', label: 'Persona', icon: User },
    { id: 'journey', label: 'User Journey', icon: Target },
    { id: 'process', label: 'Process', icon: Layers },
    { id: 'visual', label: 'Visual Design', icon: Palette }
  ];

  return (
    <div className="portfolio-container-page">
      {/* Navigation - Fixed with correct class names */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-name">Naum Modiba</span>
        </div>
        <div className="nav-links">
          <a href="/about" className="nav-link">About</a>
          <a href="/portfolio" className="nav-link active">Portfolio</a>
          <a href="/contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">UX Portfolio</h1>
          <p className="hero-subtitle">
            Strategic design • User research • Visual storytelling
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-container">
                  <img src={project.heroImage} alt={project.title} className="project-image" />
                </div>
                <div className="project-info">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-overview">{project.overview}</p>
                  <div className="project-cta">
                    View Case Study <ChevronRight className="icon-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="close-button"
                >
                  ✕
                </button>
              </div>
              
              {/* Section Nav */}
              <div className="section-nav">
                <div className="section-nav-container">
                  {sectionNavigation.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`section-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                    >
                      <section.icon className="icon-sm" />
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-content">
              {/* Overview */}
              {activeSection === 'overview' && (
                <div className="section">
                  <div className="text-center">
                    <h1 className="section-title">{selectedProject.title}</h1>
                    <p className="section-subtitle">{selectedProject.subtitle}</p>
                    <img src={selectedProject.heroImage} alt={selectedProject.title} className="hero-image" />
                  </div>

                  <div className="grid-3">
                    <div>
                      <h4 className="detail-label">Role</h4>
                      <p className="detail-value">{selectedProject.role}</p>
                    </div>
                    <div>
                      <h4 className="detail-label">Timeline</h4>
                      <p className="detail-value">{selectedProject.timeline}</p>
                    </div>
                    <div>
                      <h4 className="detail-label">Category</h4>
                      <p className="detail-value">{selectedProject.category}</p>
                    </div>
                  </div>

                  <div className="grid-3">
                    <div className="brief-card problem">
                      <h3 className="brief-title problem">Problem</h3>
                      <p>{selectedProject.brief.problem}</p>
                    </div>
                    <div className="brief-card challenge">
                      <h3 className="brief-title challenge">Challenge</h3>
                      <p>{selectedProject.brief.challenge}</p>
                    </div>
                    <div className="brief-card solution">
                      <h3 className="brief-title solution">Solution</h3>
                      <p>{selectedProject.brief.solution}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Research */}
              {activeSection === 'research' && (
                <div className="section">
                  <div className="text-center">
                    <h2 className="section-title">Research Methods</h2>
                    <img src={selectedProject.research.visual} alt="Research process" className="hero-image" />
                  </div>

                  <div className="research-methods">
                    {selectedProject.research.methods.map((method, index) => (
                      <div key={index} className="research-method">
                        <div className="method-icon">{method.icon}</div>
                        <h4 className="method-title">{method.method}</h4>
                        <p className="method-count">{method.count}</p>
                      </div>
                    ))}
                  </div>

                  <div className="visual-section">
                    <h3 className="visual-section-title">Key Insights</h3>
                    <div className="insights-grid">
                      {selectedProject.research.insights.map((insight, index) => (
                        <div key={index} className="insight-item">
                          <div className="insight-number">{index + 1}</div>
                          <p>{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Persona */}
              {activeSection === 'persona' && (
                <div className="section">
                  <div className="text-center">
                    <h2 className="section-title">User Persona</h2>
                  </div>

                  <div className="persona-container">
                    <div className="persona-grid">
                      <div className="persona-image-section">
                        <img src={selectedProject.persona.image} alt={selectedProject.persona.name} className="persona-image" />
                        <h3 className="persona-name">{selectedProject.persona.name}</h3>
                        <p className="persona-details">{selectedProject.persona.role}</p>
                        <p className="persona-details">Age {selectedProject.persona.age}</p>
                      </div>
                      
                      <div className="persona-content">
                        <div className="pain-points">
                          <h4 className="persona-section-title">Pain Points</h4>
                          <ul className="persona-list">
                            {selectedProject.persona.painPoints.map((pain, index) => (
                              <li key={index} className="persona-list-item">
                                <div className="list-bullet pain-bullet"></div>
                                <span>{pain}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="goals">
                          <h4 className="persona-section-title">Goals</h4>
                          <ul className="persona-list">
                            {selectedProject.persona.goals.map((goal, index) => (
                              <li key={index} className="persona-list-item">
                                <div className="list-bullet goal-bullet"></div>
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="persona-quote">
                      "{selectedProject.persona.quote}"
                    </div>
                  </div>
                </div>
              )}

              {/* User Journey */}
              {activeSection === 'journey' && (
                <div className="section">
                  <div className="journey-controls">
                    <h2 className="journey-title">User Journey</h2>
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="play-button"
                    >
                      {isAutoPlay ? <Pause className="icon-sm" /> : <Play className="icon-sm" />}
                      {isAutoPlay ? 'Pause' : 'Play'}
                    </button>
                  </div>

                  {/* Journey Navigation */}
                  <div className="journey-nav">
                    {selectedProject.userJourney.steps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => setJourneyStep(index)}
                        className={`journey-nav-btn ${journeyStep === index ? 'active' : ''}`}
                      >
                        {step.phase}
                      </button>
                    ))}
                  </div>

                  {/* Active Journey Step */}
                  <div className="journey-step">
                    <div className="journey-step-grid">
                      <div>
                        <div className="journey-step-header">
                          <div className="step-number">{journeyStep + 1}</div>
                          <div>
                            <h3 className="step-phase">{selectedProject.userJourney.steps[journeyStep].phase}</h3>
                            <p className="step-emotion">Emotion: {selectedProject.userJourney.steps[journeyStep].emotion}</p>
                          </div>
                        </div>

                        <div className="journey-step-content">
                          <div className="step-detail">
                            <h4 className="step-detail-title touchpoint-title">Touchpoint</h4>
                            <p className="step-detail-content">{selectedProject.userJourney.steps[journeyStep].touchpoint}</p>
                          </div>

                          <div className="step-detail">
                            <h4 className="step-detail-title action-title">User Action</h4>
                            <p className="step-detail-content">{selectedProject.userJourney.steps[journeyStep].action}</p>
                          </div>

                          <div className="step-detail">
                            <h4 className="step-detail-title pain-title">Pain Point</h4>
                            <p className="step-detail-content">{selectedProject.userJourney.steps[journeyStep].painPoint}</p>
                          </div>

                          <div className="step-detail">
                            <h4 className="step-detail-title solution-title">Design Solution</h4>
                            <p className="step-detail-content">{selectedProject.userJourney.steps[journeyStep].solution}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <img 
                          src={selectedProject.userJourney.steps[journeyStep].visual} 
                          alt={`${selectedProject.userJourney.steps[journeyStep].phase} visualization`}
                          className="journey-step-visual"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Journey Progress */}
                  <div className="journey-controls-bottom">
                    <button
                      onClick={() => setJourneyStep(Math.max(0, journeyStep - 1))}
                      disabled={journeyStep === 0}
                      className="journey-control-btn"
                    >
                      <ArrowLeft className="icon-sm" /> Previous
                    </button>
                    <button
                      onClick={() => setJourneyStep(Math.min(selectedProject.userJourney.steps.length - 1, journeyStep + 1))}
                      disabled={journeyStep === selectedProject.userJourney.steps.length - 1}
                      className="journey-control-btn"
                    >
                      Next <ArrowRight className="icon-sm" />
                    </button>
                  </div>
                </div>
              )}

              {/* Design Process */}
              {activeSection === 'process' && (
                <div className="section">
                  <div className="text-center">
                    <h2 className="section-title">Design Process</h2>
                  </div>

                  <div className="process-grid">
                    {selectedProject.designProcess.map((phase, index) => (
                      <div key={index} className="process-phase">
                        <img src={phase.visual} alt={phase.phase} className="process-visual" />
                        <h3 className="process-title">{phase.phase}</h3>
                        <div className="process-methods">{phase.methods.join(' • ')}</div>
                        <div className="process-outcome">{phase.outcome}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Design */}
              {activeSection === 'visual' && (
                <div className="section">
                  <div className="text-center">
                    <h2 className="section-title">Visual Design</h2>
                  </div>

                  {/* Color Palette */}
                  <div className="visual-section">
                    <h3 className="visual-section-title">Color Palette</h3>
                    <div className="color-palette-grid">
                      {selectedProject.colorPalette.map((color, index) => (
                        <div key={index} className="color-swatch">
                          <div 
                            className="color-circle" 
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <h4 className="color-name">{color.name}</h4>
                          <p className="color-value">{color.color}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wireframes */}
                  <div className="visual-section">
                    <h3 className="visual-section-title">Low-Fi Wireframes</h3>
                    <div className="wireframe-grid">
                      {selectedProject.wireframes.map((wireframe, index) => (
                        <div key={index} className="wireframe-item">
                          <img src={wireframe.image} alt={wireframe.name} className="wireframe-image" />
                          <h4 className="wireframe-name">{wireframe.name}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Screens */}
                  <div className="visual-section">
                    <h3 className="visual-section-title">Final Screens</h3>
                    <div className="final-screens-grid">
                      {selectedProject.finalScreens.map((screen, index) => (
                        <div key={index} className="final-screen">
                          <img src={screen.image} alt={screen.name} className="final-screen-image" />
                          <h4 className="final-screen-title">{screen.name}</h4>
                          <div className="screen-features">
                            {screen.features.map((feature, idx) => (
                              <div key={idx} className="feature-item">
                                <div className="feature-bullet"></div>
                                <span className="feature-text">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;