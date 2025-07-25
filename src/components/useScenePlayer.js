import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Enhanced hook for managing scene player state with mobile auto-play optimization
 * @param {Object} config - Configuration object
 * @param {number} config.totalScenes - Total number of scenes
 * @param {Array} config.durations - Array of scene durations in milliseconds
 * @param {boolean} config.autoPlayOnMobile - Whether to auto-play on mobile devices (default: true)
 * @param {boolean} config.loopOnMobile - Whether to loop scenes on mobile (default: true)
 * @param {boolean} config.pauseOnInteraction - Whether to pause when user interacts (default: true)
 * @returns {Array} [currentScene, setCurrentScene, playerControls, isPlaying, isMobile]
 */
export const useScenePlayer = ({ 
  totalScenes, 
  durations, 
  autoPlayOnMobile = true,
  loopOnMobile = true,
  pauseOnInteraction = true
}) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const timerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Mobile detection utility
  const detectMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const isMobileByWidth = window.innerWidth <= 768;
    const isMobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isMobileByWidth || isMobileByAgent || isTouchDevice;
  }, []);

  // Initialize mobile detection and auto-play
  useEffect(() => {
    const mobile = detectMobile();
    setIsMobile(mobile);
    
    // Auto-start on mobile if enabled
    if (mobile && autoPlayOnMobile) {
      setIsPlaying(true);
    }

    // Handle viewport changes
    const handleResize = () => {
      const newMobile = detectMobile();
      setIsMobile(newMobile);
      
      // Start auto-play when switching to mobile
      if (newMobile && !mobile && autoPlayOnMobile && !hasInteracted) {
        setIsPlaying(true);
      }
    };

    // Handle visibility changes (pause when tab is not visible)
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [detectMobile, autoPlayOnMobile, hasInteracted]);

  // Enhanced auto-advance logic with mobile optimizations
  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Don't advance if:
    // - Not playing
    // - Page is not visible
    // - User has interacted and pause on interaction is enabled
    // - At last scene and not looping on mobile
    if (!isPlaying || !isVisible || (hasInteracted && pauseOnInteraction && isMobile)) {
      return;
    }

    // Handle end of sequence
    if (currentScene >= totalScenes - 1) {
      if (isMobile && loopOnMobile) {
        // Loop back to start on mobile
        timerRef.current = setTimeout(() => {
          setCurrentScene(0);
        }, durations[currentScene] || 4000);
      }
      return;
    }

    // Get duration for current scene (with mobile-friendly defaults)
    const duration = durations[currentScene] || (isMobile ? 3000 : 4000);
    
    timerRef.current = setTimeout(() => {
      setCurrentScene(prev => {
        const nextScene = prev + 1;
        
        // Handle looping on mobile
        if (isMobile && loopOnMobile && nextScene >= totalScenes) {
          return 0;
        }
        
        return Math.min(nextScene, totalScenes - 1);
      });
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentScene, isPlaying, durations, totalScenes, isMobile, loopOnMobile, isVisible, hasInteracted, pauseOnInteraction]);

  // Handle user interaction detection
  const handleInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      
      // On mobile, pause for a moment then resume if pause on interaction is enabled
      if (isMobile && pauseOnInteraction) {
        setIsPlaying(false);
        
        // Resume after 5 seconds of no interaction
        if (interactionTimeoutRef.current) {
          clearTimeout(interactionTimeoutRef.current);
        }
        
        interactionTimeoutRef.current = setTimeout(() => {
          setIsPlaying(true);
        }, 5000);
      }
    }
  }, [hasInteracted, isMobile, pauseOnInteraction]);

  // Player control functions
  const playerControls = {
    // Basic controls
    play: () => {
      setIsPlaying(true);
      handleInteraction();
    },
    
    pause: () => {
      setIsPlaying(false);
      handleInteraction();
    },
    
    toggle: () => {
      setIsPlaying(prev => !prev);
      handleInteraction();
    },
    
    restart: () => {
      setCurrentScene(0);
      setIsPlaying(true);
      setHasInteracted(false);
      handleInteraction();
    },
    
    // Navigation controls
    goToScene: (sceneIndex) => {
      if (sceneIndex >= 0 && sceneIndex < totalScenes) {
        setCurrentScene(sceneIndex);
        handleInteraction();
      }
    },
    
    next: () => {
      if (currentScene < totalScenes - 1) {
        setCurrentScene(prev => prev + 1);
      } else if (isMobile && loopOnMobile) {
        setCurrentScene(0);
      }
      handleInteraction();
    },
    
    previous: () => {
      if (currentScene > 0) {
        setCurrentScene(prev => prev - 1);
      } else if (isMobile && loopOnMobile) {
        setCurrentScene(totalScenes - 1);
      }
      handleInteraction();
    },
    
    // Utility functions
    getProgress: () => ((currentScene + 1) / totalScenes) * 100,
    
    getCurrentDuration: () => durations[currentScene] || (isMobile ? 3000 : 4000),
    
    getRemainingTime: () => {
      if (!isPlaying) return 0;
      const duration = durations[currentScene] || (isMobile ? 3000 : 4000);
      // This would need to be calculated based on when the scene started
      return duration;
    },
    
    // State checks
    isLastScene: () => currentScene === totalScenes - 1,
    isFirstScene: () => currentScene === 0,
    canLoop: () => isMobile && loopOnMobile,
    
    // Mobile-specific controls
    enableAutoPlay: () => {
      if (isMobile) {
        setIsPlaying(true);
        setHasInteracted(false);
      }
    },
    
    disableAutoPlay: () => {
      setIsPlaying(false);
      setHasInteracted(true);
    },
    
    // Touch event handlers for mobile
    handleTouchStart: (e) => {
      if (isMobile) {
        handleInteraction();
        // Optional: pause on touch
        if (pauseOnInteraction) {
          setIsPlaying(false);
        }
      }
    },
    
    handleTouchEnd: (e) => {
      if (isMobile && pauseOnInteraction) {
        // Resume after touch ends (with delay)
        if (interactionTimeoutRef.current) {
          clearTimeout(interactionTimeoutRef.current);
        }
        
        interactionTimeoutRef.current = setTimeout(() => {
          setIsPlaying(true);
        }, 2000);
      }
    },
    
    // Swipe navigation for mobile
    handleSwipe: (direction) => {
      if (!isMobile) return;
      
      handleInteraction();
      
      if (direction === 'left') {
        // Swipe left = next scene
        playerControls.next();
      } else if (direction === 'right') {
        // Swipe right = previous scene
        playerControls.previous();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return [
    currentScene, 
    setCurrentScene, 
    playerControls, 
    isPlaying, 
    isMobile,
    hasInteracted,
    isVisible
  ];
};

/**
 * Hook for handling swipe gestures on mobile
 * @param {Object} handlers - Swipe event handlers
 * @param {number} threshold - Minimum distance for swipe (default: 50)
 * @returns {Object} Touch event handlers
 */
export const useSwipeGestures = (handlers = {}, threshold = 50) => {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    e.preventDefault(); // Prevent scrolling while swiping
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping) return;
    setIsSwiping(false);

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Check if it's a valid swipe (distance and speed)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const isValidSwipe = distance > threshold && deltaTime < 500;

    if (isValidSwipe) {
      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight && handlers.onSwipeRight();
        } else {
          handlers.onSwipeLeft && handlers.onSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown && handlers.onSwipeDown();
        } else {
          handlers.onSwipeUp && handlers.onSwipeUp();
        }
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    isSwiping
  };
};

export default useScenePlayer;