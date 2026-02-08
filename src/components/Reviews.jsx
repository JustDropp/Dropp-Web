import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLandingTheme } from '../hooks/useLandingTheme';

const Reviews = () => {
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

  const reviews = [
    {
      id: 1, name: 'Sarah Jenkins', role: 'Fashion Blogger', followers: '89K',
      content: 'Dropp has completely changed how I share my outfits. The collections feel like my own digital magazine — my followers love the instant links.',
      avatar: 'https://i.pravatar.cc/150?u=1',
    },
    {
      id: 2, name: 'Mike Chen', role: 'Tech Reviewer', followers: '210K',
      content: 'Finally, a platform that respects the creator\'s aesthetic while being super functional. The analytics alone are worth the switch.',
      avatar: 'https://i.pravatar.cc/150?u=2',
    },
    {
      id: 3, name: 'Elena Ross', role: 'Interior Designer', followers: '156K',
      content: 'The moodboard feature is a game changer for my design process. Clients can browse my curated looks and click through to purchase directly — no more endless DMs.',
      avatar: 'https://i.pravatar.cc/150?u=3',
    },
    {
      id: 4, name: 'David Kim', role: 'Photographer', followers: '74K',
      content: 'Clean, minimal, and effective. I can showcase my gear, my presets, and my editing workflow all in one place. Exactly what I needed.',
      avatar: 'https://i.pravatar.cc/150?u=4',
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  const review = reviews[current];

  return (
    <section style={{
      padding: '140px 0',
      background: t.bg,
      borderTop: `1px solid ${t.border}`,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
          alignItems: 'start',
        }} className="reviews-layout">
          {/* Left — Section info + nav */}
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
              What creators say
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
                marginBottom: '48px',
              }}
            >
              Loved by{' '}
              <span style={accentStyle}>creators.</span>
            </motion.h2>

            {/* Navigation arrows */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={prev}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: `1px solid ${t.borderStrong}`,
                  background: 'transparent',
                  color: t.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                  padding: 0,
                }}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={next}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: `1px solid ${t.borderStrong}`,
                  background: 'transparent',
                  color: t.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                  padding: 0,
                }}
              >
                <ArrowRight size={18} />
              </button>
              <span style={{
                alignSelf: 'center',
                marginLeft: '8px',
                fontSize: '0.8125rem',
                color: t.textFaint,
                fontFamily: 'var(--font-display)',
              }}>
                {String(current + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right — Pull-quote testimonial */}
          <div style={{ position: 'relative', minHeight: '260px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Large quote */}
                <p style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  color: t.isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)',
                  lineHeight: '1.6',
                  fontWeight: '400',
                  marginBottom: '40px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                }}>
                  "{review.content}"
                </p>

                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '24px',
                  borderTop: `1px solid ${t.border}`,
                }}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '0.9375rem',
                      color: t.text,
                      fontFamily: 'var(--font-display)',
                    }}>
                      {review.name}
                    </div>
                    <div style={{
                      fontSize: '0.8125rem',
                      color: t.textMuted,
                    }}>
                      {review.role} &middot; {review.followers} followers
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
