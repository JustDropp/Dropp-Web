import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, X, Loader } from 'lucide-react';
import CollectionCard from '../components/CollectionCard';
import { ShimmerCollectionGrid } from '../components/Shimmer';
import FloatingActionButton from '../components/FloatingActionButton';
import CollectionService from '../core/services/CollectionService';
import { categories } from '../data/mockData';
import '../styles/Home.css';
import '../styles/Profile.css';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [collections, setCollections] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchCollections();
    }, []);

    // Debounced search using API
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                setSearchLoading(true);
                try {
                    const results = await CollectionService.searchCollections(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Search failed:', error);
                    setSearchResults([]);
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setIsSearching(false);
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchCollections = async () => {
        try {
            setLoading(true);
            const data = await CollectionService.getExploreCollections();
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

    // Use search results when searching, otherwise show all collections
    const displayedCollections = isSearching ? searchResults : collections;

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

                <div className="home-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search collections, items or creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="clear-search-btn"
                            onClick={() => setSearchQuery('')}
                        >
                            <X size={16} />
                        </button>
                    )}
                    {searchLoading && <Loader className="search-spinner" size={18} />}
                </div>
            </div>

            {!isSearching && (
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
            )}

            <div className="home-content">
                {isSearching && (
                    <h2 className="search-results-title">
                        {searchLoading ? 'Searching...' : `Search Results (${searchResults.length})`}
                    </h2>
                )}

                {loading || searchLoading ? (
                    <ShimmerCollectionGrid count={8} />
                ) : displayedCollections.length > 0 ? (
                    <div className="pinterest-grid">
                        {displayedCollections.map((collection) => (
                            <CollectionCard
                                key={collection._id || collection.id}
                                collection={collection}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <Grid size={48} />
                        <p>{isSearching ? `No collections found for "${searchQuery}"` : 'No collections yet'}</p>
                    </div>
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Home;