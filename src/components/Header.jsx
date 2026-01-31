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
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
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

                    {isAuthenticated ? (
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    color: 'var(--text-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <User size={20} />
                                {user?.username || user?.email}
                            </button>
                            {showUserMenu && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '0.5rem',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    minWidth: '150px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setShowUserMenu(false);
                                            navigate('/');
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            width: '100%',
                                            padding: '0.5rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: 'var(--text-primary)',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </>
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

                        {isAuthenticated ? (
                            <>
                                <div style={{ fontSize: '1.2rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={24} />
                                    {user?.username || user?.email}
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '12px 32px', fontSize: '1.1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                        navigate('/');
                                    }}
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn" style={{ padding: '12px 32px', fontSize: '1.1rem', width: '100%', textAlign: 'center', textDecoration: 'none' }}>
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem', width: '100%', textAlign: 'center', textDecoration: 'none' }}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
