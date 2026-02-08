import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLandingTheme } from '../hooks/useLandingTheme';

const CreatorSpotlight = () => {
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

  const creators = [
    {
      id: 1, username: 'alex_style', name: 'Alex Morgan', role: 'Minimalist',
      followers: '125K', image: 'https://i.pravatar.cc/300?u=alex',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      tagline: 'Less noise, more signal.',
    },
    {
      id: 2, username: 'sarah_fash', name: 'Sarah Jenkins', role: 'Fashion',
      followers: '89K', image: 'https://i.pravatar.cc/300?u=sarah',
      cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
      tagline: 'Street style meets high fashion.',
    },
    {
      id: 3, username: 'mike_tech', name: 'Mike Chen', role: 'Tech Setup',
      followers: '210K', image: 'https://i.pravatar.cc/300?u=mike',
      cover: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80',
      tagline: 'Building the perfect desk setup.',
    },
    {
      id: 4, username: 'elena_home', name: 'Elena Ross', role: 'Interior',
      followers: '156K', image: 'https://i.pravatar.cc/300?u=elena',
      cover: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      tagline: 'Spaces that tell stories.',
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section style={{
      padding: '140px 0',
      background: t.bg,
      borderTop: `1px solid ${t.border}`,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '60px',
        }}>
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
              Spotlight
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
              }}
            >
              Curated by the{' '}
              <span style={accentStyle}>best.</span>
            </motion.h2>
          </div>
          <Link
            to="/explore"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '6px',
              border: `1px solid ${t.borderStrong}`,
              color: t.textSecondary,
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
          >
            Explore all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Horizontal scrolling creator cards */}
        <div className="no-scrollbar" style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          padding: '4px 0 20px',
          scrollSnapType: 'x mandatory',
        }}>
          {creators.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              style={{
                minWidth: '280px',
                flex: '0 0 280px',
                scrollSnapAlign: 'start',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Cover image */}
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '16px',
                position: 'relative',
              }}>
                <img
                  src={creator.cover}
                  alt={creator.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    transform: active === i ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '40px 20px 20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}>
                    "{creator.tagline}"
                  </div>
                </div>
              </div>

              {/* Creator info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={creator.image}
                  alt={creator.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <div style={{
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    color: t.text,
                    fontFamily: 'var(--font-display)',
                  }}>
                    {creator.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: t.textMuted,
                  }}>
                    {creator.role} &middot; {creator.followers}
                  </div>
                </div>
                <Link
                  to={`/profile/${creator.username}`}
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    color: t.textSecondary,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorSpotlight;
