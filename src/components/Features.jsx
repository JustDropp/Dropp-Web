import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLandingTheme } from '../hooks/useLandingTheme';

/* ── Tilt image with grayscale → color reveal on hover ───── */
const TiltImage = ({ src, alt, isDark }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: normY * -12, y: normX * 12 });

    // Update CSS vars for the color reveal clip-path
    e.currentTarget.style.setProperty('--rx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--ry', `${e.clientY - rect.top}px`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
    e.currentTarget.style.setProperty('--rx', '-200px');
    e.currentTarget.style.setProperty('--ry', '-200px');
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="feature-image"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '4/3',
        position: 'relative',
        perspective: '800px',
        '--rx': '-200px',
        '--ry': '-200px',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}>
        {/* Grayscale base image */}
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(1) contrast(1.05)',
          }}
        />
        {/* Full color overlay — revealed by clip-path circle */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            clipPath: 'circle(80px at var(--rx) var(--ry))',
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          }}
        />
        {/* Glossy light reflection that follows mouse */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isHovering
            ? `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * 3}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
            : 'none',
          pointerEvents: 'none',
          transition: 'background 0.1s ease-out',
        }} />
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark
          ? 'linear-gradient(to top, rgba(10,10,10,0.3) 0%, transparent 40%)'
          : 'linear-gradient(to top, rgba(255,255,255,0.15) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

const Features = () => {
  const t = useLandingTheme();

  const accentStyle = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: '400',
    background: t.accentGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const features = [
    {
      number: '01',
      title: 'Curated collections',
      description: 'Create beautiful collections of products you use and love. Tag every item with your affiliate link — your followers see the full collection and can click through to purchase from the original store.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
      imageAlt: 'Fashion collection with curated products ready for affiliate linking',
    },
    {
      number: '02',
      title: 'Social-first discovery',
      description: 'Follow creators, explore feeds, and discover products through people you trust. A social experience built around authentic recommendations and real earnings.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
      imageAlt: 'Creators discovering and sharing product recommendations together',
    },
    {
      number: '03',
      title: 'Affiliate earnings',
      description: 'Share affiliate links that actually convert. Your followers click, they purchase from the brand directly, and you earn — simple, transparent, and powerful.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
      imageAlt: 'Creator tracking affiliate earnings and revenue growth',
    },
    {
      number: '04',
      title: 'Creator analytics',
      description: 'Understand what resonates. Track engagement, clicks, and earnings across every collection. Know your audience better than they know themselves.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      imageAlt: 'Analytics dashboard showing click-through rates and creator performance metrics',
    },
  ];

  return (
    <section style={{
      padding: '0 0 140px',
      background: t.bg,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            color: t.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '20px',
            fontFamily: 'var(--font-display)',
          }}
        >
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: t.text,
            fontFamily: 'var(--font-display)',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            lineHeight: '1',
            marginBottom: '80px',
            maxWidth: '600px',
          }}
        >
          Not just a feed.
          <br />
          A marketplace of{' '}
          <span style={accentStyle}>taste.</span>
        </motion.h2>

        {/* Alternating feature rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                alignItems: 'center',
              }}
              className="feature-row"
            >
              {/* Text */}
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: t.textSubtle,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.04em',
                  display: 'block',
                  marginBottom: '20px',
                }}>
                  {feature.number}
                </span>
                <h3 style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: '600',
                  color: t.text,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.15',
                  marginBottom: '20px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: t.textSecondary,
                  lineHeight: '1.75',
                  maxWidth: '420px',
                }}>
                  {feature.description}
                </p>
              </div>

              {/* Image with tilt + color reveal */}
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <TiltImage
                  src={feature.image}
                  alt={feature.imageAlt}
                  isDark={t.isDark}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
