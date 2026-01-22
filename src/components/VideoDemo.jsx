import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoDemo = () => {
    return (
        <section style={{ padding: 'var(--spacing-xl) 0', position: 'relative', overflow: 'hidden' }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%)',
                zIndex: -1
            }}></div>

            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gradient"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--spacing-sm)' }}
                    >
                        See it in action.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}
                    >
                        Experience the seamless flow of discovery and collection.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1000px',
                        margin: '0 auto',
                        aspectRatio: '16/9',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                        border: '1px solid var(--glass-border)',
                        background: '#000'
                    }}
                >
                    {/* Placeholder Video UI */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(45deg, #111, #222)',
                        position: 'relative'
                    }}>
                        {/* Mock UI Elements inside video */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            right: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            opacity: 0.5
                        }}>
                            <div style={{ width: '60px', height: '8px', background: '#fff', borderRadius: '4px' }}></div>
                            <div style={{ width: '20px', height: '8px', background: '#fff', borderRadius: '4px' }}></div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                        >
                            <Play size={32} fill="white" color="white" style={{ marginLeft: '4px' }} />
                        </motion.button>

                        {/* Abstract shapes representing content */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                bottom: '-50px',
                                left: '10%',
                                width: '200px',
                                height: '300px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                transform: 'rotate(-10deg)'
                            }}
                        />
                        <motion.div
                            animate={{ y: [0, 30, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '10%',
                                width: '250px',
                                height: '350px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                transform: 'rotate(15deg)'
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoDemo;
