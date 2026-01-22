import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: 'var(--spacing-lg) 0',
            borderTop: '1px solid var(--border-color)',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--spacing-md)'
            }}>
                <div style={{ fontWeight: '700', fontFamily: 'var(--font-display)' }}>dropp.</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Dropp Inc. All rights reserved.
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Twitter</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Instagram</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
