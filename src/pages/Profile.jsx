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
import { ShimmerProfileHeader, ShimmerCollectionGrid } from '../components/Shimmer';

import EditProfileModal from '../components/EditProfileModal';
import { AnimatePresence } from 'framer-motion';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    // Use global collection state from DataContext
    const { collections, fetchCollections, collectionsLoading } = useData();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);

                // Fetch user profile
                const profileData = await UserService.getUserProfile();
                setUser(profileData);

                // Fetch collections using global state
                await fetchCollections();
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username, fetchCollections]);

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
    if (error) return <div className="profile-error">{error}</div>;
    if (!user) return <div className="profile-not-found">User not found</div>;

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
                    isOwnProfile={true}
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                    onEditProfile={() => setIsEditModalOpen(true)}
                />

                <ProfileTabs
                    collections={collections}
                    activeTab="collections"
                    onRefresh={fetchCollections}
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