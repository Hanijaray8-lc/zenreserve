import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const primary = '#ce99ca';
  const secondary = '#f2aeed';
  const navigate = useNavigate();

  // After animation ends, redirect to /main
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 3000); // wait 3 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

const letters = [
  { char: 'Z', style: { color: '#103b50', fontSize: '100px', fontFamily: 'Arial Black, sans-serif', transform: 'rotate(-5deg)', fontWeight: 900 } },
  { char: 'E', style: { color: '#103b50', fontSize: '95px', fontFamily: 'Courier New, monospace', fontWeight: 900 } },
  { char: 'N', style: { color: secondary, fontSize: '110px', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'bold' } },
  { char: 'R', style: { color: primary, fontSize: '100px', fontFamily: '"Comic Sans MS", cursive', transform: 'scaleX(1.2)', fontWeight: 900 } },
  { char: 'E', style: { color: '#2c704f', fontSize: '95px', fontFamily: 'Impact, fantasy', transform: 'rotate(3deg)', fontWeight: 900 } },
  { char: 'S', style: { color: '#2c704f', fontSize: '110px', fontFamily: '"Lucida Console", monospace', fontWeight: 900, letterSpacing: '4px' } },
  { char: 'E', style: { color: secondary, fontSize: '105px', fontFamily: '"Times New Roman", Times, serif', fontWeight: 900 } },
  { char: 'R', style: { color: primary, fontSize: '105px', fontFamily: 'Verdana, sans-serif', fontWeight: 'bold' } },
  { char: 'V', style: { color: '#103b50', fontSize: '100px', fontFamily: 'Tahoma, sans-serif', fontWeight: 900 } },
  { char: 'E', style: { color: secondary, fontSize: '100px', fontFamily: 'Arial, sans-serif', fontWeight: 900 } },
];


  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            style={letter.style}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
          >
            {letter.char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
