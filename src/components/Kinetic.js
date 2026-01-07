import React, { useState } from 'react';
import SceneRenderer from './SceneRenderer';
import PortfolioControls from './PortfolioControls';
import useScenePlayer from './useScenePlayer';
import { totalScenes, sceneDurations } from './sceneConfig';
import './PortfolioIntro.css';

/**
 * Main Portfolio Introduction Component
 * Refactored for better maintainability and performance
 */
const PortfolioIntro = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Use custom hook for scene management
  const [currentScene, setCurrentScene, playerControls] = useScenePlayer({
    totalScenes,
    durations: sceneDurations,
    isPlaying,
    setIsPlaying
  });

  // Enhanced player controls with play/pause state management
  const enhancedPlayerControls = {
    ...playerControls,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    restart: () => {
      setCurrentScene(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Scene Renderer - Handles all scene logic */}
      <SceneRenderer currentScene={currentScene} />

      {/* Portfolio Controls - Player interface */}
      <PortfolioControls 
        isPlaying={isPlaying}
        playerControls={enhancedPlayerControls}
        currentScene={currentScene}
        totalScenes={totalScenes}
      />
    </div>
  );
};

export default PortfolioIntro;