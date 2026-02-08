import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import WaitlistForm from '../components/WaitlistForm';
import Reviews from '../components/Reviews';
import AppDownload from '../components/AppDownload';
import VideoDemo from '../components/VideoDemo';
import CreatorSpotlight from '../components/CreatorSpotlight';
import { motion } from 'framer-motion';
import { useLandingTheme } from '../hooks/useLandingTheme';
import '../styles/Landing.css';

const Landing = () => {
    const t = useLandingTheme();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ background: t.bg }}
        >
            <Hero />
            <VideoDemo />
            <Features />
            <CreatorSpotlight />
            <Reviews />
            <AppDownload />
            <WaitlistForm />
        </motion.div>
    );
};

export default Landing;
