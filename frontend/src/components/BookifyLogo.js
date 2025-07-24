// src/components/ZenReserveLogo.js
import React from 'react';
import { motion } from 'framer-motion';

const zenReserveLetters = [
  {
    char: 'Z',
    style: {
      color: '#f44336',
      fontSize: '48px',
      fontFamily: 'Arial Black, sans-serif',
      transform: 'rotate(-5deg)',
      fontWeight: 900,
    },
  },
  {
    char: 'E',
    style: {
      color: '#ff9800',
      fontSize: '45px',
      fontFamily: 'Courier New, monospace',
      fontWeight: 900,
    },
  },
  {
    char: 'N',
    style: {
      color: '#ffeb3b',
      fontSize: '55px',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  },
  {
    char: 'R',
    style: {
      color: '#4caf50',
      fontSize: '48px',
      fontFamily: '"Comic Sans MS", cursive',
      transform: 'scaleX(1.2)',
      fontWeight: 900,
    },
  },
  {
    char: 'E',
    style: {
      color: '#2196f3',
      fontSize: '45px',
      fontFamily: 'Impact, fantasy',
      transform: 'rotate(3deg)',
      fontWeight: 900,
    },
  },
  {
    char: 'S',
    style: {
      color: '#3f51b5',
      fontSize: '55px',
      fontFamily: '"Lucida Console", monospace',
      fontWeight: 900,
      letterSpacing: '4px',
    },
  },
  {
    char: 'E',
    style: {
      color: '#9c27b0',
      fontSize: '50px',
      fontFamily: '"Times New Roman", Times, serif',
      fontWeight: 900,
    },
  },
  {
    char: 'R',
    style: {
      color: '#009688',
      fontSize: '50px',
      fontFamily: 'Verdana, sans-serif',
      fontWeight: 900,
    },
  },
  {
    char: 'V',
    style: {
      color: '#795548',
      fontSize: '48px',
      fontFamily: 'Tahoma, sans-serif',
      fontWeight: 900,
    },
  },
  {
    char: 'E',
    style: {
      color: '#673ab7',
      fontSize: '50px',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
    },
  },
];

const ZenReserveLogo = () => {
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
      {zenReserveLetters.map((letter, index) => (
        <motion.span
          key={index}
          style={letter.style}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
        >
          {letter.char}
        </motion.span>
      ))}
    </div>
  );
};

export default ZenReserveLogo;
