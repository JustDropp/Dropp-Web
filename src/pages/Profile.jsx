import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { getUserByUsername } from '../data/mockData';
import '../styles/Profile.css';

const Profile = () => {
    const { username } = useParams();
    const user = getUserByUsername(username || 'alexrivera');

    const handleFollow = () => {
        console.log('Follow/Unfollow user');
        // TODO: Implement follow/unfollow logic
    };

    const handleMessage = () => {
        console.log('Open messages');
        // TODO: Implement messaging
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
                    user={user}
                    isOwnProfile={user.isOwnProfile}
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                />

                <ProfileTabs
                    collections={user.collections}
                    activeTab="collections"
                />
            </div>
        </motion.div>
    );
};

export default Profile;