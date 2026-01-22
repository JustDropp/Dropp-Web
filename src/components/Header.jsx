import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/index.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    const handleJoinWaitlist = () => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById('waitlist');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById('waitlist');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Close menu when route changes
    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className="glass-panel" style={{
            height: 'var(--header-height)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
            }}>
                <Link to="/" className="logo" style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 1002
                }}>
                    dropp.
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: isActive('/') ? '600' : '400', opacity: isActive('/') ? 1 : 0.6 }}>Home</Link>
                    <Link to="/explore" style={{ fontWeight: isActive('/explore') ? '600' : '400', opacity: isActive('/explore') ? 1 : 0.6 }}>Explore</Link>
                    <Link to="/creators" style={{ fontWeight: isActive('/creators') ? '600' : '400', opacity: isActive('/creators') ? 1 : 0.6 }}>Creators</Link>
                    <Link to="/about" style={{ fontWeight: isActive('/about') ? '600' : '400', opacity: isActive('/about') ? 1 : 0.6 }}>About</Link>

                    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }} onClick={handleJoinWaitlist}>
                        Join Waitlist
                    </button>
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
                        color: 'var(--text-primary)',
                        display: 'none' // Hidden by default, shown via CSS media query
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'var(--bg-primary)',
                        zIndex: 1001,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        padding: '2rem'
                    }}>
                        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Home</Link>
                        <Link to="/explore" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Explore</Link>
                        <Link to="/creators" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Creators</Link>
                        <Link to="/about" style={{ fontSize: '1.5rem', fontWeight: '600' }}>About</Link>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span>Theme</span>
                            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}>
                                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                            </button>
                        </div>

                        <button className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem', width: '100%' }} onClick={handleJoinWaitlist}>
                            Join Waitlist
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
