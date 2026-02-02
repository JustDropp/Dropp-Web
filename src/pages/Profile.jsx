import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import UserService from '../core/services/UserService';
import '../styles/Profile.css';
import apiClient from '../core/config/apiClient';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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

    if (loading) return <div className="profile-loading">Loading...</div>;
    if (error) return <div className="profile-error">{error}</div>;
    if (!user) return <div className="profile-not-found">User not found</div>;

    // Adapt user data for ProfileHeader
    const adaptedUser = {
        ...user,
        avatar: user.profileImageUrl,
        stats: {
            followers: user.followers,
            following: user.following,
            collections: user.collections ? user.collections.length : 0
        },
        location: user.location || '',
        website: user.website || ''
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
                />

                <ProfileTabs
                    collections={user.collections || []}
                    activeTab="collections"
                />
            </div>
        </motion.div>
    );
};

export default Profile;