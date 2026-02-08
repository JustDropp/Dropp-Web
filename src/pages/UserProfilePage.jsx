import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    MapPin,
    Link as LinkIcon,
    UserPlus,
    UserCheck,
    MoreHorizontal,
    Share2,
    Ban,
    Flag,
    Grid,
    Loader,
    Copy,
    Check,
    X
} from 'lucide-react';
import UserService from '../core/services/UserService';
import CollectionService from '../core/services/CollectionService';
import { API_CONFIG } from '../core/config/apiConfig';
import ImageZoomModal from '../components/ImageZoomModal';
import Snackbar from '../components/Snackbar';
import CollectionCard from '../components/CollectionCard';
import { ShimmerCollectionGrid } from '../components/Shimmer';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showImageZoom, setShowImageZoom] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError(null);
                const userData = await UserService.getUserByUsername(username);
                setUser(userData);
                // Optionally fetch user's public collections
                // const userCollections = await CollectionService.getUserCollections(username);
                // setCollections(userCollections);
            } catch (err) {
                console.error('Failed to fetch user:', err);
                setError('User not found');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        setSnackbar({
            show: true,
            message: isFollowing ? `Unfollowed @${user?.username}` : `Following @${user?.username}`,
            type: 'success'
        });
    };

    const handleShareProfile = () => {
        const basePath = import.meta.env.BASE_URL || '/';
        const url = `${window.location.origin}${basePath}#/user/${username}`;
        navigator.clipboard.writeText(url);
        setShowMenu(false);
        setSnackbar({ show: true, message: 'Profile link copied!', type: 'success' });
    };

    const handleBlock = () => {
        setShowMenu(false);
        setSnackbar({
            show: true,
            message: `@${user?.username} has been blocked`,
            type: 'warning'
        });
    };

    const handleReport = () => {
        setShowMenu(false);
        setSnackbar({
            show: true,
            message: 'Report submitted. Thanks for helping keep Dropp safe.',
            type: 'info'
        });
    };

    const getProfileImageUrl = () => {
        if (!user?.profileImageUrl) return API_CONFIG.BASE_URL + '/images/default.webp';
        if (user.profileImageUrl.startsWith('http')) return user.profileImageUrl;
        return API_CONFIG.BASE_URL + user.profileImageUrl;
    };

    if (loading) {
        return (
            <div className="user-profile-loading">
                <Loader className="spin" size={40} />
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="user-profile-error">
                <h2>User not found</h2>
                <p>The user @{username} doesn't exist or may have been removed.</p>
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <motion.div
            className="user-profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header */}
            <div className="user-profile-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <h1 className="header-title">{user.fullName || user.username}</h1>
                <div className="header-actions">
                    <div className="menu-container">
                        <button
                            className="menu-btn"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <MoreHorizontal size={20} />
                        </button>
                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    className="user-profile-dropdown"
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                >
                                    <button onClick={handleShareProfile}>
                                        <Share2 size={16} />
                                        Share Profile
                                    </button>
                                    <button onClick={handleBlock}>
                                        <Ban size={16} />
                                        Block
                                    </button>
                                    <button className="danger" onClick={handleReport}>
                                        <Flag size={16} />
                                        Report
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="user-profile-content">
                {/* Profile Info */}
                <div className="user-profile-info-section">
                    <motion.img
                        className="user-profile-avatar"
                        src={getProfileImageUrl()}
                        alt={user.fullName || user.username}
                        onClick={() => setShowImageZoom(true)}
                        whileHover={{ scale: 1.02 }}
                        style={{ cursor: 'pointer' }}
                    />

                    <div className="user-profile-details">
                        <h2 className="user-profile-name">{user.fullName || 'User'}</h2>
                        <p className="user-profile-username">@{user.username}</p>

                        {user.bio && (
                            <p className="user-profile-bio">{user.bio}</p>
                        )}

                        <div className="user-profile-meta">
                            {user.location && (
                                <div className="meta-item">
                                    <MapPin size={14} />
                                    <span>{user.location}</span>
                                </div>
                            )}
                            {user.link && (
                                <a
                                    href={user.link.startsWith('http') ? user.link : `https://${user.link}`}
                                    className="meta-item link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <LinkIcon size={14} />
                                    <span>{user.link}</span>
                                </a>
                            )}
                        </div>

                        <div className="user-profile-stats">
                            <div className="stat">
                                <span className="stat-value">{user.followers || 0}</span>
                                <span className="stat-label">Followers</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{user.following || 0}</span>
                                <span className="stat-label">Following</span>
                            </div>
                        </div>

                        <button
                            className={`follow-btn ${isFollowing ? 'following' : ''}`}
                            onClick={handleFollow}
                        >
                            {isFollowing ? (
                                <>
                                    <UserCheck size={18} />
                                    Following
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Follow
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Collections Section */}
                <div className="collections-section">
                    <h3 className="section-title">
                        <Grid size={20} />
                        Collections
                    </h3>

                    {loading ? (
                        <div style={{ marginTop: '1rem' }}>
                            <ShimmerCollectionGrid count={3} />
                        </div>
                    ) : collections.length > 0 ? (
                        <div className="pinterest-grid">
                            {collections.map((collection) => (
                                <CollectionCard
                                    key={collection._id || collection.id}
                                    collection={collection}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-collections">
                            <Grid size={40} strokeWidth={1} />
                            <p>No public collections yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Zoom Modal */}
            <ImageZoomModal
                isOpen={showImageZoom}
                imageUrl={getProfileImageUrl()}
                alt={user.fullName || user.username}
                onClose={() => setShowImageZoom(false)}
            />

            {/* Snackbar */}
            <Snackbar
                isVisible={snackbar.show}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, show: false })}
            />
        </motion.div>
    );
};

export default UserProfilePage;
