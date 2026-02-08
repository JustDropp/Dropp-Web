import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, MapPin, ExternalLink, Search, X, Loader, UserCheck } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import UserService from '../core/services/UserService';
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/Creators.css';

const Creators = () => {
    const navigate = useNavigate();
    const [followedCreators, setFollowedCreators] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                setSearchLoading(true);
                try {
                    const results = await UserService.searchUsers(searchQuery);
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

    const handleFollow = (e, userId) => {
        e.stopPropagation();
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

    const handleUserClick = (username) => {
        navigate(`/user/${username}`);
    };

    // Featured creators (mock data)
    const featuredCreators = [
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

                    {/* Search Bar */}
                    <div className="creators-search-container">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Search for creators..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="creators-search-input"
                            />
                            {searchQuery && (
                                <button
                                    className="clear-search-btn"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {isSearching && (
                    <div className="search-results-section">
                        <h2 className="section-title">
                            {searchLoading ? 'Searching...' : `Search Results (${searchResults.length})`}
                        </h2>

                        {searchLoading ? (
                            <div className="search-loading">
                                <Loader className="spin" size={30} />
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="creators-grid">
                                {searchResults.map((user) => (
                                    <motion.div
                                        key={user._id || user.id}
                                        className="creator-card"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onClick={() => handleUserClick(user.username)}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="creator-card-header">
                                            <img
                                                src={user.profileImageUrl?.startsWith('http')
                                                    ? user.profileImageUrl
                                                    : API_CONFIG.BASE_URL + (user.profileImageUrl || '/images/default.webp')}
                                                alt={user.fullName || user.username}
                                                className="creator-avatar"
                                            />
                                            <div className="creator-info">
                                                <h3 className="creator-name">{user.fullName || user.username}</h3>
                                                <p className="creator-username">@{user.username}</p>
                                            </div>
                                        </div>

                                        <p className="creator-bio">{user.bio || 'No bio available'}</p>

                                        <div className="creator-meta">
                                            {user.location && (
                                                <div className="creator-location">
                                                    <MapPin size={14} />
                                                    <span>{user.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="creator-stats">
                                            <div className="creator-stat">
                                                <span className="stat-value">{user.followers || 0}</span>
                                                <span className="stat-label">Followers</span>
                                            </div>
                                            <div className="creator-stat">
                                                <span className="stat-value">{user.following || 0}</span>
                                                <span className="stat-label">Following</span>
                                            </div>
                                        </div>

                                        <button
                                            className={`creator-follow-btn ${followedCreators.has(user._id || user.id) ? 'following' : ''}`}
                                            onClick={(e) => handleFollow(e, user._id || user.id)}
                                        >
                                            {followedCreators.has(user._id || user.id) ? <UserCheck size={16} /> : <UserPlus size={16} />}
                                            {followedCreators.has(user._id || user.id) ? 'Following' : 'Follow'}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <p>No creators found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Featured Creators (only show if not searching) */}
                {!isSearching && (
                    <>
                        <h2 className="section-title">Featured Creators</h2>
                        <div className="creators-grid">
                            {featuredCreators.map((creator) => (
                                <motion.div
                                    key={creator.id}
                                    className="creator-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ y: -5 }}
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
                                                onClick={(e) => e.stopPropagation()}
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
                                        onClick={(e) => handleFollow(e, creator.id)}
                                    >
                                        <UserPlus size={16} />
                                        {followedCreators.has(creator.id) ? 'Following' : 'Follow'}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default Creators;
