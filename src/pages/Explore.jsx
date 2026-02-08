import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid } from 'lucide-react';
import FloatingActionButton from '../components/FloatingActionButton';
import CollectionService from '../core/services/CollectionService';
import CollectionCard from '../components/CollectionCard';
import { ShimmerCollectionGrid } from '../components/Shimmer';
import { categories } from '../data/mockData';
import '../styles/Explore.css';

const Explore = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [collections, setCollections] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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

    const featuredCollection = collections[0];

    return (
        <motion.div
            className="explore-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="explore-header">
                <h1 className="explore-title">Explore <span className="accent">collections.</span></h1>

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

            {featuredCollection && !loading && (
                <div className="featured-collection">
                    <img src={featuredCollection.displayImageUrl} alt={featuredCollection.title} />
                    <div className="featured-overlay">
                        <div className="featured-content">
                            <span className="featured-badge">Featured</span>
                            <h2>{featuredCollection.title}</h2>
                            <p>{featuredCollection.desc}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="explore-content">
                {loading ? (
                    <ShimmerCollectionGrid count={8} />
                ) : (
                    <div className="pinterest-grid">
                        {collections.map((collection) => (
                            <CollectionCard
                                key={collection._id || collection.id}
                                collection={collection}
                            />
                        ))}
                        {collections.length === 0 && (
                            <div className="no-results">
                                <Grid size={48} />
                                <p>No collections found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Explore;
