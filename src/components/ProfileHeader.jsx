import React, { useState } from 'react';
import { User, MessageCircle, MoreHorizontal, MapPin, Link as LinkIcon } from 'lucide-react';
import '../styles/Profile.css';

const ProfileHeader = ({ user, isOwnProfile, onFollow, onMessage }) => {
    const [showOptions, setShowOptions] = useState(false);
    const { avatar, fullName, username, bio, location, website, stats, isFollowing } = user;

    const handleFollow = () => {
        if (onFollow) onFollow();
    };

    const handleMessage = () => {
        if (onMessage) onMessage();
    };

    return (
        <div className="profile-header">
            <div className="profile-header-top">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        {avatar ? (
                            <img src={avatar} alt={fullName} />
                        ) : (
                            <User size={48} />
                        )}
                    </div>
                </div>

                <div className="profile-info-section">
                    <div className="profile-username-row">
                        <h1 className="profile-username">{username}</h1>

                        <div className="profile-actions">
                            {!isOwnProfile && (
                                <>
                                    <button
                                        className={`profile-follow-btn ${isFollowing ? 'following' : ''}`}
                                        onClick={handleFollow}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                    <button
                                        className="profile-message-btn"
                                        onClick={handleMessage}
                                    >
                                        <MessageCircle size={18} />
                                        Message
                                    </button>
                                </>
                            )}

                            {isOwnProfile && (
                                <button className="profile-edit-btn">
                                    Edit Profile
                                </button>
                            )}

                            <button
                                className="profile-options-btn"
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                <MoreHorizontal size={20} />
                            </button>

                            {showOptions && (
                                <div className="profile-options-menu">
                                    {!isOwnProfile && (
                                        <>
                                            <button>Report</button>
                                            <button>Block</button>
                                        </>
                                    )}
                                    <button>Share Profile</button>
                                    <button onClick={() => setShowOptions(false)}>Cancel</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-stats">
                        <div className="profile-stat">
                            <span className="stat-value">{stats.collections.toLocaleString()}</span>
                            <span className="stat-label">Collections</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-value">{stats.followers.toLocaleString()}</span>
                            <span className="stat-label">Followers</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-value">{stats.following.toLocaleString()}</span>
                            <span className="stat-label">Following</span>
                        </div>
                    </div>

                    <div className="profile-bio">
                        <p className="profile-fullname">{fullName}</p>
                        <p className="profile-bio-text">{bio}</p>
                        {location && (
                            <p className="profile-location">
                                <MapPin size={14} />
                                {location}
                            </p>
                        )}
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-website"
                            >
                                <LinkIcon size={14} />
                                {website.replace('https://', '')}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
