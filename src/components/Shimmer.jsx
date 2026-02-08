import React from 'react';
import '../styles/Shimmer.css';

export const ShimmerBase = ({ className = '', style = {} }) => (
    <div className={`shimmer ${className}`} style={style}></div>
);

export const ShimmerProfileHeader = () => (
    <div className="shimmer-profile-header">
        <div className="shimmer-header-top">
            <ShimmerBase className="shimmer-avatar" />
            <div className="shimmer-info">
                <ShimmerBase className="shimmer-line title" />
                <ShimmerBase className="shimmer-line subtitle" />
                <ShimmerBase className="shimmer-line text" />
                <div className="shimmer-stats">
                    <ShimmerBase className="shimmer-stat" />
                    <ShimmerBase className="shimmer-stat" />
                    <ShimmerBase className="shimmer-stat" />
                </div>
            </div>
        </div>
    </div>
);

export const ShimmerCollectionCard = () => (
    <div className="shimmer-card">
        <ShimmerBase className="shimmer-img-main" />
        <div className="shimmer-card-content">
            <ShimmerBase className="shimmer-line title" />
            <ShimmerBase className="shimmer-line text" />
        </div>
    </div>
);

export const ShimmerCollectionGrid = ({ count = 6 }) => (
    <div className="pinterest-grid">
        {Array(count).fill(0).map((_, i) => (
            <div key={i} className="pinterest-board shimmer-board">
                <div className="board-preview">
                    <ShimmerBase className="shimmer-cover" style={{ height: '100%', width: '100%' }} />
                </div>
                <div className="board-info">
                    <ShimmerBase className="shimmer-line title" style={{ width: '80%' }} />
                    <ShimmerBase className="shimmer-line text" style={{ width: '50%' }} />
                </div>
            </div>
        ))}
    </div>
);

export const ShimmerMasonryGrid = ({ count = 6 }) => (
    <div className="masonry-grid">
        {Array(count).fill(0).map((_, i) => (
            <div key={i} className="masonry-item shimmer-item">
                <ShimmerBase className="shimmer-cover" style={{ height: '200px', width: '100%' }} />
            </div>
        ))}
    </div>
);
