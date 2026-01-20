import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Scene wrapper for professional layout structure
export const SceneWrapper = ({ 
  children, 
  className = "",
  centered = true,
  maxWidth = "max-w-4xl",
  padding = "px-4 py-16 md:py-24",
  sceneKey,
  ...motionProps
}) => (
  <motion.div
    key={sceneKey}
    className={`w-full h-full ${centered ? 'flex items-center justify-center' : ''}`}
    {...motionProps}
  >
    <div className={`w-full ${maxWidth} mx-auto ${padding} ${className}`}>
      {children}
    </div>
  </motion.div>
);

// Reduced kinetic text usage - simpler fade for supporting text
export const SoftFadeIn = ({ 
  children, 
  delay = 0.3, 
  direction = "up",
  className = "",
  distance = 30,
  ...props 
}) => (
  <motion.div
    initial={{ 
      opacity: 0, 
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0
    }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, y: direction === "up" ? -20 : 20 }}
    transition={{ 
      delay, 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Enhanced glassmorphism card for projects
export const GlassmorphismCard = ({ 
  children, 
  className = "",
  hover = true,
  variant = "default", // "default", "project", "cta"
  ...props 
}) => {
  const variants = {
    default: "bg-white/5 backdrop-blur-md border-white/10",
    project: "bg-white/8 backdrop-blur-lg border-white/15 shadow-2xl",
    cta: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-300/20"
  };

  return (
    <motion.div
      className={`
        ${variants[variant]} rounded-2xl p-6 shadow-lg 
        border transition-all duration-300
        ${hover ? 'hover:bg-white/10 hover:shadow-xl hover:border-white/20 hover:scale-[1.02]' : ''}
        ${className}
      `}
      whileHover={hover ? { 
        y: -5,
        transition: { duration: 0.2 }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Split screen layout for premium sections
export const SplitScreenLayout = ({ 
  leftContent, 
  rightContent, 
  leftWidth = "lg:w-2/3",
  rightWidth = "lg:w-1/3",
  gap = "gap-12",
  className = "",
  reverse = false
}) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center ${gap} ${className}`}>
    <div className={`w-full ${leftWidth} flex-shrink-0`}>
      {leftContent}
    </div>
    <div className={`w-full ${rightWidth} flex items-center justify-center`}>
      {rightContent}
    </div>
  </div>
);

// Improved role cycling with better UX
export const InteractiveRolesCycler = ({ 
  roles, 
  currentIndex, 
  onRoleChange,
  className = "" 
}) => (
  <div className={`relative ${className}`}>
    <div className="flex items-center justify-center gap-4 mb-4">
      {roles.map((_, index) => (
        <button
          key={index}
          onClick={() => onRoleChange(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentIndex 
              ? 'bg-white scale-125' 
              : 'bg-white/30 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
    
    <div className="text-center">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xl md:text-2xl font-light tracking-wide text-white uppercase"
      >
        {roles[currentIndex]}
      </motion.div>
    </div>
  </div>
);

// Enhanced project showcase with better visual hierarchy
export const ProjectShowcase = ({ 
  projectIndex,
  mobileImage,
  desktopImage,
  projectUrl,
  title,
  description,
  className = ""
}) => (
  <GlassmorphismCard variant="project" className={`relative overflow-hidden ${className}`}>
    {/* Project Images Container */}
    <div className="relative mb-6">
      <motion.div 
        className="relative"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        {/* Desktop mockup */}
        <div className="relative">
          {desktopImage ? (
            <img 
              src={desktopImage}
              alt={`${title} - Desktop`}
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-48 md:h-64 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="text-lg font-semibold mb-2">Project {projectIndex + 1}</div>
                <div className="text-sm">Desktop Preview</div>
              </div>
            </div>
          )}
          
          {/* Mobile mockup overlay */}
          <div className="absolute -bottom-4 -right-4 w-20 md:w-24">
            {mobileImage ? (
              <img 
                src={mobileImage}
                alt={`${title} - Mobile`}
                className="w-full rounded-md shadow-xl border-2 border-white/20"
              />
            ) : (
              <div className="w-full aspect-[9/16] bg-gradient-to-b from-purple-800/40 to-pink-800/40 rounded-md border-2 border-white/20 flex items-center justify-center">
                <div className="text-xs text-white/60 text-center">Mobile</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>

    {/* Project Info */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {title || `Project ${projectIndex + 1}`}
        </h3>
        <span className="text-sm text-white/60">
          {String(projectIndex + 1).padStart(2, '0')} / 05
        </span>
      </div>
      
      {description && (
        <p className="text-white/80 text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>

    {/* Navigation Button */}
    <motion.button 
      className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 
                 rounded-full flex items-center justify-center backdrop-blur-sm
                 border border-white/20 transition-all duration-300"
      onClick={() => projectUrl && window.open(projectUrl, '_blank')}
      whileHover={{ scale: 1.1, rotate: 45 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  </GlassmorphismCard>
);

// Enhanced CTA section with split layout
export const PremiumCTA = ({ 
  title,
  subtitle,
  buttonText,
  onButtonClick,
  className = ""
}) => (
  <div className={`w-full ${className}`}>
    <SplitScreenLayout
      leftContent={
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-light leading-tight">
              {title}
            </h2>
          </motion.div>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-white/80 font-light"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      }
      rightContent={
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
          className="w-full flex justify-center"
        >
          <motion.button 
            onClick={onButtonClick}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-medium rounded-full shadow-lg
                       backdrop-blur-sm border border-white/20
                       hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonText}
          </motion.button>
        </motion.div>
      }
      reverse={true}
    />
  </div>
);

// Legacy components for backward compatibility
export const FadeSlideIn = ({ 
  children, 
  delay = 0.3, 
  direction = "up",
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ 
      opacity: 0, 
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0
    }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    exit={{ 
      opacity: 0, 
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0
    }}
    transition={{ delay, duration: 1.0, ease: "easeOut", type: "spring" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ 
  children, 
  delay = 0.3, 
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.2 }}
    transition={{ delay, duration: 1.0, type: "spring", bounce: 0.4 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideRotate = ({ 
  children, 
  delay = 0.3, 
  slideFrom = "left",
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ 
      opacity: 0,
      x: slideFrom === "left" ? -200 : slideFrom === "right" ? 200 : 0,
      y: slideFrom === "up" ? -150 : slideFrom === "down" ? 150 : 0,
      rotateZ: slideFrom === "left" ? -10 : slideFrom === "right" ? 10 : 0
    }}
    animate={{ 
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0
    }}
    exit={{ 
      opacity: 0,
      x: slideFrom === "left" ? 150 : slideFrom === "right" ? -150 : 0,
      y: slideFrom === "up" ? 100 : slideFrom === "down" ? -100 : 0,
      scale: slideFrom === "up" || slideFrom === "down" ? 1.1 : 0.9
    }}
    transition={{ delay, duration: 0.9, type: "spring" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const ProjectTransition = ({ 
  children, 
  sceneIndex,
  className = "",
  ...props 
}) => (
  <motion.div
    initial={{ 
      opacity: 0, 
      scale: 1.1,
      rotateY: sceneIndex % 2 === 0 ? 15 : -15
    }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      rotateY: 0
    }}
    exit={{ 
      opacity: 0, 
      scale: 0.9,
      rotateZ: sceneIndex % 2 === 0 ? 3 : -3,
      x: sceneIndex % 2 === 0 ? -150 : 150
    }}
    transition={{ duration: 1.0, type: "spring", damping: 20 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// Export all components
const AnimationWrappers = {
  SceneWrapper,
  SoftFadeIn,
  GlassmorphismCard,
  SplitScreenLayout,
  InteractiveRolesCycler,
  ProjectShowcase,
  PremiumCTA,
  FadeSlideIn,
  ScaleIn,
  SlideRotate,
  ProjectTransition
};

export default AnimationWrappers;