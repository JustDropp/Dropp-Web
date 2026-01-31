import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MasonryGrid from '../components/MasonryGrid';
import { mockCollections, categories, getCollectionsByCategory } from '../data/mockData';
import '../styles/Home.css';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [collections, setCollections] = useState(mockCollections);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCollections(getCollectionsByCategory(category));
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
                <h1 className="home-title">Discover Collections</h1>
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
                <MasonryGrid collections={collections} />
            </div>
        </motion.div>
    );
};

export default Home;