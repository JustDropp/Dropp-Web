import React, { useState } from 'react';

const WaitlistForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <section id="waitlist" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: 'var(--spacing-sm)' }}>
                    Join the movement.
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                    Be the first to experience the future of social commerce.
                </p>

                {status === 'success' ? (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)'
                    }}>
                        <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: 'var(--spacing-xs)' }}>🎉</span>
                        <strong>You're on the list!</strong>
                        <p>We'll notify you when we launch.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 'var(--spacing-xs)', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    minWidth: '250px'
                                }}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={status === 'loading'}
                                style={{ flexShrink: 0 }}
                            >
                                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'var(--spacing-xs)' }}>
                            No spam. Unsubscribe anytime.
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
};

export default WaitlistForm;
