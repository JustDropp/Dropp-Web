import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import UserService from '../core/services/UserService';
import CollectionService from '../core/services/CollectionService';
import { API_CONFIG } from '../core/config/apiConfig';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import ImageZoomModal from '../components/ImageZoomModal';
import Snackbar from '../components/Snackbar';
import { ShimmerProfileHeader, ShimmerCollectionGrid } from '../components/Shimmer';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

const UserProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, isAuthenticated } = useAuth();

    const [user, setUser] = useState(null);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collectionsLoading, setCollectionsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showImageZoom, setShowImageZoom] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

    const isOwnProfile = isAuthenticated && (currentUser?.id === userId || currentUser?._id === userId);

    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchUserCollections();
        }
    }, [userId]);

    useEffect(() => {
        if (isOwnProfile) {
            navigate('/profile/me', { replace: true });
        }
    }, [isOwnProfile, navigate]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);
            const userData = await UserService.getUserById(userId);
            setUser(userData);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            setError('User not found');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserCollections = async () => {
        try {
            setCollectionsLoading(true);
            const userCollections = await CollectionService.getUserCollections(userId);
            setCollections(userCollections);
        } catch (err) {
            console.error('Failed to fetch collections:', err);
            setCollections([]);
        } finally {
            setCollectionsLoading(false);
        }
    };

    const handleFollow = () => {
        if (!isAuthenticated) {
            navigate('/signup');
            return;
        }
        setIsFollowing(!isFollowing);
        setSnackbar({
            show: true,
            message: isFollowing ? `Unfollowed @${user?.username}` : `Following @${user?.username}`,
            type: 'success'
        });
    };

    const handleMessage = () => {
        setSnackbar({ show: true, message: 'Messages coming soon!', type: 'info' });
    };

    const handleShareProfile = () => {
        const basePath = import.meta.env.BASE_URL || '/';
        const url = `${window.location.origin}${basePath}#/user/${userId}`;
        navigator.clipboard.writeText(url);
        setSnackbar({ show: true, message: 'Profile link copied!', type: 'success' });
    };

    const handleBlock = () => {
        setSnackbar({
            show: true,
            message: `@${user?.username} has been blocked`,
            type: 'warning'
        });
    };

    const handleReport = () => {
        setSnackbar({
            show: true,
            message: 'Report submitted. Thanks for keeping Dropp safe.',
            type: 'info'
        });
    };

    const getProfileImageUrl = () => {
        if (!user?.profileImageUrl) return API_CONFIG.BASE_URL + '/images/default.webp';
        if (user.profileImageUrl.startsWith('http')) return user.profileImageUrl;
        return API_CONFIG.BASE_URL + user.profileImageUrl;
    };

    if (loading || collectionsLoading) {
        return (
            <div className="profile-page">
                <div className="profile-container">
                    <ShimmerProfileHeader />
                    <div style={{ padding: '0 2rem' }}>
                        <ShimmerCollectionGrid count={6} />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="profile-page">
                <div className="profile-error-state">
                    <h2>User not found</h2>
                    <p>This user doesn't exist or may have been removed.</p>
                    <button className="profile-edit-btn" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const adaptedUser = {
        ...user,
        avatar: getProfileImageUrl(),
        isFollowing,
        stats: {
            followers: user.followers || 0,
            following: user.following || 0,
            collections: collections.length
        }
    };

    return (
        <motion.div
            className="profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="profile-container">
                <ProfileHeader
                    user={adaptedUser}
                    isOwnProfile={false}
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                    onShareProfile={handleShareProfile}
                    onBlock={handleBlock}
                    onReport={handleReport}
                    onAvatarClick={() => setShowImageZoom(true)}
                />

                <ProfileTabs
                    collections={collections}
                    activeTab="collections"
                    isOwner={false}
                />
            </div>

            <ImageZoomModal
                isOpen={showImageZoom}
                imageUrl={getProfileImageUrl()}
                alt={user.fullName || user.username}
                onClose={() => setShowImageZoom(false)}
            />

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
