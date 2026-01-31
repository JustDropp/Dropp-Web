import React from 'react';
import CollectionCard from './CollectionCard';
import '../styles/Collection.css';

const MasonryGrid = ({ collections, columns = { desktop: 4, tablet: 3, mobile: 2 } }) => {
    return (
        <div className="masonry-grid">
            {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
};

export default MasonryGrid;
