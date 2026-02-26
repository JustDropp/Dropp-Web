import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Bell as BellIcon, Check, Package, User } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import '../styles/Notifications.css';

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    const { notifications, unreadCount, markAllAsRead, fetchNotifications } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const getIcon = (content) => {
        const text = content.toLowerCase();
        if (text.includes('liked collection')) {
            return <Heart size={18} fill="var(--accent-color)" stroke="var(--accent-color)" />;
        }
        if (text.includes('liked product')) {
            return <Heart size={18} fill="#3887F8" stroke="#3887F8" />;
        }
        if (text.includes('following')) {
            return <UserPlus size={18} stroke="var(--accent-color)" />;
        }
        return <BellIcon size={18} />;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

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
                            <motion.div
                                key={notification._id || notification.id}
                                className={`notification-item ${!notification.hasRead ? 'unread' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="notification-icon">
                                    {getIcon(notification.content)}
                                </div>

                                <div className="notification-avatar-placeholder">
                                    <User size={20} />
                                </div>

                                <div className="notification-content">
                                    <p>
                                        {notification.content}
                                    </p>
                                    <span className="notification-time">{formatTime(notification.createdAt)}</span>
                                </div>

                                {!notification.hasRead && (
                                    <div className="notification-unread-indicator" />
                                )}
                            </motion.div>
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
