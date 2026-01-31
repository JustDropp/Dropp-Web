import React from 'react';
import { motion } from 'framer-motion';

const AboutNav = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <div className="container text-center">
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>About Dropp</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Where influence meets reality. We are redefining social commerce.</p>
            </div>
        </motion.div>
    );
};

export default AboutNav;
