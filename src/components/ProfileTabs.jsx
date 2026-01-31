import React, { useState } from 'react';
import { Grid, Film, Tag, Bookmark } from 'lucide-react';
import '../styles/Profile.css';

const ProfileTabs = ({ collections, activeTab: initialTab = 'collections' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        { id: 'collections', label: 'Collections', icon: Grid },
        { id: 'reels', label: 'Reels', icon: Film },
        { id: 'tagged', label: 'Tagged', icon: Tag },
        { id: 'saved', label: 'Saved', icon: Bookmark }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'collections':
                return (
                    <div className="profile-grid">
                        {collections && collections.length > 0 ? (
                            collections.map((item) => (
                                <div key={item.id} className="profile-grid-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="profile-grid-overlay">
                                        <span className="grid-item-count">{item.itemCount} items</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="profile-empty-state">
                                <Grid size={48} />
                                <p>No collections yet</p>
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
