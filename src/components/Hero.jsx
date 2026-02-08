import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLandingTheme } from '../hooks/useLandingTheme';

/* ── Grayscale image with circular color reveal on hover ──── */
const RevealImage = ({ src, alt, style = {} }) => {
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--rx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--ry', `${e.clientY - rect.top}px`);
    e.currentTarget.style.setProperty('--reveal', '1');
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.setProperty('--reveal', '0');
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        '--rx': '-200px',
        '--ry': '-200px',
        '--reveal': '0',
        ...style,
      }}
    >
      {/* Grayscale base */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: 'grayscale(1) contrast(1.05)',
          transition: 'filter 0.4s ease',
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
          opacity: 'var(--reveal)',
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const Hero = () => {
  const t = useLandingTheme();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  const accentStyle = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: '400',
    background: t.accentGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: t.bg,
        paddingTop: 'var(--header-height)',
      }}
    >
      {/* Background image — faded editorial photo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        opacity: t.heroBgOpacity,
        transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px) scale(1.05)`,
        transition: 'transform 0.3s ease-out',
      }} />

      {/* Subtle radial highlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: t.isDark
          ? 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.01) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '80px',
          alignItems: 'center',
          minHeight: 'calc(100vh - var(--header-height) - 80px)',
        }} className="hero-grid">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                border: `1px solid ${t.borderStrong}`,
                borderRadius: '4px',
                marginBottom: '40px',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: t.textMuted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
              }}
            >
              Now in early access
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)',
                lineHeight: '0.95',
                marginBottom: '32px',
                letterSpacing: '-0.04em',
                fontWeight: '600',
                color: t.text,
                fontFamily: 'var(--font-display)',
              }}
            >
              Where creators
              <br />
              drop their{' '}
              <span style={accentStyle}>world.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '1.125rem',
                color: t.textSecondary,
                maxWidth: '440px',
                lineHeight: '1.7',
                fontWeight: '400',
                marginBottom: '48px',
              }}
            >
              Curate collections of products you love. Share affiliate links.
              Earn every time your followers click through and buy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-buttons"
              style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Link
                to="/signup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 32px',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  borderRadius: '6px',
                  background: t.btnPrimary,
                  color: t.btnPrimaryText,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}
              >
                Get started
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: t.btnSecondaryText,
                  border: `1px solid ${t.borderStrong}`,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.01em',
                }}
              >
                Join waitlist
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{
                marginTop: '56px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/64?u=proof${i}`}
                    alt={`Creator ${i}`}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `2px solid ${t.avatarBorder}`,
                      marginLeft: i > 1 ? '-8px' : '0',
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
              <span style={{
                fontSize: '0.8125rem',
                color: t.textFaint,
                fontWeight: '400',
              }}>
                2,500+ creators on the waitlist
              </span>
            </motion.div>
          </div>

          {/* Right — Editorial image collage with parallax + color reveal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              position: 'relative',
              height: '560px',
            }}
            className="hero-collage"
          >
            {/* Main large image — parallax layer 1 */}
            <motion.div
              animate={{
                x: mouse.x * 12,
                y: mouse.y * 8,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '72%',
                height: '70%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: t.isDark
                  ? '0 20px 60px rgba(0,0,0,0.5)'
                  : '0 20px 60px rgba(0,0,0,0.12)',
              }}
            >
              <RevealImage
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                alt="Creator lifestyle product collection display"
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>

            {/* Smaller offset image — parallax layer 2 */}
            <motion.div
              animate={{
                x: mouse.x * -18,
                y: mouse.y * -12,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '55%',
                height: '52%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: `4px solid ${t.bg}`,
                boxShadow: t.isDark
                  ? '0 16px 48px rgba(0,0,0,0.4)'
                  : '0 16px 48px rgba(0,0,0,0.1)',
              }}
            >
              <RevealImage
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80"
                alt="Curated product collection with affiliate links"
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>

            {/* Floating stat card — parallax layer 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mouse.x * 24,
                y: mouse.y * 16,
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                scale: { duration: 0.6, delay: 0.8 },
                x: { type: 'spring', stiffness: 100, damping: 15 },
                y: { type: 'spring', stiffness: 100, damping: 15 },
              }}
              style={{
                position: 'absolute',
                bottom: '55%',
                left: '-12px',
                padding: '16px 22px',
                background: t.cardBg,
                border: `1px solid ${t.borderMedium}`,
                borderRadius: '10px',
                zIndex: 3,
                backdropFilter: 'blur(12px)',
                boxShadow: t.isDark
                  ? '0 8px 32px rgba(0,0,0,0.3)'
                  : '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: t.text,
                fontFamily: 'var(--font-display)',
                lineHeight: '1',
              }}>
                48 collections
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: t.textMuted,
                marginTop: '4px',
              }}>
                curated this week
              </div>
            </motion.div>

            {/* Floating earnings badge — parallax layer 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mouse.x * -15,
                y: mouse.y * 20,
              }}
              transition={{
                opacity: { duration: 0.6, delay: 1 },
                scale: { duration: 0.6, delay: 1 },
                x: { type: 'spring', stiffness: 100, damping: 15 },
                y: { type: 'spring', stiffness: 100, damping: 15 },
              }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                padding: '12px 18px',
                background: t.accentGradient,
                borderRadius: '8px',
                zIndex: 3,
                boxShadow: '0 8px 24px rgba(13, 54, 199, 0.3)',
              }}
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}>
                +$127.40 earned today
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
