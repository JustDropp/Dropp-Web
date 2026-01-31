import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Collection.css';

const CollectionCard = ({ collection }) => {
    const { image, title, subtitle, link, creator, itemCount } = collection;

    return (
        <Link to={link} className="collection-card">
            <div className="collection-card-image">
                <img src={image} alt={title} loading="lazy" />
                <div className="collection-card-overlay">
                    <div className="collection-card-content">
                        <h3 className="collection-card-title">{title}</h3>
                        <p className="collection-card-subtitle">{subtitle}</p>
                        {itemCount && (
                            <span className="collection-card-count">{itemCount} items</span>
                        )}
                    </div>
                </div>
            </div>

            {creator && (
                <div className="collection-card-creator">
                    <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="creator-avatar"
                    />
                    <span className="creator-name">{creator.name}</span>
                </div>
            )}
        </Link>
    );
};

export default CollectionCard;
