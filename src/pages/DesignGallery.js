import React, { useState, useEffect, useRef } from 'react';

// Tool badge configurations
const toolConfigs = {
  figma: {
    icon: 'F',
    bgColor: 'bg-purple-500/90',
    name: 'Figma'
  },
  GIMP: {
    icon: 'G',
    bgColor: 'bg-blue-600/90',
    name: 'GIMP'
  },
  canva: {
    icon: 'C',
    bgColor: 'bg-gradient-to-r from-cyan-500/90 to-purple-600/90',
    name: 'Canva'
  }
};

// Project data with size hints for better layout
const projects = [
  {
    id: 1,
    image: "https://i.ibb.co/wZ6NKqwj/Desktop-1-7.png",
    company: "Capitec Bank",
    tools: ['figma'],
    aspectRatio: 'landscape' // wider than tall
  },
  {
    id: 2,
    image: "https://i.ibb.co/t9wjb1h/momentum-5.png",
    company: "Momentum",
    tools: ['figma'],
    aspectRatio: 'square'
  },
  {
    id: 3,
    image: "https://i.ibb.co/kRMBBfm/Desktop-1-8.png",
    company: "First National Bank", 
    tools: ['figma', 'GIMP'],
    aspectRatio: 'landscape'
  },
  {
    id: 4,
    image: "https://i.ibb.co/7MTt4PG/Adidas-photo-frame-4.png",
    company: "Adidas",
    tools: ['GIMP'],
    aspectRatio: 'portrait' // taller than wide
  },
  {
    id: 5,
    image: "https://i.ibb.co/zVDscFCm/dischem.png",
    company: "Dischem",
    tools: ['GIMP', 'canva'],
    aspectRatio: 'square'
  },
  {
    id: 6,
    image: "https://i.ibb.co/Y7V7G0h5/toyota.png",
    company: "Toyota",
    tools: ['canva', 'GIMP'],
    aspectRatio: 'landscape'
  },
  {
    id: 7,
    image: "https://i.ibb.co/TBZxyP5f/Mac-Book-Air-1-3.png",
    company: "Absa",
    tools: ['figma'],
    aspectRatio: 'landscape'
  },
  {
    id: 8,
    image: "https://i.ibb.co/nNpR5TTd/Mac-Book-Air-2.png",
    company: "Absa",
    tools: ['figma'],
    aspectRatio: 'landscape'
  }
];

// Tool Badge Component
const ToolBadge = ({ tool }) => {
  const config = toolConfigs[tool];
  if (!config) return null;

  return (
    <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${config.bgColor} backdrop-blur-sm border border-white/10 shadow-lg`}>
      <span className="text-white text-xs font-semibold">{config.icon}</span>
    </div>
  );
};

// Individual project card component
const ProjectCard = ({ project, index, columnIndex }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e) => {
    const img = e.target;
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setImageLoaded(true);
  };

  // Calculate dynamic sizing based on aspect ratio
  const getCardClasses = () => {
    const baseClasses = "group relative rounded-xl overflow-hidden bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 transition-all duration-400 hover:border-gray-600/60 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 mb-4";
    
    // Add sizing classes based on aspect ratio
    if (project.aspectRatio === 'portrait') {
      return `${baseClasses} break-inside-avoid`;
    } else if (project.aspectRatio === 'landscape') {
      return `${baseClasses} break-inside-avoid`;
    } else {
      return `${baseClasses} break-inside-avoid`;
    }
  };

  return (
    <div
      className={getCardClasses()}
      style={{
        animationDelay: `${(index + columnIndex * 100)}ms`,
        animationFillMode: 'both',
        animationName: 'slideUp',
        animationDuration: '600ms',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Image Container with responsive sizing */}
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center min-h-[200px]">
            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500 min-h-[200px]">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-lg mb-3 mx-auto flex items-center justify-center">
                <span className="text-lg">🎨</span>
              </div>
              <p className="text-xs">Image unavailable</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={project.image}
              alt={`${project.company} design project`}
              className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={() => setImageError(true)}
              loading="lazy"
              style={{
                maxHeight: project.aspectRatio === 'portrait' ? '400px' : 'none',
                objectFit: 'cover'
              }}
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

            {/* Tool Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              {project.tools?.map((tool, idx) => (
                <div
                  key={tool}
                  className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  style={{ transitionDelay: `${150 + idx * 75}ms` }}
                >
                  <ToolBadge tool={tool} />
                </div>
              ))}
            </div>

            {/* Company Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-base leading-tight transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 drop-shadow-lg">
                {project.company}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Smart Masonry Layout Component
const MasonryGrid = ({ projects }) => {
  const [columns, setColumns] = useState(4);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else if (window.innerWidth < 1280) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects across columns more intelligently
  const distributeProjects = () => {
    const columnArrays = Array.from({ length: columns }, () => []);
    const columnHeights = Array(columns).fill(0);

    projects.forEach((project, index) => {
      // Find the column with the least height
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      columnArrays[shortestColumnIndex].push({ ...project, originalIndex: index });
      
      // Estimate height based on aspect ratio
      let estimatedHeight = 250; // base height
      if (project.aspectRatio === 'portrait') {
        estimatedHeight = 350;
      } else if (project.aspectRatio === 'landscape') {
        estimatedHeight = 200;
      } else if (project.aspectRatio === 'square') {
        estimatedHeight = 280;
      }
      
      columnHeights[shortestColumnIndex] += estimatedHeight;
    });

    return columnArrays;
  };

  const columnArrays = distributeProjects();

  return (
    <div 
      ref={containerRef}
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      {columnArrays.map((columnProjects, columnIndex) => (
        <div key={columnIndex} className="space-y-4">
          {columnProjects.map((project, projectIndex) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={project.originalIndex}
              columnIndex={columnIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Stats Component
const GalleryStats = ({ projectCount }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-gray-300 text-sm">{projectCount} Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          <span className="text-gray-300 text-sm">Multiple Brands</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="text-gray-300 text-sm">Various Tools</span>
        </div>
      </div>
    </div>
  );
};

// Main Gallery Component
const DesignGallery = () => {
  return (
    <section id="showcase" className="py-16 bg-gray-950 relative overflow-hidden">
      {/* Refined background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Design Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A curated collection of design work across various brands and platforms
          </p>
        </div>

        {/* Gallery Stats */}
        <GalleryStats projectCount={projects.length} />

        {/* Smart Masonry Grid - Display All Projects */}
        <MasonryGrid projects={projects} />
      </div>

      {/* Optimized CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default DesignGallery;