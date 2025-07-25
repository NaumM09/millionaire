import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {  
  NameScene, 
  ProfessionalRolesScene, 
  TimelineScene,
  StartupsScene,
  DesignAgenciesScene,
  AmbitiousFoundersScene,
  PortfolioProjectScene,
  CTAScene
} from './PortfolioScenes';
import { SceneWrapper } from './AnimationWrappers';
import { sceneConfig } from './sceneConfig';

const SceneRenderer = ({ currentScene }) => {
  const scene = sceneConfig[currentScene];
  
  if (!scene) return null;

  // Scene component mapping
  const sceneComponents = {
    "im-naum": NameScene,
    "professional-roles": ProfessionalRolesScene,
    "over-3-years": TimelineScene,
    "early-stage-startups": StartupsScene,
    "design-agencies": DesignAgenciesScene,
    "ambitious-founders": AmbitiousFoundersScene,
    "portfolio-1": () => <PortfolioProjectScene projectIndex={0} />,
    "portfolio-2": () => <PortfolioProjectScene projectIndex={1} />,
    "portfolio-3": () => <PortfolioProjectScene projectIndex={2} />,
    "portfolio-4": () => <PortfolioProjectScene projectIndex={3} />,
    "portfolio-5": () => <PortfolioProjectScene projectIndex={4} />,
    "final-cta": CTAScene
  };

  const SceneComponent = sceneComponents[scene.key];
  
  if (!SceneComponent) {
    console.warn(`Scene component not found for key: ${scene.key}`);
    return null;
  }

  // Get transitions for current scene
  const transitions = scene.transitions || {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      <SceneWrapper
        sceneKey={scene.key}
        className={`absolute inset-0 flex items-center justify-center ${scene.bg}`}
        initial={transitions.initial}
        animate={transitions.animate}
        exit={transitions.exit}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      >
        <SceneComponent />
      </SceneWrapper>
    </AnimatePresence>
  );
};

export default SceneRenderer;