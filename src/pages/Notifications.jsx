import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Bell as BellIcon, Check } from 'lucide-react';
import '../styles/Notifications.css';

const Notifications = () => {
    const [filter, setFilter] = useState('all');

    const notifications = [
        {
            id: 1,
            type: 'like',
            user: 'Sarah Chen',
            avatar: 'https://i.pravatar.cc/150?img=1',
            action: 'liked your collection',
            collection: 'Minimalist Workspace',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'follow',
            user: 'Alex Rivera',
            avatar: 'https://i.pravatar.cc/150?img=2',
            action: 'started following you',
            time: '5 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'comment',
            user: 'Mike Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
            action: 'commented on',
            collection: 'Urban Architecture',
            comment: 'Amazing collection! 🔥',
            time: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'like',
            user: 'Emma Wilson',
            avatar: 'https://i.pravatar.cc/150?img=4',
            action: 'liked your collection',
            collection: 'Nature Photography',
            time: '2 days ago',
            read: true
        },
        {
            id: 5,
            type: 'follow',
            user: 'David Kim',
            avatar: 'https://i.pravatar.cc/150?img=8',
            action: 'started following you',
            time: '3 days ago',
            read: true
        },
    ];

    const getIcon = (type) => {
        switch (type) {
            case 'like':
                return <Heart size={18} fill="var(--accent-color)" stroke="var(--accent-color)" />;
            case 'comment':
                return <MessageCircle size={18} stroke="var(--accent-color)" />;
            case 'follow':
                return <UserPlus size={18} stroke="var(--accent-color)" />;
            default:
                return <BellIcon size={18} />;
        }
    };

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.read);

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
                            Unread
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
                                key={notification.id}
                                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="notification-icon">
                                    {getIcon(notification.type)}
                                </div>

                                <img
                                    src={notification.avatar}
                                    alt={notification.user}
                                    className="notification-avatar"
                                />

                                <div className="notification-content">
                                    <p>
                                        <strong>{notification.user}</strong> {notification.action}
                                        {notification.collection && (
                                            <> <strong>{notification.collection}</strong></>
                                        )}
                                    </p>
                                    {notification.comment && (
                                        <p className="notification-comment">{notification.comment}</p>
                                    )}
                                    <span className="notification-time">{notification.time}</span>
                                </div>

                                {!notification.read && (
                                    <div className="notification-unread-indicator" />
                                )}
                            </motion.div>
                        ))
                    )}
                </div>

                {filteredNotifications.length > 0 && (
                    <div className="notifications-actions">
                        <button className="action-btn">
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
