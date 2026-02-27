import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, UserPlus, Bell as BellIcon, Check, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import UserService from '../core/services/UserService';
import '../styles/Notifications.css';

const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
};

export const getNotificationMessage = (notification) => {
    const username = notification.entitySnapshot?.username || 'Someone';
    switch (notification.type) {
        case 'follow':
            return `${username} started following you`;
        case 'like':
            if (notification.entityModel === 'collection') return `${username} liked your collection`;
            return `${username} liked your product`;
        default:
            return `New notification`;
    }
};

const getIcon = (notification) => {
    switch (notification.type) {
        case 'follow':
            return <UserPlus size={18} stroke="var(--accent-color)" />;
        case 'like':
            if (notification.entityModel === 'collection')
                return <Heart size={18} fill="var(--accent-color)" stroke="var(--accent-color)" />;
            return <Heart size={18} fill="#3887F8" stroke="#3887F8" />;
        default:
            return <BellIcon size={18} />;
    }
};

const getNavigationPath = (notification) => {
    switch (notification.type) {
        case 'follow':
            return notification.entitySnapshot?.username
                ? `/profile/${notification.entitySnapshot.username}`
                : null;
        case 'like':
            if (notification.entityModel === 'collection') return `/c/${notification.entity}`;
            if (notification.entityModel === 'product') return `/product/${notification.entity}`;
            return null;
        default:
            return null;
    }
};

const NotificationItem = ({ notification }) => {
    const navigate = useNavigate();
    const [followLoading, setFollowLoading] = useState(false);
    const [followed, setFollowed] = useState(false);

    const path = getNavigationPath(notification);

    const handleClick = () => {
        if (path) navigate(path);
    };

    const handleFollowBack = async (e) => {
        e.stopPropagation();
        if (followLoading || followed) return;
        setFollowLoading(true);
        try {
            await UserService.followUser(notification.sender);
            setFollowed(true);
        } catch (err) {
            console.error('Follow back failed:', err);
        } finally {
            setFollowLoading(false);
        }
    };

    return (
        <motion.div
            className={`notification-item ${!notification.hasRead ? 'unread' : ''} ${path ? 'clickable' : ''}`}
            onClick={handleClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="notification-icon">
                {getIcon(notification)}
            </div>

            <div className="notification-avatar-placeholder">
                <User size={20} />
            </div>

            <div className="notification-content">
                <p>{getNotificationMessage(notification)}</p>
                <span className="notification-time">{formatTime(notification.createdAt)}</span>
            </div>

            {notification.type === 'follow' && (
                <button
                    className={`follow-back-btn ${followed ? 'followed' : ''}`}
                    onClick={handleFollowBack}
                    disabled={followLoading || followed}
                >
                    {followed ? 'Following' : followLoading ? '...' : 'Follow back'}
                </button>
            )}

            {!notification.hasRead && <div className="notification-unread-indicator" />}
        </motion.div>
    );
};

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    const { notifications, unreadCount, markAllAsRead, fetchNotifications } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.hasRead);

    return (
        <motion.div
            className="notifications-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="notifications-container">
                <div className="notifications-header">
                    <h1 className="notifications-title">Notifications</h1>

                    <div className="notifications-filters">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                            onClick={() => setFilter('unread')}
                        >
                            Unread {unreadCount > 0 && `(${unreadCount})`}
                        </button>
                    </div>
                </div>

                <div className="notifications-list">
                    {filteredNotifications.length === 0 ? (
                        <div className="empty-state">
                            <BellIcon size={48} stroke="var(--text-secondary)" />
                            <h2>No notifications</h2>
                            <p>You're all caught up!</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <NotificationItem
                                key={notification._id || notification.id}
                                notification={notification}
                            />
                        ))
                    )}
                </div>

                {unreadCount > 0 && (
                    <div className="notifications-actions">
                        <button className="action-btn" onClick={markAllAsRead}>
                            <Check size={16} />
                            Mark all as read
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Notifications;
