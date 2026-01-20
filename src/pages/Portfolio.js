import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Portfolio.css';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      id: 'generator',
      title: 'Generator Components',
      category: 'UI/UX Design',
      type: 'B2B E-commerce Platform',
      description: 'Transforming an industrial parts supplier into a competitive digital marketplace with professional design and optimized performance.',
      tags: ['Product Design', 'Web Development', 'React', 'Supabase'],
      metrics: [
        { label: 'Performance', value: '+60%' },
        { label: 'User Engagement', value: '+45%' },
        { label: 'Conversion', value: '+32%' }
      ],
      gradient: 'from-blue-600 to-cyan-600',
      image: '/images/generator-hero.png', // Replace with your image
      mockups: ['/images/gen-desktop.png', '/images/gen-mobile.png']
    },
    {
      id: 'zoolo',
      title: 'Zoolo',
      category: 'Product Design',
      type: 'Pet Transportation Marketplace',
      description: 'Designing a two-sided marketplace connecting pet owners with verified transport providers, solving trust and pricing transparency.',
      tags: ['Mobile App', 'Marketplace', 'React Native', 'Firebase'],
      metrics: [
        { label: 'User Growth', value: '393%' },
        { label: 'Active Users', value: '111+' },
        { label: 'Satisfaction', value: '4.8/5' }
      ],
      gradient: 'from-purple-600 to-pink-600',
      image: '/images/zoolo-hero.png', // Replace with your image
      mockups: ['/images/zoolo-app-1.png', '/images/zoolo-app-2.png', '/images/zoolo-app-3.png']
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="premium-portfolio">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1" style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
        <div className="gradient-orb orb-2" style={{
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`
        }} />
        <div className="gradient-orb orb-3" style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
        }} />
        <div className="noise-overlay" />
      </div>

      {/* Hero Section */}
      <section className="hero-premium">
        <motion.div 
          className="hero-content-premium"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >


          <motion.h1 
            className="hero-title-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mahlatse Modiba
            <br />
            <span className="gradient-text">Designer/Developer</span>
          </motion.h1>

          <motion.p 
            className="hero-description-premium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
         SITE UNDER MAINTENANCE⚠️
          </motion.p>
          </motion.div>
        </section>
        </div>
  );
};

export default Portfolio;