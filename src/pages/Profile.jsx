import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import UserService from '../core/services/UserService';
import '../styles/Profile.css';
import apiClient from '../core/config/apiClient';
import { API_CONFIG } from '../core/config/apiConfig';

import EditProfileModal from '../components/EditProfileModal';
import { AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                // If we have a username param and it's different from logged in user, we might need a different API
                // For now, based on prompt, we are just implementing GET user/profile which usually returns logged in user
                // or specific user if the endpoint supports parameters (which the prompt defined as user/profile/)
                // Assuming this endpoint returns the profile of the authenticated user or the requested user context.
                // Given the prompt specific data, it seems to be a specific user profile.

                const profileData = await UserService.getUserProfile();
                setUser(profileData);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
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
            // We can use the existing user data or params to know which profile to fetch, 
            // but usually after edit it is the own profile.
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
            collections: user.collections ? user.collections.length : 0
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
                    collections={user.collections || []}
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
        </motion.div>
    );
};

export default Profile;