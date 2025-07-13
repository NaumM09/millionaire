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
    projectUrl: 'https://www.figma.com/design/your-ecotoken-project',
    
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
    id: 'lume',
    name: 'Lume',
    type: 'Luxury / AR / E-commerce',
    tools: ['Figma', 'Canva', 'ChatGPT'],
    role: 'UX/UI Designer',
    brief: 'A solo design concept exploring how luxury brands can translate exclusivity and personalization to digital retail through AR try-on experiences.',
    heroImage: 'https://i.ibb.co/Wp7RvNbb/Chat-GPT-Image-Jun-17-2025-07-05-37-PM.png',
    projectUrl: 'https://www.figma.com/design/your-lume-project',
    
    problem: {
      description: 'Luxury eyewear loses its tactile, tailored experience in traditional online shopping. Shoppers hesitate to buy without physically trying frames or understanding what makes them premium.',
      businessGoal: 'Create an e-commerce experience that replicates the luxury in-store experience digitally while maintaining exclusivity.',
      context: 'Self-directed exploration to reimagine digital luxury retail and understand AR integration in premium commerce.'
    },

    goals: [
      'Design an end-to-end luxury shopping experience with AR integration',
      'Create visual storytelling that communicates craftsmanship and exclusivity',
      'Develop personalization tools that feel bespoke and premium',
      'Build a scalable design system for luxury e-commerce'
    ],

    research: {
      competitiveAnalysis: [
        {
          competitor: 'Gentle Monster',
          strengths: 'Strong brand storytelling, premium feel',
          weaknesses: 'Limited AR features, complex navigation',
          gaps: 'No personalization or custom frame options'
        },
        {
          competitor: 'Warby Parker',
          strengths: 'Excellent AR try-on, user-friendly',
          weaknesses: 'More accessible than luxury positioning',
          gaps: 'Lacks premium exclusivity and craftsmanship narrative'
        },
        {
          competitor: 'Gucci Eyewear',
          strengths: 'Luxury brand recognition, high-quality imagery',
          weaknesses: 'No AR features, traditional e-commerce UX',
          gaps: 'Missing digital innovation and personalization'
        }
      ]
    },

    persona: {
      name: 'Marcus - The Luxury Enthusiast',
      motivations: [
        'Values premium quality and craftsmanship',
        'Appreciates exclusive, personalized experiences',
        'Early adopter of luxury tech innovations'
      ],
      goals: [
        'Find eyewear that reflects his personal style and status',
        'Understand the quality and craftsmanship behind products',
        'Have a seamless, premium shopping experience'
      ],
      frustrations: [
        'Generic online shopping experiences for luxury goods',
        'Inability to assess quality and fit online',
        'Lack of personalization in digital luxury retail'
      ]
    },

    design: {
      typography: {
        choice: 'Playfair Display for headings, Nunito Sans for body',
        reasoning: 'Playfair conveys luxury and elegance with serif sophistication, while Nunito Sans provides clean readability for product details'
      },
      colorPalette: {
        primary: '#1A1A1A (Rich Black)',
        secondary: '#F5F5DC (Cream)',
        accent: '#D4AF37 (Gold)',
        reasoning: 'Black and cream create sophisticated contrast reminiscent of premium packaging, gold accents add luxury touch without being overwhelming'
      },
      components: [
        'Cinematic product viewers with 360° rotation',
        'AR try-on interface with face mapping',
        'Custom frame builder with live preview',
        'Premium checkout flow with white-glove service options'
      ]
    },

    reflection: {
      wentWell: [
        'Successfully created a cohesive luxury brand experience across all touchpoints',
        'Designed intuitive AR integration that feels seamless and premium',
        'Developed strong visual hierarchy that guides users through complex customization'
      ],
      wouldDoDifferently: [
        'Would have conducted more research on luxury shopping behaviors',
        'Could have explored more innovative AR features beyond basic try-on',
        'Should have designed more comprehensive onboarding for AR features'
      ],
      learned: [
        'Advanced prototyping for AR interactions in Figma',
        'Luxury design principles and how they translate to digital',
        'Component-based design systems for complex e-commerce flows'
      ]
    },

    gallery: [
      'https://i.ibb.co/BSJyb1X/Desktop-1-2.png',
      'https://i.ibb.co/FbFwGR9m/COLOR-5.png',
      'https://i.ibb.co/DHyskq4B/lUME.png',
      'https://i.ibb.co/6RwWnxCJ/COLOR-1.png'
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
      className={`group relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-white shadow-2xl' : 'hover:shadow-xl'
      }`}
      onClick={onClick}
      whileHover={{ y: -8 }}
      layout
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={project.heroImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
            <p className="text-gray-300 text-sm mb-4">{project.type}</p>
            
            <div className="flex gap-2 flex-wrap mb-4">
              {project.tools.slice(0, 3).map((tool, index) => (
                <span key={index} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {tool}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="flex-1 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
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
                className="flex items-center justify-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
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