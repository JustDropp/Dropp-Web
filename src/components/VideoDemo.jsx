import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLandingTheme } from '../hooks/useLandingTheme';

/* ── Horizontal marquee ticker ─────────────────────────────── */
const Marquee = ({ children, speed = 30 }) => {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const step = (ts) => {
      const elapsed = (ts - start) / 1000;
      setOffset(-elapsed * speed);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          transform: `translateX(${offset % 2000}px)`,
          willChange: 'transform',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

/* ── Animated counter hook ─────────────────────────────────── */
const useCountUp = (end, duration = 2000, startOnView = false) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const startCounting = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startCounting();
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, startCounting]);

  return { count, ref };
};

/* ── Stat card component ───────────────────────────────────── */
const AnimatedStat = ({ value, suffix, label, delay, t, borderRight }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const { count, ref } = useCountUp(numericValue, 2200, true);

  const displayValue = suffix ? `${count.toLocaleString()}${suffix}` : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      style={{
        padding: '40px 0',
        borderRight: borderRight ? `1px solid ${t.border}` : 'none',
        paddingLeft: delay > 0 ? '32px' : '0',
      }}
    >
      <div style={{
        fontSize: 'clamp(2rem, 3.5vw, 3rem)',
        fontWeight: '700',
        color: t.text,
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.03em',
        lineHeight: '1',
        marginBottom: '8px',
      }}>
        {displayValue}
      </div>
      <div style={{
        fontSize: '0.8125rem',
        color: t.textMuted,
        fontWeight: '400',
      }}>
        {label}
      </div>
    </motion.div>
  );
};

/* ── Section ────────────────────────────────────────────────── */
const VideoDemo = () => {
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

  const words = [
    'CURATE', 'DISCOVER', 'INFLUENCE', 'COLLECT', 'INSPIRE',
    'CREATE', 'SHARE', 'STYLE', 'CONNECT', 'EARN',
  ];

  const stats = [
    { value: '10000', suffix: '+', label: 'Creators', delay: 0 },
    { value: '500000', suffix: '', label: 'Collections', delay: 0.08 },
    { value: '2000000', suffix: '+', label: 'Products Linked', delay: 0.16 },
    { value: '50', suffix: '+', label: 'Categories', delay: 0.24 },
  ];

  return (
    <>
      {/* Marquee strip */}
      <section style={{
        padding: '28px 0',
        background: t.bg,
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        overflow: 'hidden',
      }}>
        <Marquee speed={50}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {words.map((word, i) => (
              <span key={`a-${i}`} style={{
                fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                fontWeight: '500',
                fontFamily: 'var(--font-display)',
                color: t.textSubtle,
                letterSpacing: '0.12em',
                padding: '0 32px',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}>
                {word}
                <span style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: t.textSubtle,
                  marginLeft: '32px',
                  verticalAlign: 'middle',
                }} />
              </span>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Stats + Platform preview */}
      <section style={{
        padding: '140px 0 120px',
        background: t.bg,
        position: 'relative',
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
            The platform
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'end',
            marginBottom: '80px',
          }} className="stats-header-grid">
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
              }}
            >
              Built for creators who{' '}
              <span style={accentStyle}>mean business.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '1rem',
                color: t.textSecondary,
                lineHeight: '1.7',
                maxWidth: '380px',
                marginLeft: 'auto',
              }}
            >
              Everything you need to curate, share, and earn from your recommendations.
              No middlemen, no broken links.
            </motion.p>
          </div>

          {/* Stats row — animated counters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${t.borderMedium}`,
          }} className="stats-grid">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={stat.delay}
                t={t}
                borderRight={i < 3}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoDemo;
