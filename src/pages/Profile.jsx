import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import FloatingActionButton from '../components/FloatingActionButton';
import UserService from '../core/services/UserService';
import CollectionService from '../core/services/CollectionService';
import '../styles/Profile.css';
import apiClient from '../core/config/apiClient';
import { API_CONFIG } from '../core/config/apiConfig';

import EditProfileModal from '../components/EditProfileModal';
import { AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [collections, setCollections] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);

                // Fetch user profile
                const profileData = await UserService.getUserProfile();
                setUser(profileData);

                // Fetch user collections
                const collectionsData = await CollectionService.getCollections();
                setCollections(collectionsData);
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username]);

    const handleFollow = () => {
        console.log('Follow/Unfollow user');
        // TODO: Implement follow/unfollow logic
    };

    const handleMessage = () => {
        console.log('Open messages');
        // TODO: Implement messaging
    };

    const handleUpdateProfile = async (updatedUser) => {
        console.log("Profile updated, refreshing data...");
        // Re-fetch the profile to ensure we have the absolute latest data from server
        try {
            const profileData = await UserService.getUserProfile();
            setUser(profileData);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
            // Fallback to the local update if fetch fails, to show some progress at least
            if (updatedUser) setUser(updatedUser);
        }
    };

    if (loading) return <div className="profile-loading">Loading...</div>;
    if (error) return <div className="profile-error">{error}</div>;
    // Keep showing profile even if "user" is temporarily unstable, handled by conditional chaining below
    if (!user) return <div className="profile-not-found">User not found</div>;

    // Adapt user data for ProfileHeader
    const adaptedUser = {
        ...user,
        avatar: user.profileImageUrl ? (user.profileImageUrl.startsWith('http') ? user.profileImageUrl : API_CONFIG.BASE_URL + user.profileImageUrl) : null,
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
                    isOwnProfile={true} // converting simple boolean for now as auth check logic is separate
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                    onEditProfile={() => setIsEditModalOpen(true)}
                />

                <ProfileTabs
                    collections={collections}
                    activeTab="collections"
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