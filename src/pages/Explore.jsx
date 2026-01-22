import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Explore = () => {
    // Placeholder data for masonry grid
    const items = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        height: Math.floor(Math.random() * (400 - 200 + 1) + 200), // Random height between 200 and 400
        user: `User ${i + 1}`,
        product: `Product ${i + 1}`
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ padding: 'var(--spacing-lg) 0' }}
        >
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>Explore Collections</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Discover what's trending in the community.</p>
                </div>

                <div style={{
                    columnCount: 3,
                    columnGap: 'var(--spacing-md)',
                }}>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5 }}
                            style={{
                                breakInside: 'avoid',
                                marginBottom: 'var(--spacing-md)',
                                backgroundColor: 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                position: 'relative',
                                height: `${item.height}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            className="group"
                        >
                            {/* Placeholder Image */}
                            <img
                                src={`https://picsum.photos/seed/${item.id}/400/${item.height}`}
                                alt="Random"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />

                            {/* Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.4)',
                                opacity: 0,
                                transition: 'opacity 0.3s',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: 'var(--spacing-sm)',
                                color: 'white'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                            >
                                <div style={{ fontWeight: '600' }}>{item.product}</div>
                                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>by {item.user}</div>
                                <button style={{
                                    marginTop: 'var(--spacing-xs)',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    padding: '8px 16px',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    width: 'fit-content'
                                }}>
                                    Get Link <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Explore;
