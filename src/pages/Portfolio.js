import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
   Download,   
   Palette, Users,   ArrowDown,  Menu, X
} from 'lucide-react';
import DesignGallery from "./DesignGallery";
import ProjectsShowcase from "./PortfolioPage";

const PremiumPortfolio = () => {
  // eslint-disable-next-line
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [cursorImages, setCursorImages] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const heroRef = useRef(null);
  const imageCounter = useRef(0);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Array of design-related images for cursor effect (disabled on mobile)
  const cursorImageUrls = [
    'https://i.ibb.co/7N6nLcHw/9781847941497-24.jpg',
    'https://i.ibb.co/mF8tSfxF/51-Hqyc-Cx-MRL-SY580.jpg',
    'https://i.ibb.co/DfdvGDdx/61-PIpid-STh-L.jpg',
    'https://i.ibb.co/0ptNGdFs/81gp7-Nk-Ylu-L.jpg',
    'https://i.ibb.co/6RCbcpMC/71-Z9z-Jn-T4v-L.jpg',
    'https://i.ibb.co/PsSgtXqx/9780141988498.jpg',
    'https://i.ibb.co/zM4N1Bk/81bsw6fn-Ui-L.jpg',
    'https://i.ibb.co/Lz83zjPR/81-F90-H7hn-ML.jpg',
    'https://i.ibb.co/Kkz0VyY/61dfw-V-p-Tz-L.jpg',
    'https://i.ibb.co/mVSVGS9j/71-Aq-Hmn-Xpp-L.jpg',
    'https://i.ibb.co/LDKZdD0r/61-U00r-HKM1-L.jpg',
    'https://i.ibb.co/Zt0NvvR/61-Izr-J6q-Sk-L.jpg'
  ];

  const translations = {
    en: {
      name: "Naum Modiba",
      greeting: "UI/UX DESIGNER",
      subtitle: "-and avid reader",
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

 // Cursor image effect handler (disabled on mobile)
  const handleMouseMove = (e) => {
    if (!heroRef.current || isMobile) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if cursor is over a button or interactive element
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    const isOverButton = elementUnderCursor?.closest('button, a') !== null;
    
    // Also check if we're in the button area (roughly center-bottom of hero)
    const heroHeight = rect.height;
    const heroWidth = rect.width;
    const buttonAreaTop = heroHeight * 0.6; // Buttons are roughly in bottom 40% of hero
    const buttonAreaLeft = heroWidth * 0.1; // Give some margin on sides
    const buttonAreaRight = heroWidth * 0.9;
    const isInButtonArea = y > buttonAreaTop && x > buttonAreaLeft && x < buttonAreaRight;
    
    // Only create images if not over buttons and random chance
    if (!isOverButton && !isInButtonArea && Math.random() > 0.85) {
      const newImage = {
        id: imageCounter.current++,
        x: x - 40,
        y: y - 40,
        src: cursorImageUrls[Math.floor(Math.random() * cursorImageUrls.length)],
        opacity: 1
      };

      setCursorImages(prev => [...prev, newImage]);

      setTimeout(() => {
        setCursorImages(prev => prev.filter(img => img.id !== newImage.id));
      }, 2000);
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCaseStudy(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // WhatsApp contact function
  const handleWhatsAppContact = () => {
    window.open('https://wa.link/j3cts5', '_blank');
  };

  // Mobile Navigation Menu
  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <div className="text-xl font-bold">{currentText.name}</div>
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
              <motion.button
                onClick={() => scrollToSection('tools')}
                className="text-3xl font-bold text-left hover:text-gray-300 transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Tools
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('process')}
                className="text-3xl font-bold text-left hover:text-gray-300 transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Process
              </motion.button>
              
              <motion.a
                href="/Naum_resume.pdf"
                download="Naum_resume.pdf"
                className="text-3xl font-bold text-left hover:text-gray-300 transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </motion.a>
            </div>
            
            <div className="p-6">
              <motion.button
                onClick={handleWhatsAppContact}
                className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentText.contact}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Design Tools with actual logos
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Menu */}
      <MobileMenu />

      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="text-lg sm:text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              {currentText.name}
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
            
            {/* Desktop Contact Button */}
            <motion.button 
              onClick={handleWhatsAppContact}
              className="hidden md:block bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-all text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentText.contact}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center relative overflow-hidden"
        onMouseMove={!isMobile ? handleMouseMove : undefined}
      >
        {/* Dynamic Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{ y: yBg }}
        />
        
        {/* Cursor Images (Desktop Only) */}
        {!isMobile && (
          <AnimatePresence>
            {cursorImages.map((image) => (
              <motion.img
                key={image.id}
                src={image.src}
                alt="Design element"
                className="absolute max-w-20 max-h-20 rounded-lg object-contain pointer-events-none z-30"
                style={{
                  left: `${image.x}px`,
                  top: `${image.y}px`,
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  rotate: -15 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  rotate: 10 
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              />
            ))}
          </AnimatePresence>
        )}
        
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Enhanced Hero Content */}
          <div className="text-center space-y-6 sm:space-y-10 mb-16 sm:mb-24">
            {/* Greeting Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for Hire
            </motion.div>

            {/* Main Title with Gradient */}
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {currentText.greeting}
              </span>
            </motion.h1>
            
            {/* Enhanced CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.button 
                onClick={() => scrollToSection('tools')}
                className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Tools
                <ArrowDown className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </motion.button>
              
              <motion.a 
                href="/Naum_resume.pdf"
                download="Naum_resume.pdf"
                className="border border-gray-600 hover:border-gray-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/5 transition-all inline-flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
                <Download className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </motion.a>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="flex justify-center items-center gap-4 sm:gap-8 pt-6 sm:pt-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">3+</div>
                <div className="text-xs sm:text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">20+</div>
                <div className="text-xs sm:text-sm text-gray-400">Read Books</div>
              </div>
              <div className="w-px h-8 sm:h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">15+</div>
                <div className="text-xs sm:text-sm text-gray-400">Projects Completed</div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Hero Visual */}
          <motion.div 
            className="relative px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl relative">
              <img 
                src="https://i.ibb.co/xS0T4RnN/Untitled-5.png"
                alt="Design showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
              
              {/* Enhanced Floating UI Elements */}
              <motion.div 
                className="absolute top-3 left-3 sm:top-6 lg:top-8 sm:left-6 lg:left-8 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Palette className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-3 right-3 sm:top-6 lg:top-8 sm:right-6 lg:right-8 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-3 left-3 sm:bottom-6 lg:bottom-8 sm:left-6 lg:left-8 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" />
                  <div className="text-white text-xs sm:text-sm font-medium">50K+ Users</div>
                </div>
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-xl -z-10 opacity-50"></div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 sm:py-32 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Tools I use
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Crafting with industry-leading software
            </p>
          </motion.div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
            {designTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="group p-4 sm:p-8 bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {tool.logo}
                </div>
                <div className="text-center text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
                  {tool.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsShowcase/>

      <DesignGallery/>

      {/* Contact Section */}
      <section className="py-16 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              Let's work together
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Ready to create something amazing? I'm available for new projects and collaborations.
            </p>
            
            <motion.button 
              onClick={handleWhatsAppContact}
              className="bg-white text-black px-8 sm:px-12 py-4 sm:py-6 rounded-full font-semibold text-lg sm:text-xl hover:bg-gray-100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-lg sm:text-2xl font-bold">{currentText.name}</div>
            <div className="flex gap-6 sm:gap-8">
              <a 
                href="mailto:mahlatse.modiba@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                Email
              </a>
              <a 
                href="https://www.linkedin.com/in/naummodiba/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPortfolio;