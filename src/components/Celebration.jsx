import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

function Celebration({ cardPosition }) {
  useEffect(() => {
    if (!cardPosition) return;

    try {
      // Launch confetti
      const nx = cardPosition.x / window.innerWidth;
      const ny = cardPosition.y / window.innerHeight;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: nx, y: ny },
        colors: ['#646cff', '#ff4444', '#ffbb33', '#00C851'],
        zIndex: 2000
      });

      // Play sound
      const audio = new Audio('/Sounds/achievement-bel.wav');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio playback prevented:', error));
    } catch (error) {
      console.error('Celebration error:', error);
    }
  }, [cardPosition]);

  if (!cardPosition) return null;

  return (
    <div style={{ position: 'relative' }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            left: cardPosition.x + (Math.random() * 200 - 100),
            top: cardPosition.y,
            pointerEvents: 'none',
            fontSize: '1.5rem',
            zIndex: 2001
          }}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [1, 1.5, 1],
            y: [-20, -60 * Math.random()],
            x: [0, (Math.random() - 0.5) * 100]
          }}
          transition={{
            duration: 0.8,
            delay: index * 0.1
          }}
        >
          {['🎉', '✨', '🌟', '💫', '🎊'][index % 5]}
        </motion.div>
      ))}
    </div>
  );
}

export default Celebration;
