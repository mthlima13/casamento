import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Sparkles from './Sparkles';

const EnvelopeIntro = ({ names = ['', ''], title = 'Você está sendo convidado(a)', onOpened }) => {
  const [phase, setPhase] = useState('closed'); // closed | opening
  const prefersReducedMotion = useReducedMotion();
  const isOpening = phase === 'opening';

  useEffect(() => {
    if (!isOpening) return;
    const delay = prefersReducedMotion ? 300 : 1900;
    const timer = setTimeout(() => onOpened?.(), delay);
    return () => clearTimeout(timer);
  }, [isOpening, prefersReducedMotion, onOpened]);

  const handleOpen = () => {
    if (phase === 'closed') setPhase('opening');
  };

  const flapTransition = {
    duration: prefersReducedMotion ? 0.01 : 0.8,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[60] bg-accent flex flex-col items-center justify-center px-6 select-none overflow-hidden"
      role="dialog"
      aria-label="Abertura do convite"
    >
      {/* Brilhos cintilantes ao fundo */}
      <motion.div
        animate={isOpening ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.9 }}
        className="absolute inset-0 pointer-events-none"
      >
        <Sparkles count={7} seed={3} opacity={0.35} />
      </motion.div>

      {/* Texto de convite */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -12 : 0 }}
        transition={{ duration: 0.8, delay: isOpening ? 0 : 0.2 }}
        className="text-center mb-10"
      >
        <p className="text-secondary/40 font-serif italic text-xl md:text-2xl mb-4">
          {names[0]} & {names[1]}
        </p>
        <p className="text-primary text-xs md:text-sm uppercase tracking-[.3em] font-sans font-light">
          {title}
        </p>
      </motion.div>

      {/* Envelope */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Abrir o convite"
        className="relative w-[300px] h-[205px] md:w-[360px] md:h-[245px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm group"
        style={{ perspective: '1200px' }}
      >
        {/* Cartão que sai do envelope */}
        <motion.div
          initial={false}
          animate={isOpening ? { y: '-62%' } : { y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: prefersReducedMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-4 right-4 top-3 bottom-3 bg-white border border-primary/15 shadow-lg flex flex-col items-center justify-center z-10"
        >
          <p className="text-primary text-5xl md:text-6xl font-serif leading-none">
            {names[0][0]} <span className="text-secondary/30 text-3xl md:text-4xl italic">&</span> {names[1][0]}
          </p>
          <div className="h-[1px] w-16 bg-primary/20 mt-4" />
          <p className="text-secondary/50 text-[9px] uppercase tracking-[.35em] mt-4">Convite</p>
        </motion.div>

        {/* Fundo do envelope */}
        <div className="absolute inset-0 bg-[#F6E3D7] border border-primary/25 rounded-sm shadow-2xl shadow-secondary/20" />

        {/* Abas laterais e inferior (frente) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div
            className="absolute inset-0 bg-[#EFD5C4] border border-primary/15"
            style={{ clipPath: 'polygon(0 0, 52% 50%, 0 100%)' }}
          />
          <div
            className="absolute inset-0 bg-[#E9CCB8] border border-primary/15"
            style={{ clipPath: 'polygon(100% 0, 48% 50%, 100% 100%)' }}
          />
          <div
            className="absolute inset-0 bg-[#F2DBCB] border border-primary/15"
            style={{ clipPath: 'polygon(0 100%, 50% 42%, 100% 100%)' }}
          />
        </div>

        {/* Aba superior (abre) */}
        <motion.div
          initial={false}
          animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
          transition={flapTransition}
          className="absolute inset-x-0 top-0 h-full z-30 origin-top"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <div
            className="absolute inset-0 bg-[#F8E8DC] border border-primary/20"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 52%)' }}
          />
        </motion.div>

        {/* Selo de cera */}
        <motion.div
          initial={false}
          animate={isOpening ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
          className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-secondary text-accent flex items-center justify-center shadow-lg shadow-secondary/30 border border-accent/20 overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <span className="font-serif text-lg md:text-xl tracking-wide">
              {names[0][0]}<span className="text-accent/60 italic mx-[1px]">&</span>{names[1][0]}
            </span>
            {/* Brilho deslizante sobre o selo */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.22) 50%, transparent 64%)',
              }}
              animate={prefersReducedMotion ? {} : { x: ['-130%', '130%'] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </button>

      {/* Dica de interação */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.8, delay: isOpening ? 0 : 1.2 }}
        className="mt-12"
      >
        <motion.p
          animate={prefersReducedMotion ? {} : { opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-secondary/50 text-[10px] uppercase tracking-[.35em]"
        >
          Toque para abrir
        </motion.p>
      </motion.div>

      {/* Decoração sutil */}
      <div className="absolute inset-6 border border-primary/10 pointer-events-none" />
    </motion.div>
  );
};

export default EnvelopeIntro;
