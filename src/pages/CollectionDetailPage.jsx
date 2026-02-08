import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Share2,
    MoreHorizontal,
    Edit,
    Trash2,
    Loader,
    Plus,
    Bookmark,
    UserPlus
} from 'lucide-react';
import CollectionService from '../core/services/CollectionService';
import EditCollectionModal from '../components/EditCollectionModal';
import Snackbar from '../components/Snackbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/CollectionDetailPage.css';

const CollectionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const [isSaved, setIsSaved] = useState(false);

    // Determine if current user is the owner
    const isOwner = isAuthenticated && collection?.userId === user?.id;

    useEffect(() => {
        fetchCollection();
    }, [id, isAuthenticated]);

    const fetchCollection = async () => {
        try {
            setLoading(true);
            let data;
            if (isAuthenticated) {
                data = await CollectionService.getCollectionById(id);
            } else {
                data = await CollectionService.getPublicCollection(id);
            }
            setCollection(data?.result || data);
        } catch (error) {
            console.error('Failed to fetch collection:', error);
            setSnackbar({ show: true, message: 'Failed to load collection', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        const url = `${window.location.origin}/c/${id}`;
        if (navigator.share) {
            navigator.share({
                title: collection?.title || collection?.name,
                text: collection?.desc,
                url: url,
            }).catch(err => console.log('Error sharing:', err));
        } else {
            navigator.clipboard.writeText(url);
            setSnackbar({ show: true, message: 'Link copied to clipboard!', type: 'success' });
        }
    };

    const handleEdit = () => {
        setShowMenu(false);
        setIsEditModalOpen(true);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this collection? This action cannot be undone.')) {
            return;
        }

        setShowMenu(false);
        try {
            await CollectionService.deleteCollection(id);
            setSnackbar({ show: true, message: 'Collection deleted successfully', type: 'success' });
            setTimeout(() => {
                navigate('/profile/me');
            }, 1000);
        } catch (error) {
            console.error('Failed to delete collection:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete collection';
            setSnackbar({ show: true, message: errorMessage, type: 'error' });
        }
    };

    const handleAddProducts = () => {
        // TODO: Implement add products modal/page
        setSnackbar({ show: true, message: 'Add products feature coming soon!', type: 'info' });
    };

    const handleSave = () => {
        if (!isAuthenticated) {
            navigate('/signup');
            return;
        }
        setIsSaved(!isSaved);
        setSnackbar({
            show: true,
            message: isSaved ? 'Removed from saved' : 'Saved to your collection',
            type: 'success'
        });
    };

    const handleUpdate = () => {
        fetchCollection();
    };

    if (loading) {
        return (
            <div className="collection-detail-loading">
                <Loader className="spinner" size={40} />
                <p>Loading collection...</p>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="collection-detail-error">
                <h2>Collection not found</h2>
                <p>This collection may have been deleted or doesn't exist.</p>
                {isAuthenticated ? (
                    <button onClick={() => navigate(-1)} className="back-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                ) : (
                    <Link to="/landing" className="back-link">
                        <ArrowLeft size={16} />
                        Go to Home
                    </Link>
                )}
            </div>
        );
    }

    const collectionName = collection.title || collection.name;
    const displayImage = collection.displayImageUrl?.startsWith('http')
        ? collection.displayImageUrl
        : API_CONFIG.BASE_URL + (collection.displayImageUrl || '/placeholder.jpg');

    return (
        <>
            <motion.div
                className={`collection-detail-page ${!isAuthenticated ? 'public-view' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="collection-detail-container">
                    {isAuthenticated ? (
                        <Link to="/profile/me" className="back-link">
                            <ArrowLeft size={16} />
                            Back to Profile
                        </Link>
                    ) : (
                        <Link to="/landing" className="back-link">
                            <ArrowLeft size={16} />
                            Explore Dropp
                        </Link>
                    )}

                    <div className="collection-header">
                        <div className="collection-info">
                            <h1 className="collection-title">{collectionName}</h1>
                            {collection.desc && (
                                <p className="collection-description">{collection.desc}</p>
                            )}
                        </div>

                        <div className="collection-actions">
                            {/* Save/Bookmark button for non-owners */}
                            {!isOwner && (
                                <button
                                    className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
                                    onClick={handleSave}
                                    aria-label={isSaved ? 'Unsave collection' : 'Save collection'}
                                >
                                    <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
                                </button>
                            )}

                            {/* Share button for everyone */}
                            <button
                                className="action-btn share-btn"
                                onClick={handleShare}
                                aria-label="Share collection"
                            >
                                <Share2 size={20} />
                            </button>

                            {/* Owner-only controls */}
                            {isOwner && (
                                <>
                                    <button
                                        className="action-btn add-btn"
                                        onClick={handleAddProducts}
                                        aria-label="Add products"
                                    >
                                        <Plus size={20} />
                                    </button>

                                    <div className="menu-container">
                                        <button
                                            className="action-btn menu-btn"
                                            onClick={() => setShowMenu(!showMenu)}
                                            aria-label="More options"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>

                                        {showMenu && (
                                            <div className="dropdown-menu">
                                                <button onClick={handleEdit} className="menu-item">
                                                    <Edit size={16} />
                                                    Edit Collection
                                                </button>
                                                <button onClick={handleDelete} className="menu-item delete-item">
                                                    <Trash2 size={16} />
                                                    Delete Collection
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="collection-content">
                        <h3 className="section-title">Products</h3>

                        <div className="collection-grid">
                            {/* Empty state when no products */}
                            <div className="empty-products-state">
                                <img
                                    src={displayImage}
                                    alt={collectionName}
                                    className="collection-default-image"
                                />
                                <div className="empty-state-overlay">
                                    <p>This collection is empty</p>
                                    {isOwner && (
                                        <button
                                            className="add-products-btn"
                                            onClick={handleAddProducts}
                                        >
                                            <Plus size={16} />
                                            Add Products
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section for unauthenticated users */}
                    {!isAuthenticated && (
                        <div className="public-cta-section">
                            <div className="cta-content">
                                <UserPlus size={32} />
                                <h3>Discover More Collections</h3>
                                <p>Create an account to explore curated collections from your favorite creators</p>
                                <div className="cta-buttons">
                                    <Link to="/signup" className="cta-btn primary">
                                        Create Account
                                    </Link>
                                    <Link to="/login" className="cta-btn secondary">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Edit Modal */}
                {isOwner && (
                    <EditCollectionModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        collection={collection}
                        onUpdate={handleUpdate}
                    />
                )}

                {/* Snackbar */}
                {snackbar.show && (
                    <Snackbar
                        message={snackbar.message}
                        type={snackbar.type}
                        onClose={() => setSnackbar({ ...snackbar, show: false })}
                    />
                )}
            </motion.div>

            {/* Footer for public view */}
            {!isAuthenticated && <Footer />}
        </>
    );
};

export default CollectionDetailPage;
