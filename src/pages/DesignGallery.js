import React, { useState } from 'react';

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

// Project data - removed size property since we'll use natural image dimensions
const projects = [
  {
    id: 1,
    image: "https://i.ibb.co/wZ6NKqwj/Desktop-1-7.png",
    company: "Capitec Bank",
    tools: ['figma']
  },
  {
    id: 2,
    image: "https://i.ibb.co/t9wjb1h/momentum-5.png",
    company: "Momentum",
    tools: ['figma']
  },
  {
    id: 3,
    image: "https://i.ibb.co/kRMBBfm/Desktop-1-8.png",
    company: "First National Bank", 
    tools: ['figma', 'GIMP']
  },
  {
    id: 4,
    image: "https://i.ibb.co/7MTt4PG/Adidas-photo-frame-4.png",
    company: "Adidas",
    tools: ['GIMP']
  },
  {
    id: 5,
    image: "https://i.ibb.co/Hp4wQ7K4/Dischem-3.png",
    company: "Dischem",
    tools: ['GIMP', 'canva']
  },
  {
    id: 6,
    image: "https://i.ibb.co/Y7V7G0h5/toyota.png",
    company: "Toyota",
    tools: ['canva', 'GIMP']
  },
   {
    id: 7,
    image: "https://i.ibb.co/TBZxyP5f/Mac-Book-Air-1-3.png",
    company: "Absa",
    tools: ['figma']
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
const ProjectCard = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`group relative break-inside-avoid rounded-xl overflow-hidden bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 transition-all duration-400 hover:border-gray-600/60 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 mb-4`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both',
        animationName: 'slideUp',
        animationDuration: '600ms',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Image Container - Now uses natural aspect ratio */}
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
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />

            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

            {/* Tool Badges - Positioned over the image */}
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

            {/* Company Name - Positioned over the image */}
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
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Design Gallery
          </h2>
        </div>

        {/* CSS Masonry Layout - Let images flow naturally */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
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