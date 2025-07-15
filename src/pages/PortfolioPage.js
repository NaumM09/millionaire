import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Users, 
  Target,  
  Lightbulb,
  ArrowRight,
  Globe,
  X,
  ExternalLink,
  Eye
} from 'lucide-react';

// Design System Constants
const DESIGN_TOKENS = {
  typography: {
    scale: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl'
    }
  },
  spacing: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  },
  colors: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-700 hover:bg-gray-600',
    accent: 'bg-white text-black hover:bg-gray-100'
  },
  animations: {
    fast: { duration: 0.2 },
    normal: { duration: 0.3 },
    slow: { duration: 0.5 }
  }
};

// Project Data
const projectsData = [
  {
    id: 'ecotoken',
    name: 'EcoToken',
    type: 'FinTech / Crypto / ESG Concept',
    tools: ['Figma', 'React', 'Tailwind CSS'],
    role: 'Product Designer & Researcher + Frontend Developer',
    brief: 'A passion project exploring alternatives to memecoin culture through conscious investment design, focusing on ethical crypto investing and mental well-being.',
    heroImage: 'https://i.ibb.co/9kr7mnFP/Chat-GPT-Image-Jun-20-2025-04-23-52-PM.png',
    projectUrl: 'https://crypto-esg.vercel.app/',
    
    problem: {
      description: 'Through my own trading experience and conversations with other investors, I identified concerning patterns in memecoin culture that needed addressing.',
      businessGoal: 'Create a platform that prioritizes ethical impact and mental well-being over speculation in crypto investing.',
      context: 'Self-initiated passion project after experiencing the psychological toll of memecoin trading firsthand.'
    },

    goals: [
      'Design frameworks for ethical crypto UX that promotes long-term thinking',
      'Create user-centered approach to conscious investing platforms',
      'Develop behavioral design patterns for healthier trading habits',
      'Demonstrate how crypto can serve positive impact and well-being'
    ],

    research: {
      competitiveAnalysis: [
        {
          competitor: 'Traditional Crypto Exchanges',
          strengths: 'High liquidity, established user base',
          weaknesses: 'Encourage day trading, lack ethical focus',
          gaps: 'No consideration for mental health or project vetting'
        },
        {
          competitor: 'ESG Investment Platforms',
          strengths: 'Focus on ethical investing, transparency',
          weaknesses: 'Limited crypto exposure, traditional finance focus',
          gaps: 'No integration with blockchain innovation'
        },
        {
          competitor: 'DeFi Platforms',
          strengths: 'Innovation, decentralization',
          weaknesses: 'Complex UX, speculation-focused',
          gaps: 'No ethical screening or impact measurement'
        }
      ]
    },

    persona: {
      name: 'Sarah - The Conscious Crypto Investor',
      motivations: [
        'Wants to participate in crypto innovation',
        'Values environmental and social impact',
        'Seeks long-term wealth building over speculation'
      ],
      goals: [
        'Invest in projects with real-world utility',
        'Maintain mental well-being while investing',
        'Understand the impact of her investments'
      ],
      frustrations: [
        'Overwhelmed by speculation-focused platforms',
        'Difficulty finding vetted, ethical crypto projects',
        'Anxiety from volatile day trading culture'
      ]
    },

    design: {
      typography: {
        choice: 'Inter for headings, Source Sans Pro for body',
        reasoning: 'Clean, trustworthy fonts that convey professionalism and accessibility in financial contexts'
      },
      colorPalette: {
        primary: '#22C55E (Green)',
        secondary: '#3B82F6 (Blue)',
        accent: '#F59E0B (Amber)',
        reasoning: 'Green represents growth and sustainability, blue conveys trust and stability, amber adds warmth for human-centered approach'
      },
      components: [
        'Mindful investment cards with impact metrics',
        'Cooling-off period modals for impulsive decisions',
        'Project transparency dashboards',
        'Educational tooltips and guided experiences'
      ]
    },

    reflection: {
      wentWell: [
        'Successfully designed behavioral patterns that prioritize mental health',
        'Created comprehensive research framework for ethical crypto UX',
        'Developed unique approach to combining blockchain innovation with ESG principles'
      ],
      wouldDoDifferently: [
        'Would have conducted more user interviews with active crypto traders',
        'Could have explored partnerships with existing ESG platforms earlier',
        'Should have prototyped the cooling-off period mechanics more extensively'
      ],
      learned: [
        'Advanced Figma prototyping for behavioral interventions',
        'Research methods for sensitive topics like mental health and finances',
        'Design systems thinking for complex financial products'
      ]
    },

    gallery: [
      'https://i.ibb.co/bMrKXk6x/Screenshot-2025-06-18-171837.png',
      'https://i.ibb.co/8gSX9T2R/screenmockup-2.png',
      'https://i.ibb.co/ghd8CGN/mock-up-3.png',
      'https://i.ibb.co/Mx7MdDQ0/mock-up-1.png'
    ]
  },
 {
    id: 'nazario',
    name: 'Nazario Technologies',
    type: 'Corporate Website Rebrand / B2B Tech',
    tools: ['Figma', 'React', 'CSS'],
    role: 'UI/UX Designer & Frontend Developer',
    brief: 'Complete website rebrand for a Level 1 BBBEE IT solutions company, transforming their outdated WordPress site into a modern, professional platform that better represents their expertise and African market focus.',
    heroImage: 'https://i.ibb.co/Df71qZZn/Screenshot-2025-07-14-101501.png',
    projectUrl: 'https://nazario-eta.vercel.app/',
    
    problem: {
      description: 'The client was deeply unsatisfied with their existing WordPress website, which featured persistent error messages, unprofessional appearance, and failed to represent their position as a leading IT solutions provider in Africa.',
      businessGoal: 'Create a professional, modern website that establishes credibility, showcases technical expertise, and positions Nazario as a premium IT solutions provider for African businesses.',
      context: 'Client-commissioned project to completely overhaul their digital presence and align it with their business growth ambitions.'
    },

    goals: [
      'Eliminate technical issues and create a stable, error-free website',
      'Design a professional interface that builds trust with enterprise clients',
      'Showcase their comprehensive IT services with clear, compelling messaging',
      'Establish visual brand identity that reflects innovation and African heritage',
      'Improve user experience for business decision-makers seeking IT solutions'
    ],

    research: {
      competitiveAnalysis: [
        {
          competitor: 'Traditional IT Service Providers',
          strengths: 'Established market presence, comprehensive service offerings',
          weaknesses: 'Outdated websites, generic messaging, poor mobile experience',
          gaps: 'Lack of modern design, no focus on African market specificity'
        },
        {
          competitor: 'Global Tech Consultancies',
          strengths: 'Professional branding, comprehensive case studies',
          weaknesses: 'Not locally focused, expensive positioning',
          gaps: 'No understanding of African business challenges and opportunities'
        },
        {
          competitor: 'Local BBBEE IT Companies',
          strengths: 'Local market knowledge, transformation credentials',
          weaknesses: 'Often have poor digital presence, limited service visualization',
          gaps: 'Lack of modern web design and clear service differentiation'
        }
      ]
    },

    persona: {
      name: 'David - The Enterprise IT Decision Maker',
      motivations: [
        'Needs reliable, scalable IT solutions for business growth',
        'Values local expertise with global standards',
        'Seeks partners who understand African business landscape'
      ],
      goals: [
        'Find trustworthy IT partners for long-term business relationships',
        'Understand service capabilities and technical expertise clearly',
        'Ensure compliance with local regulations and BBBEE requirements'
      ],
      frustrations: [
        'Unprofessional websites that don\'t inspire confidence',
        'Unclear service descriptions and pricing structures',
        'Difficulty assessing technical competency from online presence'
      ]
    },

    design: {
      typography: {
        choice: 'Inter for headings, Open Sans for body text',
        reasoning: 'Inter provides modern, tech-forward feel for headings while maintaining excellent readability. Open Sans ensures accessibility and professional appearance across all content.'
      },
      colorPalette: {
        primary: '#1A1A1A (Deep Black)',
        secondary: '#D4AF37 (Gold)',
        accent: '#2563EB (Blue)',
        reasoning: 'Black conveys sophistication and premium positioning, gold represents African heritage and premium service, blue adds trust and technological innovation'
      },
      components: [
        'Hero sections with 3D security shield graphics',
        'Service cards with hover interactions and detailed descriptions',
        'Professional team imagery with statistics overlays',
        'Contact forms with enterprise-focused CTAs'
      ]
    },

    reflection: {
      wentWell: [
        'Successfully eliminated all technical errors and created stable platform',
        'Transformed client perception from frustrated to extremely satisfied with new brand representation',
        'Created cohesive visual identity that balances professionalism with African heritage',
        'Improved user experience with clear service navigation and compelling messaging'
      ],
      wouldDoDifferently: [
        'Would have conducted more user testing with actual enterprise clients',
        'Could have implemented more advanced animations and micro-interactions',
        'Should have included more detailed case studies and client testimonials'
      ],
      learned: [
        'Corporate rebrand strategy and stakeholder management',
        'B2B website optimization for enterprise client acquisition',
        'Balancing cultural identity with professional corporate aesthetics',
        'Technical problem-solving for legacy website migration challenges'
      ]
    },

    gallery: [
      'https://i.ibb.co/Df71qZZn/Screenshot-2025-07-14-101501.png',
      'https://i.ibb.co/TDMBXTv4/Screenshot-2025-07-14-095551.png',
      'https://i.ibb.co/0p9S6FfP/Screenshot-2025-07-14-095623.png',
      'https://i.ibb.co/hJ08C9H7/Screenshot-2025-07-15-124832.png'
    ]
  }
];

// Navigation Component
const ProjectNavigation = ({ sections, activeSection, onSectionChange }) => {
  return (
    <nav className="sticky top-8 bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 p-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-white text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, projectName }) => {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">Visual Design</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, ...DESIGN_TOKENS.animations.normal }}
          >
            <img 
              src={image}
              alt={`${projectName} design ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Project Card Component
const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <motion.div
      className={`group bg-gray-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-white shadow-2xl' : 'hover:shadow-xl'
      }`}
      onClick={onClick}
      whileHover={{ y: -8 }}
      layout
    >
      {/* Image Section */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={project.heroImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      {/* Glassmorphic Content Section */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
        <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-white/70 text-sm mb-4">{project.type}</p>
        
        <div className="flex gap-2 flex-wrap mb-6">
          {project.tools.slice(0, 3).map((tool, index) => (
            <span key={index} className="bg-white/10 backdrop-blur-sm text-white/90 text-xs px-3 py-1 rounded-full border border-white/20">
              {tool}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex-1 bg-white/90 backdrop-blur-sm text-black px-4 py-3 rounded-lg text-sm font-medium hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Design Process
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          
          <motion.a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Persona Component
const PersonaBlock = ({ persona }) => {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
      <div className="text-center mb-8">
        <h4 className="text-3xl font-bold text-white mb-2">{persona.name}</h4>
        <p className="text-gray-400">Primary user archetype identified through research</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-emerald-400" />
          </div>
          <h5 className="font-semibold text-emerald-400 mb-4">What drives them</h5>
          <div className="space-y-3">
            {persona.motivations.map((motivation, index) => (
              <p key={index} className="text-gray-300 text-sm leading-relaxed">
                {motivation}
              </p>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <h5 className="font-semibold text-blue-400 mb-4">What they want to achieve</h5>
          <div className="space-y-3">
            {persona.goals.map((goal, index) => (
              <p key={index} className="text-gray-300 text-sm leading-relaxed">
                {goal}
              </p>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-red-400" />
          </div>
          <h5 className="font-semibold text-red-400 mb-4">Pain points</h5>
          <div className="space-y-3">
            {persona.frustrations.map((frustration, index) => (
              <p key={index} className="text-gray-300 text-sm leading-relaxed">
                {frustration}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Project Details Component
const ProjectDetails = ({ project }) => {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-6">
                <span className="text-gray-400 text-sm uppercase tracking-wide">Project Type</span>
                <div className="text-white font-semibold text-lg mt-1">{project.type}</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6">
                <span className="text-gray-400 text-sm uppercase tracking-wide">My Role</span>
                <div className="text-white font-semibold text-lg mt-1">{project.role}</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6">
                <span className="text-gray-400 text-sm uppercase tracking-wide">Tools Used</span>
                <div className="flex gap-2 flex-wrap mt-2">
                  {project.tools.map((tool, index) => (
                    <span key={index} className="bg-blue-500/20 text-blue-300 text-sm px-3 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <span className="text-gray-400 text-sm uppercase tracking-wide">Project Brief</span>
              <p className="text-gray-300 leading-relaxed mt-2">{project.brief}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'Problem',
      content: (
        <div className="space-y-8">
          <div className="bg-gray-900/50 rounded-xl p-8">
            <h4 className="text-2xl font-bold mb-4 text-white">The Challenge</h4>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.problem.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <h5 className="font-semibold text-blue-400 mb-3">Business Goal</h5>
                <p className="text-gray-300">{project.problem.businessGoal}</p>
              </div>
              <div className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <h5 className="font-semibold text-purple-400 mb-3">Context</h5>
                <p className="text-gray-300">{project.problem.context}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'goals',
      title: 'Goals',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">Project Objectives</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Clear, measurable goals that guided the design process and evaluation criteria
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {project.goals.map((goal, index) => (
              <motion.div 
                key={index} 
                className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{goal}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'research',
      title: 'Research',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">Competitive Analysis</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Understanding the competitive landscape to identify opportunities and gaps
            </p>
          </div>
          
          <div className="grid gap-6">
            {project.research.competitiveAnalysis.map((comp, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h5 className="text-xl font-semibold text-white mb-4">{comp.competitor}</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-400 font-medium text-sm">Strengths</span>
                    <p className="text-gray-300 text-sm mt-2">{comp.strengths}</p>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <span className="text-red-400 font-medium text-sm">Weaknesses</span>
                    <p className="text-gray-300 text-sm mt-2">{comp.weaknesses}</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <span className="text-blue-400 font-medium text-sm">Opportunities</span>
                    <p className="text-gray-300 text-sm mt-2">{comp.gaps}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'persona',
      title: 'Persona',
      content: <PersonaBlock persona={project.persona} />
    },
    {
      id: 'design',
      title: 'Design',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">Design System</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Foundational design decisions that shaped the visual language and user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
                <h5 className="font-semibold text-white">Typography</h5>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Choice:</span>
                  <p className="text-gray-300 mt-1">{project.design.typography.choice}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Reasoning:</span>
                  <p className="text-gray-300 text-sm mt-1">{project.design.typography.reasoning}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-emerald-400" />
                </div>
                <h5 className="font-semibold text-white">Color Palette</h5>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Colors:</span>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-gray-300">{project.design.colorPalette.primary}</div>
                    <div className="text-sm text-gray-300">{project.design.colorPalette.secondary}</div>
                    <div className="text-sm text-gray-300">{project.design.colorPalette.accent}</div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Reasoning:</span>
                  <p className="text-gray-300 text-sm mt-1">{project.design.colorPalette.reasoning}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h5 className="font-semibold text-white mb-4">Key Components</h5>
            <div className="grid md:grid-cols-2 gap-4">
              {project.design.components.map((component, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-gray-300 text-sm">{component}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'reflection',
      title: 'Reflection',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-white mb-4">Project Retrospective</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Key learnings and insights gained throughout the design process
            </p>
          </div>
          
          <div className="grid gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-emerald-400" />
                </div>
                <h5 className="text-xl font-semibold text-emerald-400">What went well</h5>
              </div>
              <div className="grid gap-4">
                {project.reflection.wentWell.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-amber-400" />
                </div>
                <h5 className="text-xl font-semibold text-amber-400">Areas for improvement</h5>
              </div>
              <div className="grid gap-4">
                {project.reflection.wouldDoDifferently.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <h5 className="text-xl font-semibold text-blue-400">Skills developed</h5>
              </div>
              <div className="grid gap-4">
                {project.reflection.learned.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const renderSectionContent = () => {
    const section = sections.find(s => s.id === activeSection);
    return section ? section.content : null;
  };

  return (
    <div className="space-y-8">
      <ImageGallery images={project.gallery} projectName={project.name} />
      
      <ProjectNavigation 
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={DESIGN_TOKENS.animations.normal}
        className="min-h-[400px]"
      >
        {renderSectionContent()}
      </motion.div>
    </div>
  );
};

// Main Component
const ProjectsShowcase = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="py-16 sm:py-32 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Deep dives into my design process, from problem identification to final solutions and learnings
          </motion.p>
        </motion.div>

        {/* Project Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ProjectCard 
                project={project}
                isActive={activeProject === project.id}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Project Details */}
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gray-950/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {projectsData.find(p => p.id === activeProject)?.name}
                  </h3>
                  <p className="text-gray-400">Case Study Deep Dive</p>
                </div>
                <motion.button
                  onClick={() => setActiveProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-3 hover:bg-gray-800 rounded-xl"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              <ProjectDetails project={projectsData.find(p => p.id === activeProject)} />
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </section>
  );
};

export default ProjectsShowcase;