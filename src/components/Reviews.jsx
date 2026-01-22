import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah J.",
            role: "Fashion Blogger",
            content: "Dropp has completely changed how I share my outfits. My followers love the instant links.",
            avatar: "https://i.pravatar.cc/150?u=1"
        },
        {
            id: 2,
            name: "Mike T.",
            role: "Tech Reviewer",
            content: "Finally, a platform that respects the creator's aesthetic while being super functional.",
            avatar: "https://i.pravatar.cc/150?u=2"
        },
        {
            id: 3,
            name: "Elena R.",
            role: "Interior Designer",
            content: "The moodboard feature is a game changer for my design process. Highly recommend.",
            avatar: "https://i.pravatar.cc/150?u=3"
        },
        {
            id: 4,
            name: "David K.",
            role: "Photographer",
            content: "Clean, minimal, and effective. Exactly what I needed to showcase my gear.",
            avatar: "https://i.pravatar.cc/150?u=4"
        }
    ];

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', overflow: 'hidden' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h2 className="text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--spacing-sm)' }}>
                        Loved by Creators
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Join thousands of influencers using Dropp.</p>
                </div>

                <motion.div
                    className="no-scrollbar"
                    style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        overflowX: 'auto',
                        padding: 'var(--spacing-md) var(--spacing-xs)',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{
                                minWidth: '300px',
                                maxWidth: '350px',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-lg)',
                                scrollSnapAlign: 'start',
                                flexShrink: 0
                            }}
                        >
                            <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p style={{ marginBottom: 'var(--spacing-md)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                "{review.content}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '600' }}>{review.name}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{review.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Reviews;
