import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ExternalLink, Github, Mail, Phone, MapPin, Download, Zap, Target, 
  ArrowRight, Briefcase, ChevronLeft, ChevronRight, Play, Pause, 
  MousePointer, Palette, Users, Clock, Star, ArrowDown, Brain, ArrowLeft,
  Calendar, TrendingUp, Award, CheckCircle
} from 'lucide-react';

const PremiumPortfolio = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const translations = {
    en: {
      name: "Naum Modiba",
      greeting: "UI/UX DESIGNER",
      // subtitle: "Creating exceptional user experiences",
      // tagline: "Design that converts",
      cta: "View Work",
      contact: "Get in touch"
    }
  };

  const currentText = translations[currentLanguage];

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCaseStudyClick = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setCurrentPage('case-study');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCaseStudy(null);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Design Tools with actual logos (simplified SVGs for demo)
  const designTools = [
    {
      name: "Figma",
      logo: (
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0ACF83"/>
          <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#A259FF"/>
          <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#F24E1E"/>
          <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#FF7262"/>
          <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1ABCFE"/>
        </svg>
      )
    },
    {
      name: "Adobe XD",
      logo: (
        <svg viewBox="0 0 240 234" className="w-full h-full">
          <path d="M42.5 0h155C221 0 240 19 240 42.5v149c0 23.5-19 42.5-42.5 42.5h-155C19 234 0 215 0 191.5v-149C0 19 19 0 42.5 0z" fill="#FF61F6"/>
          <path d="M126.2 61.5L90.6 146c-1.7 4.1-5.7 6.6-10.1 6.6h-11c-7 0-11.3-7.6-7.8-14L99.4 61.5c2.3-5.3 7.5-8.7 13.4-8.7s11.1 3.4 13.4 8.7zm87.1 0L177.7 146c-1.7 4.1-5.7 6.6-10.1 6.6h-11c-7 0-11.3-7.6-7.8-14l37.7-77.1c2.3-5.3 7.5-8.7 13.4-8.7s11.1 3.4 13.4 8.7z" fill="#2E001E"/>
        </svg>
      )
    },
    {
      name: "Sketch",
      logo: (
        <svg viewBox="0 0 397 356" className="w-full h-full">
          <path d="M98.5 0L0 124.1l198.5 231.8L397 124.1 298.5 0H98.5z" fill="#FDB300"/>
          <path d="M98.5 0L198.5 124.1 298.5 0" fill="#EA6C00"/>
          <path d="M0 124.1l198.5 231.8L198.5 124.1" fill="#EA6C00"/>
          <path d="M198.5 124.1l198.5 231.8L397 124.1" fill="#FDAD00"/>
        </svg>
      )
    },
    {
      name: "Framer",
      logo: (
        <svg viewBox="0 0 256 384" className="w-full h-full">
          <path d="M0 0h256v128H128L0 256V0z" fill="#0055FF"/>
          <path d="M0 128h128v128L0 384V128z" fill="#00AAFF"/>
          <path d="M128 128h128v128H128V128z" fill="#88DDFF"/>
        </svg>
      )
    },
    {
      name: "Webflow",
      logo: (
        <svg viewBox="0 0 1000 300" className="w-full h-full">
          <path d="M1000 56.25L750 300l-125-93.75L500 300 250 56.25h112.5L500 225l62.5-46.875L525 56.25h75L650 140.625 725 112.5 762.5 56.25H1000z" fill="#4353FF"/>
        </svg>
      )
    },
    {
      name: "Principle",
      logo: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect width="200" height="200" rx="40" fill="#5B5FFF"/>
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="8" fill="none"/>
          <circle cx="100" cy="100" r="20" fill="white"/>
        </svg>
      )
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "EcoToken - ESG Tokenised Projects Platfrom",
      subtitle: "Reimagining the future of crypto investment projects",
      category: "FinTech",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
      metrics: "65% increase in satisfaction",
      color: "from-blue-500 to-cyan-500",
      duration: "6 months",
      role: "Lead UX Designer",
      team: "PM, 3 Engineers, UX Researcher",
      year: "2024",
      
      overview: "A complete redesign of a legacy banking platform serving 50,000+ daily users. The project focused on simplifying complex financial workflows while maintaining security and compliance standards.",
      
      problem: {
        title: "The Challenge",
        description: "Users were abandoning transactions due to confusing navigation and outdated interface patterns. Customer support tickets increased 40% year-over-year.",
        painPoints: [
          "Complex 8-step transaction process",
          "Inconsistent UI patterns across modules", 
          "Poor mobile experience (12% mobile usage)",
          "High cognitive load for financial tasks"
        ]
      },
      
      research: {
        title: "Research & Discovery",
        methods: [
          "User interviews with 25 existing customers",
          "Competitive analysis of 8 banking platforms",
          "Analytics review of 6 months of user data",
          "Stakeholder workshops with compliance team"
        ],
        keyFindings: [
          "78% of users preferred mobile-first approach",
          "Average task completion time was 12 minutes",
          "Users abandoned at step 3 of transaction flow",
          "Trust indicators were critical for adoption"
        ]
      },
      
      solution: {
        title: "Design Solution",
        approach: [
          "Mobile-first responsive redesign",
          "Simplified 3-step transaction flow",
          "Unified design system implementation",
          "Progressive disclosure for complex features"
        ],
        keyFeatures: [
          "Dashboard with customizable widgets",
          "One-click transaction templates",
          "Real-time notification system",
          "Advanced filtering and search"
        ]
      },
      
      results: {
        title: "Impact & Results",
        metrics: [
          { label: "User Satisfaction", before: "52%", after: "87%", change: "+65%" },
          { label: "Task Completion Time", before: "12 min", after: "4 min", change: "-67%" },
          { label: "Mobile Usage", before: "12%", after: "48%", change: "+300%" },
          { label: "Support Tickets", before: "450/month", after: "180/month", change: "-60%" }
        ],
        businessImpact: [
          "€2.5M annual savings in support costs",
          "40% increase in daily active users", 
          "95% user adoption rate within 3 months",
          "Featured as case study by banking industry publication"
        ]
      },
      
      gallery: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Lume Shopping App",
      subtitle: "Web Application & Product Design",
      category: "E-commerce",
      image: "https://i.ibb.co/Wp7RvNbb/Chat-GPT-Image-Jun-17-2025-07-05-37-PM.png",
      metrics: "100K+ downloads in 3 months",
      color: "from-green-500 to-emerald-500",
      duration: "4 months",
      role: "Solo UX/UI Designer",
      team: "Product Owner, 2 iOS Developers, Data Scientist",
      year: "2024",
      
      overview: "Designing a mobile-first sustainable shopping platform that helps eco-conscious consumers discover and purchase from verified green brands with AI-powered sustainability scoring.",
      
      problem: {
        title: "The Challenge",
        description: "Consumers want to shop sustainably but struggle to identify truly eco-friendly products. Existing solutions lack transparency and verification.",
        painPoints: [
          "Greenwashing makes it hard to trust claims",
          "No unified sustainability scoring system",
          "Sustainable products scattered across platforms",
          "Higher prices without clear value justification"
        ]
      },
      
      research: {
        title: "Research & Discovery", 
        methods: [
          "In-depth interviews with 20 eco-conscious shoppers",
          "Survey of 200+ sustainability-minded consumers",
          "Market analysis of 15 competitor apps",
          "Expert interviews with sustainability consultants"
        ],
        keyFindings: [
          "89% want transparent sustainability metrics",
          "Users willing to pay 15% premium for verified eco products",
          "Mobile shopping preferred for quick decisions",
          "Community features increase purchase confidence"
        ]
      },
      
      solution: {
        title: "Design Solution",
        approach: [
          "AI-powered sustainability scoring algorithm",
          "Brand verification and transparency system",
          "Gamified sustainable shopping experience",
          "Community-driven reviews and recommendations"
        ],
        keyFeatures: [
          "Real-time sustainability score (0-100)",
          "Carbon footprint calculator per purchase",
          "Eco-impact tracking and achievements",
          "Curated sustainable brand discovery"
        ]
      },
      
      results: {
        title: "Impact & Results",
        metrics: [
          { label: "App Downloads", before: "0", after: "100K+", change: "New" },
          { label: "User Retention (30d)", before: "N/A", after: "75%", change: "New" },
          { label: "Avg Session Time", before: "N/A", after: "8.5 min", change: "New" },
          { label: "Purchase Conversion", before: "N/A", after: "12%", change: "New" }
        ],
        businessImpact: [
          "Featured in Apple App Store sustainability category",
          "€2M+ gross merchandise value in first quarter",
          "Partnership with 150+ verified sustainable brands",
          "Winner of Green Tech Innovation Award 2024"
        ]
      },
      
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop"
      ]
    },
    {
      id: 3,
      title: "MediConnect Dashboard",
      subtitle: "Streamlining healthcare workflows",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop",
      metrics: "30% faster clinical workflows",
      color: "from-purple-500 to-pink-500",
      duration: "8 months",
      role: "Senior UX Designer",
      team: "UX Researcher, Product Manager, 4 Engineers, Clinical Advisor",
      year: "2023",
      
      overview: "Designing a comprehensive healthcare dashboard that enables medical professionals to efficiently manage patient data, appointments, and treatment plans while maintaining HIPAA compliance.",
      
      problem: {
        title: "The Challenge", 
        description: "Healthcare providers struggled with fragmented systems, leading to inefficient workflows and potential patient care risks. Multiple legacy systems created data silos.",
        painPoints: [
          "Data scattered across 5+ different systems",
          "15-minute average time to access patient records",
          "No unified view of patient treatment history",
          "Compliance reporting took 2+ hours daily"
        ]
      },
      
      research: {
        title: "Research & Discovery",
        methods: [
          "Contextual inquiries with 15 healthcare providers",
          "Workflow shadowing in 3 hospitals",
          "Expert interviews with 8 clinical specialists", 
          "Analysis of existing system usage data"
        ],
        keyFindings: [
          "Doctors spend 62% of time on administrative tasks",
          "Critical information often buried 3+ clicks deep",
          "Mobile access needed for 40% of use cases",
          "Interruptions cause 23% of medical errors"
        ]
      },
      
      solution: {
        title: "Design Solution",
        approach: [
          "Unified patient dashboard with real-time data",
          "Role-based information architecture",
          "Mobile-responsive design for point-of-care access",
          "Intelligent alerts and automation features"
        ],
        keyFeatures: [
          "360° patient view with timeline",
          "Voice-to-text documentation",
          "Smart medication interaction alerts",
          "Collaborative care planning tools"
        ]
      },
      
      results: {
        title: "Impact & Results", 
        metrics: [
          { label: "Clinical Efficiency", before: "15 min", after: "10 min", change: "+33%" },
          { label: "Documentation Time", before: "8 min", after: "5 min", change: "+38%" },
          { label: "System Errors", before: "12/day", after: "3/day", change: "-75%" },
          { label: "User Satisfaction", before: "62%", after: "91%", change: "+47%" }
        ],
        businessImpact: [
          "Deployed across 15 major hospital systems",
          "100% HIPAA compliance maintained",
          "€5M annual efficiency savings",
          "90% physician adoption rate within 6 months"
        ]
      },
      
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop"
      ]
    }
  ];

  const processSteps = [
    {
      title: "Research",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
      description: "Understanding user needs"
    },
    {
      title: "Design",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      description: "Creating solutions"
    },
    {
      title: "Test",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Validating concepts"
    },
    {
      title: "Ship",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
      description: "Delivering results"
    }
  ];

  // Case Study Page Component
  const CaseStudyPage = () => {
    if (!selectedCaseStudy) return null;

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <motion.button
                onClick={handleBackToHome}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Work</span>
              </motion.button>
              
              <div className="text-xl font-bold">{currentText.name}</div>

              <motion.button 
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="text-gray-400 text-lg mb-4">{selectedCaseStudy.category} • {selectedCaseStudy.year}</div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">{selectedCaseStudy.title}</h1>
              <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                {selectedCaseStudy.overview}
              </p>
            </motion.div>

            {/* Project Meta */}
            <motion.div 
              className="grid md:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Duration</div>
                <div className="text-lg font-semibold">{selectedCaseStudy.duration}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">My Role</div>
                <div className="text-lg font-semibold">{selectedCaseStudy.role}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Team</div>
                <div className="text-lg font-semibold">{selectedCaseStudy.team}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Key Result</div>
                <div className="text-lg font-semibold text-green-400">{selectedCaseStudy.metrics}</div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-20"
            >
              <img 
                src={selectedCaseStudy.image} 
                alt={selectedCaseStudy.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedCaseStudy.color} opacity-20`}></div>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">{selectedCaseStudy.problem.title}</h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  {selectedCaseStudy.problem.description}
                </p>
                <div className="space-y-4">
                  {selectedCaseStudy.problem.painPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-300">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
                  alt="Problem illustration"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Research & Discovery */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">{selectedCaseStudy.research.title}</h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Research Methods */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Research Methods</h3>
                <div className="space-y-4">
                  {selectedCaseStudy.research.methods.map((method, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-gray-900 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{method}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Key Findings */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Key Findings</h3>
                <div className="space-y-4">
                  {selectedCaseStudy.research.keyFindings.map((finding, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                    >
                      <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{finding}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Design Solution */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">{selectedCaseStudy.solution.title}</h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Design Approach</h3>
                <div className="space-y-4">
                  {selectedCaseStudy.solution.approach.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="space-y-4">
                  {selectedCaseStudy.solution.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl"
                    >
                      <Star className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results & Impact */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">{selectedCaseStudy.results.title}</h2>
            </motion.div>

            {/* Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {selectedCaseStudy.results.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center bg-gray-900 rounded-xl p-6"
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">{metric.after}</div>
                  <div className="text-sm text-gray-400 mb-2">{metric.label}</div>
                  <div className="text-sm text-green-400">{metric.change}</div>
                  {metric.before !== "N/A" && metric.before !== "0" && (
                    <div className="text-xs text-gray-500">from {metric.before}</div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Business Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Business Impact</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedCaseStudy.results.businessImpact.map((impact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                  >
                    <Award className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300">{impact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Visual Design</h2>
              <p className="text-xl text-gray-400">Final design solutions and interface details</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {selectedCaseStudy.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="aspect-[4/3] rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-500"
                >
                  <img 
                    src={image}
                    alt={`${selectedCaseStudy.title} design ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to create impact?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Let's work together to solve complex problems and create exceptional user experiences.
              </p>
              <div className="flex justify-center gap-6">
                <motion.button 
                  onClick={handleBackToHome}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View More Work
                </motion.button>
                <motion.button 
                  className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  };

  // Conditional rendering based on current page
  if (currentPage === 'case-study') {
    return <CaseStudyPage />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimal Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              {currentText.name}
            </motion.div>
            
            <motion.button 
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentText.contact}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Dynamic Background with Particles */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{ y: yBg }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40"
            animate={{ 
              y: [0, -100, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-60"
            animate={{ 
              y: [0, 80, 0],
              x: [0, -50, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-400 rounded-full opacity-30"
            animate={{ 
              y: [0, -60, 0],
              x: [0, 40, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          {/* Enhanced Hero Content */}
          <div className="text-center space-y-10 mb-24">
            {/* Greeting Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for Hire
            </motion.div>

            {/* Main Title with Gradient */}
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {currentText.greeting}
              </span>
            </motion.h1>
            
            {/* Enhanced Subtitle */}
            
            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.button 
                onClick={() => scrollToSection('work')}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentText.cta}
                <ArrowDown className="inline-block w-5 h-5 ml-2" />
              </motion.button>
              
              <motion.button 
                className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
                <Download className="inline-block w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="flex justify-center items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Users Impacted</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Hero Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl relative">
              <img 
                src="https://i.ibb.co/BSJyb1X/Desktop-1-2.png"
                alt="Design showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              
              {/* Enhanced Floating UI Elements */}
              <motion.div 
                className="absolute top-6 left-6 lg:top-8 lg:left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div className="text-white text-sm font-medium">50K+ Users</div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 3 }}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div className="text-white text-sm font-medium">65% Increase</div>
                </div>
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl -z-10 opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section - Logo Layout */}
      <section className="py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Tools I use
            </h2>
            <p className="text-xl text-gray-400">
              Crafting with industry-leading software
            </p>
          </motion.div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {designTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="group p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {tool.logo}
                </div>
                <div className="text-center text-sm text-gray-400 group-hover:text-white transition-colors">
                  {tool.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section - Large Image Grid */}
      <section id="work" className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Selected Work
            </h2>
          </motion.div>
          
          <div className="space-y-32">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCaseStudyClick(study)}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8">
                  <img 
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-sm text-gray-300 mb-2">{study.category}</div>
                      <div className="text-2xl font-bold mb-2">{study.title}</div>
                      <div className="text-gray-300">{study.metrics}</div>
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xl text-gray-400">
                      {study.subtitle}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Visual Steps */}
      <section className="py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              How I work
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Let's work together
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to create something amazing? I'm available for new projects and collaborations.
            </p>
            
            <motion.button 
              className="bg-white text-black px-12 py-6 rounded-full font-semibold text-xl hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{currentText.name}</div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPortfolio;