import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, MoreHorizontal, Edit, Trash2, Link2, Copy, Check } from 'lucide-react';
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/Profile.css';

const CollectionCard = ({
    collection,
    onShare,
    onEdit,
    onDelete,
    isOwner = false
}) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [copied, setCopied] = useState(false);

    const collectionId = collection._id || collection.id;

    const handleCardClick = (e) => {
        if (e.target.closest('.board-actions') || e.target.closest('.share-popup')) return;
        navigate(`/c/${collectionId}`);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        setShowShare(!showShare);
        setOpenMenu(false);
        setCopied(false);
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setOpenMenu(!openMenu);
        setShowShare(false);
    };

    const handleCopyLink = (e) => {
        e.stopPropagation();
        const basePath = import.meta.env.BASE_URL || '/';
        const url = `${window.location.origin}${basePath}#/c/${collectionId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setShowShare(false);
            setCopied(false);
        }, 1500);
    };

    const getGridImages = () => {
        const mainImage = collection.displayImageUrl?.startsWith('http')
            ? collection.displayImageUrl
            : API_CONFIG.BASE_URL + (collection.displayImageUrl || '/images/book.svg');
        return [mainImage, mainImage, mainImage];
    };

    const gridImages = getGridImages();

    // Close popups on outside click
    React.useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenu(false);
            setShowShare(false);
        };
        // We'll rely on parent for global click handling if needed, 
        // or add a transparent overlay. For now, basic state toggle.
        // Actually, let's attach listener to document.
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="pinterest-board" onClick={handleCardClick} onClickCapture={(e) => {
            // Stop propagation for the card itself but allow clicks outside to close menus
            // This logic needs to be careful not to stop valid clicks.
            // Better approach: handle click outside in parent or use a refined strategy.
            // For this component, simply clicking anywhere else closes the menu.
        }}>
            <div className="board-preview">
                <div className="board-main-image">
                    <img
                        src={gridImages[0]}
                        alt={collection.title}
                        onError={(e) => { e.target.src = API_CONFIG.BASE_URL + '/images/book.svg'; }}
                    />
                </div>
                <div className="board-side-images">
                    <div className="board-side-image">
                        <img
                            src={gridImages[1]}
                            alt=""
                            onError={(e) => { e.target.src = API_CONFIG.BASE_URL + '/images/book.svg'; }}
                        />
                    </div>
                    <div className="board-side-image">
                        <img
                            src={gridImages[2]}
                            alt=""
                            onError={(e) => { e.target.src = API_CONFIG.BASE_URL + '/images/book.svg'; }}
                        />
                    </div>
                </div>

                {/* Hover Actions */}
                <div className="board-actions">
                    <button
                        className="board-action-btn"
                        onClick={handleShareClick}
                        title="Share"
                    >
                        <Share2 size={18} />
                    </button>

                    {isOwner && (
                        <div className="board-menu-container">
                            <button
                                className="board-action-btn"
                                onClick={handleMenuClick}
                                title="More"
                            >
                                <MoreHorizontal size={18} />
                            </button>
                            {openMenu && (
                                <div className="board-dropdown" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={(e) => { e.stopPropagation(); onEdit(collection); setOpenMenu(false); }}>
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(collection); setOpenMenu(false); }}>
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Share Popup */}
            {showShare && (
                <div className="share-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="share-popup-header">
                        <Link2 size={16} />
                        <span>Copy Link</span>
                    </div>
                    <div className="share-popup-content">
                        <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}${import.meta.env.BASE_URL || '/'}#/c/${collectionId}`}
                            className="share-link-input"
                        />
                        <button
                            className={`copy-link-btn ${copied ? 'copied' : ''}`}
                            onClick={handleCopyLink}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>
            )}

            <div className="board-info">
                <h4 className="board-title">{collection.title}</h4>
                {collection.desc && <p className="board-desc">{collection.desc}</p>}
            </div>
        </div>
    );
};

export default CollectionCard;
