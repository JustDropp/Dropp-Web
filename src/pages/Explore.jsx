import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MasonryGrid from '../components/MasonryGrid';
import { mockCollections, categories, getCollectionsByCategory } from '../data/mockData';
import '../styles/Explore.css';

const Explore = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [collections, setCollections] = useState(mockCollections);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCollections(getCollectionsByCategory(category));
    };

    const featuredCollection = mockCollections[0];

    return (
        <motion.div
            className="explore-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="explore-header">
                <h1 className="explore-title">Explore Collections</h1>

                <div className="explore-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search collections, items or creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
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

            <div className="featured-collection">
                <img src={featuredCollection.image} alt={featuredCollection.title} />
                <div className="featured-overlay">
                    <div className="featured-content">
                        <span className="featured-badge">{featuredCollection.category}</span>
                        <h2>{featuredCollection.title}</h2>
                        <p>Curated by {featuredCollection.creator.name} • {featuredCollection.itemCount} items</p>
                        <button className="explore-collection-btn">
                            Explore Collection
                        </button>
                    </div>
                </div>
            </div>

            <div className="explore-content">
                <MasonryGrid collections={collections} />
            </div>
        </motion.div>
    );
};

export default Explore;
