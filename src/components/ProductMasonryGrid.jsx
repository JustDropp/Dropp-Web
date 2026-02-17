import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductMasonryGrid.css';

const ProductMasonryGrid = ({ products }) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="product-masonry-grid">
            {products.map((product) => (
                <div key={product._id || product.id} className="product-masonry-item">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductMasonryGrid;
