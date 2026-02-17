import React from 'react';
import { motion } from 'framer-motion';
// import { Heart } from 'lucide-react'; // Uncomment when save functionality is needed
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/ExploreCard.css'; // Reusing explore card styles for now as they are similar

const ProductCard = ({ product }) => {
    const handleCardClick = () => {
        if (product.link) {
            window.open(product.link, '_blank');
        }
    };

    const getImageUrl = (url) => {
        if (!url) return API_CONFIG.BASE_URL + '/images/book.svg'; // Fallback
        if (url.startsWith('http')) return url;
        return API_CONFIG.BASE_URL + url;
    };

    const displayImage = getImageUrl(product.image || product.imageUrl);

    return (
        <motion.div
            className="explore-card"
            onClick={handleCardClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            {/* Product Image */}
            <div className="explore-card-image-container">
                <img
                    src={displayImage}
                    alt={product.name || product.title}
                    className="explore-card-image"
                    onError={(e) => { e.target.src = API_CONFIG.BASE_URL + '/images/book.svg'; }}
                />

                {/* Hover Overlay - Future implementation for save/like */}
                {/* <div className="explore-card-overlay">
                    <div className="explore-card-actions">
                        <button className="explore-action-btn save-btn">
                            <Heart size={18} />
                            Save
                        </button>
                    </div>
                </div> */}
            </div>

            {/* Product Info */}
            <div className="explore-card-content">
                <h3 className="explore-card-title">{product.name || product.title}</h3>
                {product.description && (
                    <p className="explore-card-desc">{product.description}</p>
                )}
                {product.price && (
                    <p className="explore-card-price">{product.price}</p>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
