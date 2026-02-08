import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/index.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const isDark = theme === 'dark';
  const isActive = (path) => location.pathname === path;
  const isLanding = location.pathname === '/landing' || location.pathname === '/';

  // Theme-aware colors
  const textColor = isDark ? '#fff' : '#0a0a0a';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const textActive = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const borderStrong = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const glassBg = isDark ? 'rgba(10,10,10,0.92)' : 'rgba(255,255,255,0.92)';
  const overlayBg = isDark ? '#0a0a0a' : '#ffffff';
  const btnPrimary = isDark ? '#fff' : '#0a0a0a';
  const btnPrimaryText = isDark ? '#0a0a0a' : '#fff';
  const menuItemColor = isDark ? '#fff' : '#0a0a0a';
  const menuMuted = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
  const dropdownBg = isDark ? '#161616' : '#f5f5f5';
  const dropdownBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const dropdownText = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header style={{
      height: 'var(--header-height)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      background: scrolled ? glassBg : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? `1px solid ${borderColor}` : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}>
        {/* Logo */}
        <Link to={isAuthenticated ? '/' : '/landing'} style={{
          fontSize: '1.375rem',
          fontWeight: '700',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.04em',
          zIndex: 1002,
          color: isLanding ? textColor : 'var(--text-primary)',
          textDecoration: 'none',
        }}>
          dropp.
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          gap: '28px',
          alignItems: 'center',
        }}>
          {[
            { path: isAuthenticated ? '/' : '/landing', label: 'Home' },
            { path: '/explore', label: 'Explore' },
            { path: '/creators', label: 'Creators' },
            { path: '/about', label: 'About' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                fontSize: '0.8125rem',
                fontWeight: isActive(item.path) ? '500' : '400',
                color: isLanding
                  ? (isActive(item.path) ? textActive : textMuted)
                  : (isActive(item.path) ? 'var(--text-primary)' : 'var(--text-muted)'),
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em',
              }}
            >
              {item.label}
            </Link>
          ))}

          <div style={{
            width: '1px',
            height: '16px',
            background: isLanding ? borderStrong : 'var(--border-color)',
          }} />

          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: isLanding ? textMuted : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 10px',
                  color: isLanding ? textColor : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: '500',
                  fontFamily: 'var(--font-display)',
                }}
              >
                <User size={16} />
                {user?.username || user?.email}
              </button>
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: dropdownBg,
                  border: `1px solid ${dropdownBorder}`,
                  borderRadius: '8px',
                  padding: '4px',
                  minWidth: '140px',
                  boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.1)',
                }}>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/landing');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '8px 12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: dropdownText,
                      borderRadius: '6px',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" style={{
                padding: '7px 16px',
                fontSize: '0.8125rem',
                fontWeight: '500',
                textDecoration: 'none',
                color: isLanding ? textMuted : 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
              }}>
                Login
              </Link>
              <Link to="/signup" style={{
                padding: '7px 20px',
                fontSize: '0.8125rem',
                fontWeight: '600',
                textDecoration: 'none',
                borderRadius: '6px',
                background: isLanding ? btnPrimary : 'var(--accent-color)',
                color: isLanding ? btnPrimaryText : 'var(--accent-text)',
                fontFamily: 'var(--font-display)',
              }}>
                Get started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 1002,
            color: isMenuOpen ? menuItemColor : (isLanding ? textColor : 'var(--text-primary)'),
            display: 'none',
          }}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: overlayBg,
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            padding: '2rem',
          }}>
            {['Home', 'Explore', 'Creators', 'About'].map((label) => {
              const path = label === 'Home' ? (isAuthenticated ? '/' : '/landing') : `/${label.toLowerCase()}`;
              return (
                <Link key={label} to={path} style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: menuItemColor,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}>
                  {label}
                </Link>
              );
            })}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
              <span style={{ color: menuMuted, fontSize: '0.8125rem' }}>Theme</span>
              <button onClick={toggleTheme} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: menuItemColor,
              }}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

            {isAuthenticated ? (
              <>
                <div style={{
                  fontSize: '0.9375rem', fontWeight: '500', display: 'flex',
                  alignItems: 'center', gap: '8px', color: menuMuted,
                }}>
                  <User size={18} />
                  {user?.username || user?.email}
                </div>
                <button
                  style={{
                    padding: '12px 28px', width: '100%', maxWidth: '260px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    borderRadius: '6px', background: 'transparent',
                    border: `1px solid ${borderStrong}`,
                    color: menuItemColor, cursor: 'pointer', fontSize: '0.9375rem',
                    fontFamily: 'var(--font-display)',
                  }}
                  onClick={() => { logout(); setIsMenuOpen(false); navigate('/landing'); }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                width: '100%', maxWidth: '260px', marginTop: '8px',
              }}>
                <Link to="/login" style={{
                  padding: '12px 28px', width: '100%', textAlign: 'center',
                  textDecoration: 'none', borderRadius: '6px',
                  border: `1px solid ${borderStrong}`, color: menuItemColor,
                  fontSize: '0.9375rem', fontFamily: 'var(--font-display)',
                }}>
                  Login
                </Link>
                <Link to="/signup" style={{
                  padding: '12px 28px', width: '100%', textAlign: 'center',
                  textDecoration: 'none', borderRadius: '6px',
                  background: btnPrimary, color: btnPrimaryText, fontWeight: '600',
                  fontSize: '0.9375rem', fontFamily: 'var(--font-display)',
                }}>
                  Get started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
