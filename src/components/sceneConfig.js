// Scene configuration for cleaner management
export const sceneDurations = [
  6000, // "I'm Naum" - full name entrance experience  
  9000, // Professional roles cycling - 3 roles × 2.5s + extra buffer
  6000, // "Over the last 3 years" - each word needs time
  7000, // "I've helped early-stage startups" - multi-line with bounce
  5000, // "design agencies" - two-word color animation
  4000, // "ambitious founders" - repeating lines animation
  5000, // Portfolio project 1
  5000, // Portfolio project 2  
  5000, // Portfolio project 3
  5000, // Portfolio project 4
  5000, // Portfolio project 5
  0     // CTA (end)
];

export const sceneConfig = [
  {
    key: "im-naum", 
    duration: 6000,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, x: 100, rotateY: 15 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      exit: { opacity: 0, y: -100, scale: 0.8, rotateX: 20 }
    }
  },
  {
    key: "professional-roles",
    duration: 9000,
    bg: "bg-gray-900", 
    type: "cycling",
    transitions: {
      initial: { opacity: 0, y: 100, rotateX: -20 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
      exit: { opacity: 0, scale: 0.5, rotateZ: 10, x: -200 }
    }
  },
  {
    key: "over-3-years",
    duration: 6000,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, x: 200, rotateZ: -10 },
      animate: { opacity: 1, x: 0, rotateZ: 0 },
      exit: { opacity: 0, y: -150, scale: 1.1 }
    }
  },
  {
    key: "early-stage-startups",
    duration: 7000,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, y: 150, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, x: -300, rotateY: -30, scale: 0.7 }
    }
  },
  {
    key: "design-agencies",
    duration: 5000,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, x: 300, rotateY: 30 },
      animate: { opacity: 1, x: 0, rotateY: 0 },
      exit: { opacity: 0, scale: 1.3, rotateZ: -5, y: -100 }
    }
  },
  {
    key: "ambitious-founders",
    duration: 4000,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, y: 100, scale: 1.3, rotateZ: 5 },
      animate: { opacity: 1, y: 0, scale: 1, rotateZ: 0 },
      exit: { opacity: 0, x: -400, rotateX: 45, scale: 0.6 }
    }
  },
  {
    key: "portfolio-1",
    duration: 5000,
    bg: "bg-gray-900",
    type: "project",
    projectIndex: 0
  },
  {
    key: "portfolio-2", 
    duration: 5000,
    bg: "bg-gray-900",
    type: "project",
    projectIndex: 1
  },
  {
    key: "portfolio-3",
    duration: 5000,
    bg: "bg-gray-900", 
    type: "project",
    projectIndex: 2
  },
  {
    key: "portfolio-4",
    duration: 5000,
    bg: "bg-gray-900",
    type: "project", 
    projectIndex: 3
  },
  {
    key: "portfolio-5",
    duration: 5000,
    bg: "bg-gray-900",
    type: "project",
    projectIndex: 4
  },
  {
    key: "final-cta",
    duration: 0,
    bg: "bg-gray-900",
    type: "text",
    transitions: {
      initial: { opacity: 0, scale: 0.5, rotateX: 45 },
      animate: { opacity: 1, scale: 1, rotateX: 0 },
      exit: { opacity: 0, scale: 1.5, rotateZ: 10 }
    }
  }
];

// Project image configuration
export const projectImages = {
  mobile: [
    '', // Project 1 mobile image
    '', // Project 2 mobile image  
    '', // Project 3 mobile image
    '', // Project 4 mobile image
    ''  // Project 5 mobile image
  ],
  desktop: [
    'https://i.ibb.co/wZ6NKqwj/Desktop-1-7.png', // Project 1 desktop image
    'https://i.ibb.co/Lz9v7KMb/Screenshot-2025-07-24-175639.png', // Project 2 desktop image
    'https://i.ibb.co/kRMBBfm/Desktop-1-8.png', // Project 3 desktop image  
    'https://i.ibb.co/Df71qZZn/Screenshot-2025-07-14-101501.png', // Project 4 desktop image
    'https://i.ibb.co/nNpR5TTd/Mac-Book-Air-2.png'  // Project 5 desktop image
  ]
};

// Project URLs for navigation
export const projectUrls = [
  '/portfolio/project-1', // Project 1 URL
  '/portfolio/project-2', // Project 2 URL  
  '/portfolio/project-3', // Project 3 URL
  '/portfolio/project-4', // Project 4 URL
  '/portfolio/project-5'  // Project 5 URL
];

export const totalScenes = sceneConfig.length;