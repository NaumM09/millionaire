import React from 'react';
import { motion } from 'framer-motion';

const KineticText = ({ 
  text, 
  type = "word", 
  delay = 0, 
  stagger = 0.05, 
  direction = "up", 
  className = "",
  animationType = "default" 
}) => {
  const split = type === "char" ? [...text] : text.split(" ");

  const getVariants = () => {
    const baseVariants = {
      hidden: { 
        opacity: 0, 
        y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
        x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
        scale: animationType === "bounce" ? 0.3 : animationType === "elastic" ? 0.8 : 1,
        rotateX: direction === "down" ? -20 : direction === "up" ? 20 : 0
      },
      visible: i => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          delay: delay + i * stagger,
          duration: animationType === "bounce" ? 1.0 : animationType === "elastic" ? 1.2 : 0.8,
          ease: animationType === "bounce" ? [0.68, -0.55, 0.265, 1.55] : 
                animationType === "elastic" ? [0.25, 0.46, 0.45, 0.94] : [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          damping: animationType === "bounce" ? 8 : 12,
          stiffness: animationType === "bounce" ? 120 : 100
        }
      }),
      exit: {
        opacity: 0,
        y: direction === "up" ? -60 : 60,
        scale: 0.8,
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      }
    };
    return baseVariants;
  };

  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {split.map((element, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={getVariants()}
          style={{ 
            display: "inline-block", 
            marginRight: type === "word" ? "0.3em" : undefined,
            transformOrigin: "center bottom"
          }}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </span>
  );
};

export default KineticText;