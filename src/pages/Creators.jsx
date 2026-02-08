import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, ExternalLink } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import '../styles/Creators.css';

const Creators = () => {
    const [followedCreators, setFollowedCreators] = useState(new Set());

    const handleFollow = (userId) => {
        setFollowedCreators(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    // Extend mock users with more creators
    const creators = [
        ...mockUsers,
        {
            id: 3,
            username: 'davidkim',
            name: 'David Kim',
            avatar: 'https://i.pravatar.cc/150?img=8',
            bio: 'Tech reviewer | Gadget enthusiast | Sharing the best tech finds',
            location: 'San Francisco, CA',
            website: 'davidkimtech.com',
            followers: 28500,
            collectionsCount: 450
        },
        {
            id: 4,
            username: 'emmawilson',
            name: 'Emma Wilson',
            avatar: 'https://i.pravatar.cc/150?img=5',
            bio: 'Fashion & style curator | Minimalist wardrobe advocate',
            location: 'London, UK',
            website: 'emmastyle.co',
            followers: 52000,
            collectionsCount: 680
        },
        {
            id: 5,
            username: 'mikejohnson',
            name: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=12',
            bio: 'Outdoor gear expert | Adventure photographer',
            location: 'Denver, CO',
            website: null,
            followers: 19800,
            collectionsCount: 320
        },
        {
            id: 6,
            username: 'sophiamartinez',
            name: 'Sophia Martinez',
            avatar: 'https://i.pravatar.cc/150?img=9',
            bio: 'Home decor & interior design | Creating beautiful spaces',
            location: 'Austin, TX',
            website: 'sophiainteriors.com',
            followers: 41200,
            collectionsCount: 590
        }
    ];

    return (
        <motion.div
            className="creators-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="creators-container">
                <div className="creators-header">
                    <h1 className="creators-title">Discover <span className="accent">creators.</span></h1>
                    <p className="creators-subtitle">
                        Follow curators who share your interests and discover amazing collections
                    </p>
                </div>

                <div className="creators-grid">
                    {creators.map((creator) => (
                        <motion.div
                            key={creator.id}
                            className="creator-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="creator-card-header">
                                <img
                                    src={creator.avatar}
                                    alt={creator.name}
                                    className="creator-avatar"
                                />
                                <div className="creator-info">
                                    <h3 className="creator-name">{creator.name}</h3>
                                    <p className="creator-username">@{creator.username}</p>
                                </div>
                            </div>

                            <p className="creator-bio">{creator.bio}</p>

                            <div className="creator-meta">
                                {creator.location && (
                                    <div className="creator-location">
                                        <MapPin size={14} />
                                        <span>{creator.location}</span>
                                    </div>
                                )}
                                {creator.website && (
                                    <a
                                        href={`https://${creator.website}`}
                                        className="creator-website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink size={14} />
                                        <span>{creator.website}</span>
                                    </a>
                                )}
                            </div>

                            <div className="creator-stats">
                                <div className="creator-stat">
                                    <span className="stat-value">{(creator.followers / 1000).toFixed(1)}K</span>
                                    <span className="stat-label">Followers</span>
                                </div>
                                <div className="creator-stat">
                                    <span className="stat-value">{creator.collectionsCount}</span>
                                    <span className="stat-label">Collections</span>
                                </div>
                            </div>

                            <button
                                className={`creator-follow-btn ${followedCreators.has(creator.id) ? 'following' : ''}`}
                                onClick={() => handleFollow(creator.id)}
                            >
                                <UserPlus size={16} />
                                {followedCreators.has(creator.id) ? 'Following' : 'Follow'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Creators;
