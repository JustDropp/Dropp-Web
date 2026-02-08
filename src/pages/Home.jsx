import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MasonryGrid from '../components/MasonryGrid';
import FloatingActionButton from '../components/FloatingActionButton';
import CollectionService from '../core/services/CollectionService';
import { categories } from '../data/mockData';
import '../styles/Home.css';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            setLoading(true);
            const data = await CollectionService.getCollections();
            setCollections(data);
        } catch (error) {
            console.error('Failed to fetch collections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        // TODO: Implement category filtering when backend supports it
    };

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="home-header">
                <h1 className="home-title">Discover <span className="accent">collections.</span></h1>
                <p className="home-subtitle">Curated inspiration from creators worldwide</p>
            </div>

            <div className="category-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="home-content">
                {loading ? (
                    <div className="loading-state">Loading collections...</div>
                ) : (
                    <MasonryGrid collections={collections} />
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Home;