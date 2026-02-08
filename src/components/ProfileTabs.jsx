import React, { useState } from 'react';
import { Grid, Film, Tag, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/Profile.css';

const ProfileTabs = ({ collections, activeTab: initialTab = 'collections' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const navigate = useNavigate();

    const tabs = [
        { id: 'collections', label: 'Collections', icon: Grid },
        { id: 'reels', label: 'Reels', icon: Film },
        { id: 'tagged', label: 'Tagged', icon: Tag },
        { id: 'saved', label: 'Saved', icon: Bookmark }
    ];

    const handleCollectionClick = (collectionId) => {
        navigate(`/collection/${collectionId}`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'collections':
                return (
                    <div className="profile-grid">
                        {collections && collections.length > 0 ? (
                            collections.map((collection) => {
                                const displayImage = collection.displayImageUrl?.startsWith('http')
                                    ? collection.displayImageUrl
                                    : API_CONFIG.BASE_URL + collection.displayImageUrl;

                                return (
                                    <div
                                        key={collection._id}
                                        className="profile-grid-item"
                                        onClick={() => handleCollectionClick(collection._id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={displayImage}
                                            alt={collection.title}
                                            onError={(e) => {
                                                e.target.src = API_CONFIG.BASE_URL + '/images/book.svg';
                                            }}
                                        />
                                        <div className="profile-grid-overlay">
                                            <div className="collection-info">
                                                <h4>{collection.title}</h4>
                                                {collection.desc && <p>{collection.desc}</p>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="profile-empty-state">
                                <Grid size={48} />
                                <p>No collections yet</p>
                                <span>Create your first collection to get started</span>
                            </div>
                        )}
                    </div>
                );

            case 'reels':
                return (
                    <div className="profile-empty-state">
                        <Film size={48} />
                        <p>No reels yet</p>
                    </div>
                );

            case 'tagged':
                return (
                    <div className="profile-empty-state">
                        <Tag size={48} />
                        <p>No tagged collections</p>
                    </div>
                );

            case 'saved':
                return (
                    <div className="profile-empty-state">
                        <Bookmark size={48} />
                        <p>No saved collections</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="profile-tabs-container">
            <div className="profile-tabs">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`profile-tab ${activeTab === id ? 'active' : ''}`}
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon size={20} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            <div className="profile-tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProfileTabs;
