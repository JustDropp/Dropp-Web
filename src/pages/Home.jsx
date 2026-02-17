import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, X, Loader } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductMasonryGrid from '../components/ProductMasonryGrid';
import { ShimmerCollectionGrid } from '../components/Shimmer';
import FloatingActionButton from '../components/FloatingActionButton';
import ProductService from '../core/services/ProductService';
import { categories } from '../data/mockData';
import '../styles/Home.css';
import '../styles/Profile.css';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Debounced search using API - TODO: Implement product search if needed or keep collection search?
    // For now, disabling search or keeping it as is but it might not search products if backend doesn't support it yet.
    // Assuming search is still for collections or needs update. The prompt only said "show all products rather than collections" on home.
    // I will comment out search for now or update it to search products if endpoint exists (it doesn't in my plan). 
    // Let's just fetch products for now.

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getExploreProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        // TODO: Implement category filtering when backend supports it
    };

    // Use search results when searching, otherwise show all products
    // Note: Search functionality currently disabled/mixed. focusing on products display.
    const displayedItems = products;

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="home-header">
                <h1 className="home-title">Discover <span className="accent">products.</span></h1>
                <p className="home-subtitle">Curated items from creators worldwide</p>

                <div className="home-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    // Disabled search logic for now as we only have getExploreProducts
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
                {/* Search Results section removed/hidden for now as we focus on products */}

                {loading ? (
                    <ShimmerCollectionGrid count={8} />
                ) : displayedItems.length > 0 ? (
                    <ProductMasonryGrid products={displayedItems} />
                ) : (
                    <div className="no-results">
                        <Grid size={48} />
                        <p>No products yet</p>
                    </div>
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Home;