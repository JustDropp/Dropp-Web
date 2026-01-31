import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorSpotlight = () => {
    const creators = [
        { id: 1, username: "alex_style", name: "Alex Morgan", role: "Minimalist", image: "https://i.pravatar.cc/300?u=alex", cover: "https://picsum.photos/seed/desk/600/400" },
        { id: 2, username: "sarah_fash", name: "Sarah Jenkins", role: "Fashion", image: "https://i.pravatar.cc/300?u=sarah", cover: "https://picsum.photos/seed/summer/600/400" },
        { id: 3, username: "mike_tech", name: "Mike Chen", role: "Tech Setup", image: "https://i.pravatar.cc/300?u=mike", cover: "https://picsum.photos/seed/camera/600/400" },
        { id: 4, username: "elena_home", name: "Elena Ross", role: "Interior", image: "https://i.pravatar.cc/300?u=elena", cover: "https://picsum.photos/seed/living/600/400" },
    ];

    const [activeCreator, setActiveCreator] = useState(creators[0]);

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h2 className="text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--spacing-xs)' }}>
                                Curated by the best.
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                                Discover collections from top creators.
                            </p>
                        </div>
                        <Link to="/explore" className="btn btn-secondary hover-scale" style={{ gap: '8px' }}>
                            Explore All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="creator-spotlight-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', alignItems: 'center' }}>

                        {/* Creator List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {creators.map((creator) => (
                                <motion.div
                                    key={creator.id}
                                    onClick={() => setActiveCreator(creator)}
                                    whileHover={{ x: 10 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: 'var(--radius-lg)',
                                        background: activeCreator.id === creator.id ? 'var(--bg-primary)' : 'transparent',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        transition: 'background 0.3s ease',
                                        border: activeCreator.id === creator.id ? '1px solid var(--border-color)' : '1px solid transparent'
                                    }}
                                >
                                    <img
                                        src={creator.image}
                                        alt={creator.name}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{creator.name}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{creator.role}</p>
                                    </div>
                                    {activeCreator.id === creator.id && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Preview Card */}
                        <div style={{ position: 'relative', height: '400px' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCreator.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="glass-panel"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 'var(--radius-xl)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div style={{ height: '60%', overflow: 'hidden' }}>
                                        <img
                                            src={activeCreator.cover}
                                            alt="Collection Cover"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <img src={activeCreator.image} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                                                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>@{activeCreator.username}</span>
                                                <CheckCircle size={14} fill="black" color="white" />
                                            </div>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>Latest Collection</h3>
                                        </div>
                                        <Link
                                            to={`/profile/${activeCreator.username}`}
                                            className="btn btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreatorSpotlight;
