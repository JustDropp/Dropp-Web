import React from 'react';
import { motion } from 'framer-motion';

const Creators = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <div className="container text-center">
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Creators</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Coming soon. Discover the best curators on Dropp.</p>
            </div>
        </motion.div>
    );
};

export default Creators;
