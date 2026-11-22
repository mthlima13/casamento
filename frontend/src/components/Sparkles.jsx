import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Gerador pseudoaleatório com semente fixa: os brilhos ficam sempre nas
// mesmas posições (sem "pular" a cada render).
const seededRandom = (seed) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

const Sparkles = ({
  count = 16,
  seed = 7,
  className = '',
  colors = ['#E9C88A', '#F2B8A2', '#FFFFFF'],
  opacity = 1,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sparkles = useMemo(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size: 4 + rand() * 6,
      delay: rand() * 4,
      duration: 2.4 + rand() * 2.6,
      drift: (rand() - 0.5) * 14,
      color: colors[i % colors.length],
      rotate: rand() * 90,
    }));
  }, [count, seed, colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            color: s.color,
            opacity,
          }}
          initial={{ opacity: 0, scale: 0.3, rotate: s.rotate }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.35, scale: 0.8 }
              : {
                  opacity: [0, 0.7, 0],
                  scale: [0.4, 1, 0.4],
                  y: [0, s.drift, 0],
                  rotate: [s.rotate, s.rotate + 25, s.rotate],
                }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Sparkles;
