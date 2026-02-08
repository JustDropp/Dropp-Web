import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      padding: '60px 0 40px',
      position: 'relative',
      overflow: 'hidden',
      background: '#0a0a0a',
      borderTop: 'none',
    }}>
      {/* Noise / grain texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.04,
      }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="footer-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-grain)" />
        </svg>
      </div>

      {/* Subtle dot grid texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '60px',
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{
              fontSize: '1.375rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: '16px',
            }}>
              dropp.
            </div>
            <p style={{
              fontSize: '0.8125rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.7',
              maxWidth: '260px',
            }}>
              The platform where creators curate collections,
              share affiliate links, and earn from the lifestyle they love.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}>
              Product
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Explore', path: '/explore' },
                { label: 'Creators', path: '/creators' },
                { label: 'Collections', path: '/explore' },
                { label: 'Pricing', path: '/about' },
              ].map((item) => (
                <Link key={item.label} to={item.path} style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'About', path: '/about' },
                { label: 'Blog', path: '/about' },
                { label: 'Careers', path: '/about' },
              ].map((item) => (
                <Link key={item.label} to={item.path} style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Twitter', 'TikTok'].map((item) => (
                <a key={item} href="#" style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>
            &copy; {new Date().getFullYear()} Dropp Inc.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms'].map((item) => (
              <a key={item} href="#" style={{
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
              }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
