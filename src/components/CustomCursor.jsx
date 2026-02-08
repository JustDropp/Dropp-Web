import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [inFooter, setInFooter] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e) => {
      const heading = e.target.closest('h1, h2, h3, h4');
      const img = e.target.closest('img, .hero-collage, .feature-image');
      const btn = e.target.closest('a, button, input');
      const footer = e.target.closest('footer');

      setInFooter(!!footer);

      if (heading) setVariant('heading');
      else if (img) setVariant('image');
      else if (btn) setVariant('button');
      else setVariant('default');
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  const sizes = {
    default: 12,
    heading: 80,
    image: 48,
    button: 36,
  };

  const size = sizes[variant];
  const isFilled = variant === 'heading' || variant === 'button';

  const fillColor = inFooter ? '#3887F8' : '#fff';
  const ringColor = inFooter ? 'rgba(56, 135, 248, 0.7)' : 'rgba(255,255,255,0.5)';
  const defaultRingColor = inFooter ? '1.5px solid rgba(56, 135, 248, 0.8)' : '1.5px solid #fff';

  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
          y: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
          width: { type: 'spring', stiffness: 250, damping: 20 },
          height: { type: 'spring', stiffness: 250, damping: 20 },
          opacity: { duration: 0.15 },
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: isFilled ? 'none' : variant === 'default' ? defaultRingColor : `1px solid ${ringColor}`,
          backgroundColor: isFilled ? fillColor : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />

      {/* Center dot — only visible in default state */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: visible && variant === 'default' ? 0.8 : 0,
          scale: variant === 'default' ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 600, damping: 30 },
          y: { type: 'spring', stiffness: 600, damping: 30 },
          opacity: { duration: 0.15 },
          scale: { type: 'spring', stiffness: 400, damping: 20 },
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: fillColor,
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default CustomCursor;
