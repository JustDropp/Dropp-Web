import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import FloatingActionButton from '../components/FloatingActionButton';
import UserService from '../core/services/UserService';
import { useData } from '../contexts/DataContext';
import '../styles/Profile.css';
import { API_CONFIG } from '../core/config/apiConfig';
import CollectionService from '../core/services/CollectionService';
import { ShimmerProfileHeader, ShimmerCollectionGrid } from '../components/Shimmer';

import EditProfileModal from '../components/EditProfileModal';
import { AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    // Local state for collections to use the specific endpoint
    const [profileCollections, setProfileCollections] = React.useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                setError(null);

                let profileData;

                // Determine which user to fetch
                if (username === 'me' || !username) {
                    // Fetch own profile
                    profileData = await UserService.getUserProfile();
                } else {
                    // Check if the username matches the current logged-in user (optimization)
                    const currentUser = await UserService.getUserProfile().catch(() => null);

                    if (currentUser && currentUser.username === username) {
                        profileData = currentUser;
                    } else {
                        // Fetch specific user by username
                        const result = await UserService.getUserByUsername(username);
                        // Handle different response structures
                        profileData = result.result || result.user || result;
                    }
                }

                if (!profileData) {
                    throw new Error("Profile data is empty");
                }

                setUser(profileData);

                // Fetch collections using the specific endpoint
                if (profileData._id || profileData.id) {
                    const userId = profileData._id || profileData.id;
                    const collectionsData = await CollectionService.getUserCollections(userId);
                    setProfileCollections(collectionsData);
                }
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                // Show specific error message
                const errorMessage = err.response?.data?.message || err.message || "Failed to load profile data.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username]);

    // Check if we are viewing our own profile
    const isOwnProfile = username === 'me' || (user && user._id === (user.id || user._id)); // simplified check, can be improved with auth context

    const handleFollow = () => {
        console.log('Follow/Unfollow user');
    };

    const handleMessage = () => {
        console.log('Open messages');
    };

    const handleUpdateProfile = async (updatedUser) => {
        console.log("Profile updated, refreshing data...");
        try {
            const profileData = await UserService.getUserProfile();
            setUser(profileData);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
            if (updatedUser) setUser(updatedUser);
        }
    };

    // Refresh collections helper
    const refreshCollections = async () => {
        if (user && (user._id || user.id)) {
            const userId = user._id || user.id;
            try {
                const collectionsData = await CollectionService.getUserCollections(userId);
                setProfileCollections(collectionsData);
            } catch (err) {
                console.error("Failed to refresh collections:", err);
            }
        }
    };

    if (loading) {
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
    if (error) return <div className="profile-error">{error}</div>;
    if (!user) return <div className="profile-not-found">User not found</div>;

    const adaptedUser = {
        ...user,
        avatar: user.profileImageUrl ? (user.profileImageUrl.startsWith('http') ? user.profileImageUrl : API_CONFIG.BASE_URL + user.profileImageUrl) : null,
        stats: {
            followers: user.followers || 0,
            following: user.following || 0,
            collections: profileCollections.length
        }
    };

    // Instant update helper
    const handleCollectionUpdate = (id, updatedData) => {
        setProfileCollections(prev => prev.map(c =>
            (c._id === id || c.id === id) ? { ...c, ...updatedData } : c
        ));
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
                    isOwnProfile={isOwnProfile}
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                    onEditProfile={() => setIsEditModalOpen(true)}
                />

                <ProfileTabs
                    collections={profileCollections}
                    activeTab="collections"
                    onRefresh={refreshCollections}
                    onUpdateCollection={handleCollectionUpdate}
                />

                <AnimatePresence>
                    {isEditModalOpen && (
                        <EditProfileModal
                            user={user}
                            onClose={() => setIsEditModalOpen(false)}
                            onUpdate={handleUpdateProfile}
                        />
                    )}
                </AnimatePresence>
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Profile;