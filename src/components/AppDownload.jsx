import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Apple, Play } from 'lucide-react';

const AppDownload = () => {
    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 'var(--spacing-lg)'
                }}>
                    <div style={{ maxWidth: '600px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-gradient"
                            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--spacing-sm)' }}
                        >
                            Your aesthetic, on the go.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}
                        >
                            Download the Dropp app to curate collections, follow creators, and shop instantly from anywhere.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}
                    >
                        <button className="btn btn-primary hover-scale" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: 'black',
                            color: 'white'
                        }}>
                            <Apple size={24} fill="white" />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Download on the</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '600', lineHeight: 1 }}>App Store</div>
                            </div>
                        </button>

                        <button className="btn btn-secondary hover-scale" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 32px',
                            backgroundColor: 'transparent',
                            borderColor: 'var(--border-color)'
                        }}>
                            <Play size={24} fill="currentColor" />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>GET IT ON</div>
                                <div style={{ fontSize: '1.125rem', fontWeight: '600', lineHeight: 1 }}>Google Play</div>
                            </div>
                        </button>
                    </motion.div>

                    {/* Mockup Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                            marginTop: 'var(--spacing-lg)',
                            width: '100%',
                            maxWidth: '800px',
                            height: '400px',
                            background: 'linear-gradient(180deg, var(--glass-bg) 0%, rgba(0,0,0,0) 100%)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            alignItems: 'flex-end',
                            height: '100%',
                            paddingBottom: '0'
                        }}>
                            {/* Phone Mockup 1 */}
                            <div style={{
                                width: '200px',
                                height: '350px',
                                background: 'var(--bg-primary)',
                                border: '8px solid #1a1a1a',
                                borderRadius: '32px 32px 0 0',
                                borderBottom: 'none',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', margin: '0 auto 10px' }}></div>
                                    <div style={{ height: '10px', width: '60%', background: '#eee', margin: '0 auto' }}></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '2px' }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{ aspectRatio: '1', background: '#f5f5f5' }}></div>
                                    ))}
                                </div>
                            </div>

                            {/* Phone Mockup 2 (Center, Taller) */}
                            <div style={{
                                width: '220px',
                                height: '400px',
                                background: 'var(--bg-primary)',
                                border: '8px solid #1a1a1a',
                                borderRadius: '32px 32px 0 0',
                                borderBottom: 'none',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                zIndex: 2,
                                overflow: 'hidden'
                            }}>
                                <div style={{ height: '100%', background: '#fafafa', padding: '10px' }}>
                                    <div style={{ height: '200px', background: '#eee', borderRadius: '16px', marginBottom: '10px' }}></div>
                                    <div style={{ height: '15px', width: '80%', background: '#ddd', marginBottom: '5px' }}></div>
                                    <div style={{ height: '15px', width: '40%', background: '#ddd' }}></div>
                                </div>
                            </div>

                            {/* Phone Mockup 3 */}
                            <div style={{
                                width: '200px',
                                height: '350px',
                                background: 'var(--bg-primary)',
                                border: '8px solid #1a1a1a',
                                borderRadius: '32px 32px 0 0',
                                borderBottom: 'none',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                overflow: 'hidden'
                            }}>
                                <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} style={{ aspectRatio: '3/4', background: '#f0f0f0', borderRadius: '8px' }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
