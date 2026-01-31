import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();
  return (
    <section style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'var(--header-height)'
    }}>
      {/* Abstract Background Blob */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: -1
      }}></div>

      <div className="container" style={{ width: '100%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: theme === 'dark' ? 'rgb(255 255 255 / 7%)' : 'rgba(0,0,0,0.03)',
              borderRadius: '50px',
              marginBottom: 'var(--spacing-md)',
              marginTop: 'var(--spacing-lg)',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            ✨ The new standard for social commerce
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gradient"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              lineHeight: '1',
              marginBottom: 'var(--spacing-md)',
              letterSpacing: '-0.04em'
            }}
          >
            Where Influence <br /> Meets Reality.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-lg)',
              lineHeight: '1.4'
            }}
          >
            Curate your aesthetic. Share your essentials. Shop the lifestyle you admire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-buttons"
            style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              className="btn btn-primary hover-scale"
              style={{
                padding: '16px 40px',
                fontSize: '1.125rem',
                borderRadius: '50px'
              }}
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Join the Waitlist
            </button>
            <button
              className="btn btn-secondary hover-scale"
              style={{
                padding: '16px 40px',
                fontSize: '1.125rem',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Watch Demo <ArrowRight size={20} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
