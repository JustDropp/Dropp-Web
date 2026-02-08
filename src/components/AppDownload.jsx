import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';
import { useLandingTheme } from '../hooks/useLandingTheme';

const AppDownload = () => {
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

  return (
    <section style={{
      padding: '140px 0',
      background: t.bg,
      borderTop: `1px solid ${t.border}`,
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }} className="app-download-grid">
          {/* Left — Copy */}
          <div>
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
              Coming soon
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                color: t.text,
                fontFamily: 'var(--font-display)',
                fontWeight: '600',
                letterSpacing: '-0.03em',
                lineHeight: '1',
                marginBottom: '24px',
              }}
            >
              Your aesthetic,{' '}
              <span style={accentStyle}>on the go.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: '1rem',
                color: t.textSecondary,
                lineHeight: '1.7',
                marginBottom: '40px',
                maxWidth: '400px',
              }}
            >
              Curate collections, follow your favorite creators, and earn
              from anywhere. The Dropp app launches soon.
            </motion.p>

            {/* Store buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: t.btnPrimary,
                color: t.btnPrimaryText,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
              }}>
                <Apple size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: '500' }}>Download on the</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: '700', lineHeight: 1 }}>App Store</div>
                </div>
              </button>

              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'transparent',
                color: t.text,
                border: `1px solid ${t.borderStrong}`,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
              }}>
                <Play size={20} fill="currentColor" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.6rem', opacity: 0.4, fontWeight: '500' }}>GET IT ON</div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: '700', lineHeight: 1 }}>Google Play</div>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              position: 'relative',
              height: '480px',
            }}
            className="app-download-mockup"
          >
            {/* Single large phone */}
            <div style={{
              width: '240px',
              height: '480px',
              background: t.cardBg,
              border: `1px solid ${t.borderMedium}`,
              borderRadius: '36px',
              padding: '12px',
              position: 'relative',
            }}>
              {/* Screen */}
              <div style={{
                width: '100%',
                height: '100%',
                background: t.bg,
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Notch */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '24px',
                  background: t.cardBg,
                  borderRadius: '12px',
                  zIndex: 2,
                }} />

                {/* Mock profile screen */}
                <div style={{ padding: '44px 16px 16px', textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: t.borderMedium,
                    margin: '0 auto 8px',
                  }} />
                  <div style={{
                    height: '8px', width: '50%',
                    background: t.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                    borderRadius: '4px', margin: '0 auto 4px',
                  }} />
                  <div style={{
                    height: '6px', width: '30%',
                    background: t.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    borderRadius: '4px', margin: '0 auto 16px',
                  }} />

                  {/* Mini stats */}
                  <div style={{
                    display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px',
                  }}>
                    {['Posts', 'Followers', 'Following'].map((s) => (
                      <div key={s} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '0.625rem', fontWeight: '700', color: t.textSecondary,
                        }}>128</div>
                        <div style={{
                          fontSize: '0.5rem', color: t.textFaint,
                        }}>{s}</div>
                      </div>
                    ))}
                  </div>

                  {/* Grid of pins */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px',
                  }}>
                    {Array.from({ length: 9 }).map((_, j) => (
                      <div key={j} style={{
                        aspectRatio: '1',
                        background: t.isDark
                          ? `rgba(255,255,255,${0.03 + (j % 3) * 0.02})`
                          : `rgba(0,0,0,${0.03 + (j % 3) * 0.02})`,
                        borderRadius: '4px',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Offset second phone */}
            <div style={{
              position: 'absolute',
              right: '10%',
              bottom: '20px',
              width: '200px',
              height: '400px',
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              borderRadius: '32px',
              transform: 'rotate(6deg)',
              opacity: 0.4,
              zIndex: -1,
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
