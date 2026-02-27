import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, UserPlus, Bell as BellIcon, Check, Package, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../core/services/UserService';
import '../styles/Notifications.css';

const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getNotificationMessage = (notification) => {
    const username = notification.entitySnapshot?.username;
    const entityName = notification.entitySnapshot?.name || notification.entitySnapshot?.title;
    switch (notification.type) {
        case 'follow':
            return `${username || 'Someone'} started following you`;
        case 'product_like':
            return entityName ? `Someone liked your product ${entityName}` : 'Someone liked your product';
        case 'collection_like':
            return entityName ? `Someone liked your collection ${entityName}` : 'Someone liked your collection';
        default:
            return 'New notification';
    }
};

const getTypeConfig = (type, entityModel) => {
    switch (type) {
        case 'follow':
            return {
                itemClass: 'notif--follow',
                badgeClass: 'notif-badge--follow',
                badgeIcon: <UserPlus size={11} strokeWidth={2.5} />,
                label: 'Follow',
                labelClass: 'notif-label--follow',
                entityIcon: null,
            };
        case 'product_like':
            return {
                itemClass: 'notif--like',
                badgeClass: 'notif-badge--like',
                badgeIcon: <Heart size={11} fill="currentColor" strokeWidth={0} />,
                label: 'Product',
                labelClass: 'notif-label--like',
                entityIcon: <Package size={19} strokeWidth={1.6} />,
            };
        case 'collection_like':
            return {
                itemClass: 'notif--like',
                badgeClass: 'notif-badge--like',
                badgeIcon: <Heart size={11} fill="currentColor" strokeWidth={0} />,
                label: 'Collection',
                labelClass: 'notif-label--like',
                entityIcon: <BookOpen size={19} strokeWidth={1.6} />,
            };
        default:
            return {
                itemClass: '',
                badgeClass: '',
                badgeIcon: <BellIcon size={11} />,
                label: '',
                labelClass: '',
                entityIcon: null,
            };
    }
};

const getNavigationPath = (notification) => {
    switch (notification.type) {
        case 'follow':
            return notification.entity ? `/user/${notification.entity}` : null;
        case 'product_like':
            return notification.entity ? `/product/${notification.entity}` : null;
        case 'collection_like':
            return notification.entity ? `/c/${notification.entity}` : null;
        default:
            return null;
    }
};

// ─── Notification Item ────────────────────────────────────────────────────────

const NotificationItem = ({ notification, index, followingIds, senderProfile }) => {
    const navigate = useNavigate();
    const isFollow = notification.type === 'follow';

    const [followed, setFollowed] = useState(() => followingIds.has(notification.sender));
    const [followLoading, setFollowLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (followingIds.has(notification.sender)) setFollowed(true);
    }, [followingIds, notification.sender]);

    const config = getTypeConfig(notification.type, notification.entityModel);
    const path = getNavigationPath(notification);

    // Username: from entitySnapshot for follow, from fetched senderProfile for likes
    const senderUsername = notification.entitySnapshot?.username || senderProfile?.username;
    // product_like uses `name`, collection_like uses `title`
    const entityName = notification.entitySnapshot?.name || notification.entitySnapshot?.title;
    const profileImageUrl = senderProfile?.profileImageUrl;
    const showProfileImage = profileImageUrl && !imgError;

    // Avatar: show profile image if available, else letter from username, else entity icon
    const avatarLetter = isFollow
        ? (senderUsername?.[0]?.toUpperCase() || '?')
        : (senderUsername?.[0]?.toUpperCase() || entityName?.[0]?.toUpperCase() || '?');

    // Message lines
    const line1 = (() => {
        switch (notification.type) {
            case 'follow':
                return (
                    <><span className="notif-username">@{senderUsername || 'Someone'}</span> started following you</>
                );
            case 'product_like':
            case 'collection_like': {
                const kind = notification.type === 'product_like' ? 'product' : 'collection';
                const nameChip = entityName
                    ? <span className="notif-entity-ref">{entityName}</span>
                    : null;
                if (senderUsername && nameChip) {
                    return <><span className="notif-username">@{senderUsername}</span> liked your {kind} {nameChip}</>;
                }
                if (senderUsername) {
                    return <><span className="notif-username">@{senderUsername}</span> liked your {kind}</>;
                }
                if (nameChip) {
                    return <>Your {kind} {nameChip} received a like</>;
                }
                return <>Your {kind} received a like</>;
            }
            default:
                return <>New notification</>;
        }
    })();

    const handleClick = () => { if (path) navigate(path); };

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
            className={`notification-item ${config.itemClass} ${!notification.hasRead ? 'unread' : ''} ${path ? 'clickable' : ''}`}
            onClick={handleClick}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            whileHover={path ? { x: 3 } : {}}
        >
            {/* ── Avatar + badge ── */}
            <div className="notif-avatar-wrap">
                <div className={`notif-avatar ${config.itemClass}-avatar`}>
                    {showProfileImage ? (
                        <img
                            src={profileImageUrl}
                            alt={senderUsername || ''}
                            className="notif-avatar-img"
                            onError={() => setImgError(true)}
                        />
                    ) : config.entityIcon && !isFollow ? (
                        <span className="notif-avatar-icon">{config.entityIcon}</span>
                    ) : (
                        avatarLetter
                    )}
                </div>
                <div className={`notif-badge ${config.badgeClass}`}>
                    {config.badgeIcon}
                </div>
            </div>

            {/* ── Body ── */}
            <div className="notif-body">
                <div className="notif-top">
                    <p className="notif-text">{line1}</p>
                    {config.label && (
                        <span className={`notif-label ${config.labelClass}`}>{config.label}</span>
                    )}
                </div>
                <span className="notif-time">{formatTime(notification.createdAt)}</span>
            </div>

            {/* ── Right action ── */}
            <div className="notif-action" onClick={e => e.stopPropagation()}>
                {isFollow ? (
                    <button
                        className={`follow-back-btn ${followed ? 'followed' : ''}`}
                        onClick={handleFollowBack}
                        disabled={followLoading || followed}
                    >
                        {followed ? 'Following' : followLoading ? '…' : 'Follow back'}
                    </button>
                ) : path ? (
                    <div className="notif-arrow" onClick={handleClick}>
                        <ArrowRight size={15} strokeWidth={2} />
                    </div>
                ) : null}
            </div>

            {!notification.hasRead && <span className="notif-dot" />}
        </motion.div>
    );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    const { notifications, unreadCount, markAllAsRead, fetchNotifications } = useNotifications();
    const { user: currentUser } = useAuth();

    // Map of senderId → profile data (for avatar images + usernames on likes)
    const [senderProfiles, setSenderProfiles] = useState({});
    // Set of user IDs the current user is following (for Follow-back state)
    const [followingIds, setFollowingIds] = useState(new Set());

    useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

    // Batch-fetch all unique sender profiles once notifications load
    useEffect(() => {
        if (notifications.length === 0) return;
        const uniqueIds = [...new Set(notifications.map(n => n.sender).filter(Boolean))];
        Promise.all(
            uniqueIds.map(id =>
                UserService.getUserById(id)
                    .then(data => ({ id, data }))
                    .catch(() => ({ id, data: null }))
            )
        ).then(results => {
            const map = {};
            results.forEach(({ id, data }) => { if (data) map[id] = data; });
            setSenderProfiles(map);
        });
    }, [notifications]);

    // Fetch following list once for Follow-back button state
    useEffect(() => {
        const userId = currentUser?._id || currentUser?.id;
        if (!userId) return;
        if (!notifications.some(n => n.type === 'follow')) return;
        UserService.getFollowing(userId)
            .then(following => {
                const ids = new Set(following.map(u => u._id || u.id).filter(Boolean));
                setFollowingIds(ids);
            })
            .catch(() => {});
    }, [notifications, currentUser]);

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
                    <div>
                        <h1 className="notifications-title">Notifications</h1>
                        {unreadCount > 0 && (
                            <p className="notifications-subtitle">{unreadCount} unread</p>
                        )}
                    </div>
                    <div className="notifications-filters">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >All</button>
                        <button
                            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                            onClick={() => setFilter('unread')}
                        >
                            Unread {unreadCount > 0 && `(${unreadCount})`}
                        </button>
                    </div>
                </div>

                <div className="notifications-list">
                    <AnimatePresence>
                        {filteredNotifications.length === 0 ? (
                            <motion.div
                                className="empty-state"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="empty-state-icon">
                                    <BellIcon size={28} strokeWidth={1.5} />
                                </div>
                                <h2>All caught up</h2>
                                <p>New activity will show up here</p>
                            </motion.div>
                        ) : (
                            filteredNotifications.map((notification, index) => (
                                <NotificationItem
                                    key={notification._id || notification.id}
                                    notification={notification}
                                    index={index}
                                    followingIds={followingIds}
                                    senderProfile={senderProfiles[notification.sender] || null}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {unreadCount > 0 && (
                    <div className="notifications-actions">
                        <button className="action-btn" onClick={markAllAsRead}>
                            <Check size={14} strokeWidth={2.5} />
                            Mark all as read
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Notifications;
