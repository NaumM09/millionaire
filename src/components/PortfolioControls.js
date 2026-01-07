import React from 'react';
import { motion } from 'framer-motion';

const PortfolioControls = ({ 
  isPlaying, 
  playerControls, 
  currentScene, 
  totalScenes 
}) => {
  const { restart, play, pause, goToScene, getProgress } = playerControls;

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <>
      {/* Main Controls */}
      <motion.div 
        className="controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0, y: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.button 
          onClick={togglePlayPause}
          className="control-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>
        
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        <motion.button 
          onClick={restart}
          className="control-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↻
        </motion.button>

        <div className="scene-counter">
          {currentScene + 1}/{totalScenes}
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="progress-indicator"
        animate={{ width: `${getProgress()}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Scene Navigation Dots */}
      <motion.div 
        className="scene-dots"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {Array.from({ length: totalScenes }, (_, i) => (
          <motion.button
            key={i}
            className={`scene-dot ${i === currentScene ? 'active' : ''}`}
            onClick={() => goToScene(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default PortfolioControls;