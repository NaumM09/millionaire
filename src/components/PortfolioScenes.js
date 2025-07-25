import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KineticText from './KineticText';
import {  
  ProjectTransition,
  SoftFadeIn,
  InteractiveRolesCycler,
  PremiumCTA 
} from './AnimationWrappers';
import { projectImages, projectUrls } from './sceneConfig';


export const NameScene = () => (
  <div className="w-full h-full flex items-center justify-center p-6 md:p-12 relative">
    
    {/* Editorial corners */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-8 left-8 w-1 h-1 bg-white/20 rounded-full" />
      <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full" />
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/20 rounded-full" />
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/20 rounded-full" />
    </div>

    <div className="relative z-10 w-full max-w-6xl">
      
      {/* Header */}
      <motion.div
        className="text-center mb-8 text-white/30 text-xs font-mono uppercase tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Hello!
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Portrait - Prominent display */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
        >
          <div className="relative">
            {/* Main portrait */}
            <img 
              src="https://i.ibb.co/NdZX9LsB/IMG-2581-1.jpg"
              alt="Naum Nakar"
              className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Frame effect */}
            <div className="absolute -inset-2 border-2 border-white/10 rounded-3xl" />
            
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* Typography */}
        <div className="text-center lg:text-left space-y-6">
          
          {/* "I'm" */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/70 font-thin"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              letterSpacing: "0.1em"
            }}
          >
            I'm
          </motion.div>

          {/* "NAUM" */}
          <motion.h1
            initial={{ opacity: 0, x: 80, rotateZ: 5 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 1.0, duration: 1.0, type: "spring", bounce: 0.3 }}
            className="text-white font-black uppercase leading-none"
            style={{
              fontSize: "clamp(4rem, 12vw, 8rem)",
              letterSpacing: "-0.08em",
              fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
              fontStretch: "ultra-condensed",
              textShadow: "0 8px 32px rgba(255,255,255,0.2)"
            }}
          >
            NAUM
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-white/60 text-base leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Digital Architect crafting meaningful experiences at the 
            intersection of design and technology.
          </motion.p>
        </div>
      </div>
    </div>
  </div>
);


export const ProfessionalRolesScene = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  
  const roles = [
    {
      text: "UI/UX DESIGNER",
      gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", // Clean, modern, elegant
      fontWeight: 300,
      letterSpacing: "0.08em", // Spacious for elegance
      personality: "elegant"
    },
    {
      text: "FRONTEND DEVELOPER", 
      gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', monospace", // Code-focused
      fontWeight: 700,
      letterSpacing: "-0.02em", // Tight, technical
      personality: "technical"
    },
    {
      text: "DIGITAL MARKETER",
      gradient: "linear-gradient(135deg, #10b981, #f59e0b)",
      fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif", // Bold, confident
      fontWeight: 800,
      letterSpacing: "0.05em", // Confident spacing
      personality: "bold"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 3500);
    
    return () => clearInterval(timer);
  }, [roles.length]);

  const currentRole = roles[roleIndex];

  return (
    <div 
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
        position: 'relative',
        padding: '2rem'
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
        
        {/* "I'm a" prefix */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 100,
            marginBottom: '2rem',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            letterSpacing: '0.1em',
            fontFamily: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          I'm a
        </motion.div>

        {/* Main role text with unique font personalities */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`role-${roleIndex}`}
            initial={{ 
              opacity: 0, 
              y: 100, 
              rotateX: -45,
              scale: 0.8 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              y: -100, 
              rotateX: 45,
              scale: 0.8 
            }}
            transition={{
              duration: 1.0,
              type: "spring",
              damping: 16,
              stiffness: 100
            }}
            style={{
              background: currentRole.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontFamily: currentRole.fontFamily,
              fontWeight: currentRole.fontWeight,
              textTransform: 'uppercase',
              fontSize: 'clamp(3.5rem, 15vw, 8rem)',
              letterSpacing: currentRole.letterSpacing,
              fontStretch: currentRole.personality === 'technical' ? 'normal' : 'ultra-condensed',
              lineHeight: currentRole.personality === 'technical' ? 0.9 : 0.85,
              margin: 0,
              // Add personality-specific transforms
              transform: currentRole.personality === 'elegant' ? 'rotate(-0.5deg)' : 
                        currentRole.personality === 'technical' ? 'rotate(0deg)' : 
                        'rotate(0.5deg)'
            }}
          >
            {currentRole.text}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
};


export const TimelineScene = () => (
  <div className="w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-20 relative">
    
    {/* Subtle floating particles for ambiance */}
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1.5 }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>

    {/* Main timeline text */}
    <motion.div
      initial={{ opacity: 0, y: 120, rotateX: -45, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ 
        delay: 0.6, 
        duration: 1.2, 
        type: "spring", 
        damping: 16,
        stiffness: 80
      }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        transition: { duration: 0.3 }
      }}
      className="text-white uppercase font-black text-center cursor-pointer relative z-10"
      style={{
        fontSize: "clamp(3rem, 10vw, 6.5rem)",
        lineHeight: 0.85,
        letterSpacing: "-0.05em",
        fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
        fontStretch: "ultra-condensed",
        textShadow: "0 8px 32px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.1)"
      }}
    >
      <KineticText 
        text="OVER THE LAST 3 YEARS" 
        type="word"
        delay={1.0}
        stagger={0.2}
        direction="up"
        animationType="elastic"
      />
      
      {/* Subtle accent line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ width: "clamp(200px, 60vw, 500px)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1.8, ease: "easeOut" }}
      />
    </motion.div>

    {/* Optional: Editorial accent elements */}
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-white/20 text-xs font-mono uppercase tracking-widest"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <span>Journey</span>
      <motion.div
        className="w-6 h-px bg-white/20"
        animate={{ scaleX: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span>Experience</span>
    </motion.div>
  </div>
);

export const StartupsScene = () => (
  <div className="w-full h-full flex flex-col items-start justify-center px-6 md:px-12 lg:px-20">
    <div className="space-y-8 max-w-6xl">
      
      {/* Line 1: I'VE WORKED WITH - Bold opener */}
      <motion.div
        initial={{ opacity: 0, x: -120, rotateZ: -2 }}
        animate={{ opacity: 1, x: 0, rotateZ: 0 }}
        transition={{ 
          delay: 0.6, 
          duration: 1.1, 
          type: "spring", 
          damping: 18,
          stiffness: 80
        }}
        whileHover={{
          x: 10,
          rotateZ: 1,
          transition: { duration: 0.3 }
        }}
        className="text-white font-black uppercase cursor-pointer"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          fontStretch: "ultra-condensed",
          textShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        I'VE WORKED WITH
      </motion.div>

      {/* Line 2: EARLY-STAGE + STARTUPS - Dynamic layout */}
      <div className="flex items-baseline gap-6 flex-wrap">
        
        {/* EARLY-STAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateZ: 3 }}
          animate={{ opacity: 1, y: 0, rotateZ: -1 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.9, 
            type: "spring",
            damping: 20,
            stiffness: 100
          }}
          whileHover={{
            scale: 1.02,
            rotateZ: -3,
            transition: { duration: 0.2 }
          }}
          className="text-white font-black uppercase cursor-pointer"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 6rem)",
            lineHeight: 0.8,
            letterSpacing: "-0.06em",
            fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            fontStretch: "ultra-condensed"
          }}
        >
          <KineticText 
            text="EARLY-STAGE" 
            className="text-white"
            type="word"
            delay={1.4}
            stagger={0.15}
            direction="up"
            animationType="elastic"
          />
        </motion.div>

        {/* STARTUPS - Highlighted with color and motion */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            delay: 1.8, 
            duration: 1.0, 
            type: "spring",
            damping: 16,
            stiffness: 90
          }}
          whileHover={{
            scale: 1.05,
            rotateZ: 2,
            transition: { duration: 0.3 }
          }}
          className="text-cyan-400 font-black uppercase cursor-pointer relative"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            lineHeight: 0.75,
            letterSpacing: "-0.08em",
            fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            fontStretch: "ultra-condensed",
            textShadow: "0 0 20px rgba(6, 182, 212, 0.4)"
          }}
        >
          <KineticText 
            text="STARTUPS" 
            className="text-cyan-400"
            type="char"
            delay={2.0}
            stagger={0.08}
            direction="up"
            animationType="bounce"
          />
          
          {/* Kinetic underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-cyan-400/40"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Optional: Editorial accent */}
      <motion.div
        className="flex items-center space-x-4 text-white/30 text-sm font-mono uppercase tracking-widest mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span>Portfolio</span>
        <motion.div
          className="w-8 h-px bg-white/20"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <span>Experience</span>
      </motion.div>
    </div>
  </div>
);

export const DesignAgenciesScene = () => {
  const designLetters = "DESIGN".split("");
  
  // High-quality design-related images for masking
  const letterImages = [
    "https://i.ibb.co/jkvX6fV9/clay-banks-8-SXa-MMWCTGc-unsplash.jpg", // Creative workspace - D
    "https://i.ibb.co/Y7vSV0Km/shifaaz-shamoon-o-R0u-ERTVy-D0-unsplash.jpg", // Design tools - E
    "https://images.unsplash.com/photo-1600095355173-b970ea5ceb46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvY2t8ZW58MHx8MHx8fDA%3D", // Color palette - S
    "https://images.unsplash.com/photo-1516821371801-280cf8069a4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxuYXR1cmV8ZW58MHx8MHx8fDA%3D", // Digital design - I
    "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxuYXR1cmV8ZW58MHx8MHx8fDA%3D", // Graphics tablet - G
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxuYXR1cmV8ZW58MHx8MHx8fDA%3D"  // Creative process - N
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* DESIGN - Large text with image masks */}
      <motion.div
        className="flex items-center justify-center flex-wrap gap-1 md:gap-2 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {designLetters.map((letter, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden group cursor-pointer"
            initial={{ 
              scale: 0.5,
              rotateY: -90,
              opacity: 0 
            }}
            animate={{ 
              scale: 1,
              rotateY: 0,
              opacity: 1 
            }}
            transition={{ 
              delay: i * 0.1, 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            {/* The masked text */}
            <span
              className="inline-block font-black uppercase leading-none select-none"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "-0.05em",
                // This is the key: mask the image with the text shape
                background: `url(${letterImages[i]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                // Add a subtle text shadow for depth
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                // Ensure the background moves slightly on hover
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                // Subtle background position shift on hover
                e.target.style.backgroundPosition = `${45 + Math.random() * 10}% ${45 + Math.random() * 10}%`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundPosition = 'center';
              }}
            >
              {letter}
            </span>
            
            {/* Optional: Outline stroke for better definition */}
            <span
              className="absolute inset-0 font-black uppercase leading-none pointer-events-none opacity-20"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "-0.05em",
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                textStroke: '1px rgba(255,255,255,0.3)'
              }}
            >
              {letter}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* AGENCIES - Clean, contrasting typography */}
      <motion.div
        className="text-center mb-6 md:mb-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2
          className="text-white uppercase leading-none"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 100,
            letterSpacing: "0.2em",
            fontStretch: "expanded"
          }}
        >
          AGENCIES
        </h2>
        
        {/* Elegant underline */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent mt-4"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 1.5 }}
        />
      </motion.div>
    </div>
  );
};


export const AmbitiousFoundersScene = () => {
  const words = [
    { text: "AMBITIOUS", color: "text-purple-400", rotate: -4, y: -20, delay: 0.2 },
    { text: "FOUNDERS", color: "text-white", rotate: 2, y: 10, delay: 0.4 },
    { text: "BUILDING BIG", color: "text-cyan-300", rotate: -2, y: 30, delay: 0.6 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-start justify-center px-6 md:px-12 lg:px-20">
      {words.map((word, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: i % 2 === 0 ? -200 : 200,
            rotateZ: i % 2 === 0 ? -15 : 15
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            rotateZ: word.rotate
          }}
          transition={{
            delay: word.delay,
            duration: 1.2,
            type: "spring",
            damping: 16,
            stiffness: 80,
          }}
          whileHover={{
            scale: 1.02,
            rotateZ: word.rotate + (i % 2 === 0 ? -2 : 2),
            transition: { duration: 0.3 }
          }}
          className={`
            font-black uppercase ${word.color} cursor-pointer
            relative overflow-hidden
          `}
          style={{
            fontSize: "clamp(3.5rem, 15vw, 8rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
            fontFamily: "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
            fontStretch: "ultra-condensed",
            marginBottom: `${word.y}px`,
            textShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          {word.text}
          
          {/* Subtle highlight effect on hover */}
          <motion.div
            className="absolute inset-0 bg-white/5 pointer-events-none opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}
      
      {/* Optional: Small editorial accent */}
      <motion.div
        className="mt-8 flex items-center space-x-3 text-white/40 text-sm font-mono uppercase tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <span>Portfolio</span>
        <div className="w-6 h-px bg-white/30" />
        <span>2025</span>
      </motion.div>
    </div>
  );
};

export const PortfolioProjectScene = ({ projectIndex }) => {
  const currentMobileImage = projectImages.mobile[projectIndex];
  const currentDesktopImage = projectImages.desktop[projectIndex];
  const currentProjectUrl = projectUrls[projectIndex];

  // Project metadata - you can customize these
  const projectTitles = [
    "E-Commerce Platform",
    "Banking Application", 
    "Design System",
    "Marketing Website",
    "Mobile App"
  ];

  const projectTypes = [
    "Full-Stack Development",
    "UI/UX Design",
    "Frontend Development", 
    "Brand Identity",
    "Mobile Experience"
  ];

  const handleRedirect = () => {
    console.log(`Redirecting to: ${currentProjectUrl}`);
    // Uncomment when ready:
    // window.location.href = currentProjectUrl;
  };

  return (
    <ProjectTransition sceneIndex={projectIndex} className="project-container">
      
      {/* Floating ambient decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Scene intro text */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
          Portfolio / Project {String(projectIndex + 1).padStart(2, '0')}
        </div>
        <motion.h3
          className="text-white font-light text-lg md:text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {projectTitles[projectIndex] || `Project ${projectIndex + 1}`}
        </motion.h3>
      </motion.div>

      {/* Navigation Arrow - Enhanced */}
      <motion.button 
        className="nav-button project-nav-button"
        initial={{ opacity: 0, y: -30, rotate: -45 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        whileHover={{ 
          scale: 1.15, 
          rotate: 45,
          backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRedirect}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Glassmorphic image container */}
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
      >
        {/* Glassmorphic backdrop */}
        <motion.div
          className="absolute inset-4 md:inset-8 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        />

        {/* Project Images with enhanced container */}
        <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
          {/* Mobile Image */}
          {currentMobileImage ? (
            <motion.img 
              src={currentMobileImage}
              alt={`Portfolio Project ${projectIndex + 1} - Mobile`}
              className="project-image-mobile"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
          ) : (
            <div className="project-image-mobile bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center rounded-2xl border border-white/10">
              <div className="project-placeholder">
                <motion.div 
                  className="project-placeholder-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Project {projectIndex + 1}
                </motion.div>
                <motion.div 
                  className="project-placeholder-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Add mobile image URL
                </motion.div>
                <motion.div 
                  className="project-placeholder-code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  mobileProjectImages[{projectIndex}] = 'mobile-image-url'
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Desktop Image */}
          {currentDesktopImage ? (
            <motion.img 
              src={currentDesktopImage}
              alt={`Portfolio Project ${projectIndex + 1} - Desktop`}
              className="project-image-desktop"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
          ) : (
            <div className="project-image-desktop bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center rounded-2xl border border-white/10">
              <div className="project-placeholder">
                <motion.div 
                  className="project-placeholder-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Project {projectIndex + 1}
                </motion.div>
                <motion.div 
                  className="project-placeholder-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  Add desktop image URL
                </motion.div>
                <motion.div 
                  className="project-placeholder-code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  desktopProjectImages[{projectIndex}] = 'desktop-image-url'
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Project metadata text */}
      <motion.div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <div className="space-y-2">
          <div className="text-white/60 text-sm font-light">
            {projectTypes[projectIndex] || "Creative Project"}
          </div>
          <div className="text-white/40 text-xs font-mono uppercase tracking-wider">
            {new Date().getFullYear()} • Interactive Design
          </div>
        </div>
      </motion.div>

      {/* Enhanced project counter */}
      <motion.div 
        className="project-counter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex items-center space-x-3">
          <span>{String(projectIndex + 1).padStart(2, '0')} / 05</span>
          <div className="w-8 h-px bg-white/20" />
          <div className="w-1 h-1 bg-white/40 rounded-full" />
        </div>
      </motion.div>

      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
    </ProjectTransition>
  );
};

// Enhanced CTA Scene with premium split-screen layout
export const CTAScene = () => {
  const handleButtonClick = () => {
    // Add your contact/portfolio action here
    console.log('CTA button clicked - redirect to contact');
    // window.open('mailto:mahlatse.modiba@gmail.com', '_blank');
    // or navigate to contact page
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <PremiumCTA
        title={
          <div className="space-y-4">
            <SoftFadeIn delay={0.3}>
              <span className="text-white font-light">Ready for your</span>
            </SoftFadeIn>
            <SoftFadeIn delay={0.6}>
              <span className="text-white">next </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium">
                creative
              </span>
            </SoftFadeIn>
            <SoftFadeIn delay={0.9}>
              <span className="text-white font-light">partner?</span>
            </SoftFadeIn>
          </div>
        }
        subtitle="Let's build something extraordinary together"
        buttonText="Let's create magic"
        onButtonClick={handleButtonClick}
        className="max-w-6xl"
      />
    </div>
  );
};

// Alternative enhanced roles scene (you can swap this in to test)
export const EnhancedProfessionalRolesScene = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["UI/UX Designer", "Frontend Developer", "Digital Marketer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 3500);
    
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleRoleChange = (newIndex) => {
    setRoleIndex(newIndex);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <InteractiveRolesCycler
            roles={roles}
            currentIndex={roleIndex}
            onRoleChange={handleRoleChange}
            className="mb-6"
          />

          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, rotateX: -20 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              damping: 20,
              stiffness: 100
            }}
            className="relative"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200">
                {roles[roleIndex]}
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg font-light mt-4"
            >
              {roleIndex === 0 && "Designing intuitive user experiences"}
              {roleIndex === 1 && "Building responsive web applications"}
              {roleIndex === 2 && "Growing brands through digital strategy"}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};