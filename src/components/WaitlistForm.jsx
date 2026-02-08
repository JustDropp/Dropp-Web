import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLandingTheme } from '../hooks/useLandingTheme';

const WaitlistForm = () => {
  const t = useLandingTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const accentStyle = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: '400',
    background: t.accentGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section id="waitlist" style={{
      padding: '140px 0 160px',
      background: t.bg,
      borderTop: `1px solid ${t.border}`,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 2rem',
        textAlign: 'center',
      }}>
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
          Early access
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
            marginBottom: '20px',
          }}
        >
          Join the{' '}
          <span style={accentStyle}>movement.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '1rem',
            color: t.textSecondary,
            marginBottom: '48px',
            lineHeight: '1.7',
          }}
        >
          Be the first to experience the future of creator-powered recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '32px',
                border: `1px solid ${t.borderMedium}`,
                borderRadius: '12px',
                background: t.cardBg,
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: t.borderMedium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Check size={20} color={t.text} />
              </div>
              <div style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: t.text,
                marginBottom: '8px',
                fontFamily: 'var(--font-display)',
              }}>
                You're on the list.
              </div>
              <p style={{
                fontSize: '0.9375rem',
                color: t.textSecondary,
              }}>
                We'll be in touch when it's your turn.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '480px',
                margin: '0 auto',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    minWidth: '240px',
                    padding: '14px 20px',
                    borderRadius: '6px',
                    border: `1px solid ${t.borderStrong}`,
                    backgroundColor: t.cardBg,
                    color: t.text,
                    fontSize: '0.9375rem',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                    transition: 'border-color 0.2s ease',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    borderRadius: '6px',
                    background: t.btnPrimary,
                    color: t.btnPrimaryText,
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    opacity: status === 'loading' ? 0.6 : 1,
                    fontFamily: 'var(--font-display)',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {status === 'loading' ? 'Joining...' : (
                    <>Join waitlist <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
              <p style={{
                fontSize: '0.75rem',
                color: t.textFaint,
                marginTop: '16px',
              }}>
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistForm;
