import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, MoreHorizontal, Edit, Trash2, Loader } from 'lucide-react';
import CollectionService from '../core/services/CollectionService';
import EditCollectionModal from '../components/EditCollectionModal';
import Snackbar from '../components/Snackbar';
import { API_CONFIG } from '../core/config/apiConfig';
import '../styles/CollectionDetailPage.css';

const CollectionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        fetchCollection();
    }, [id]);

    const fetchCollection = async () => {
        try {
            setLoading(true);
            const data = await CollectionService.getCollectionById(id);
            setCollection(data);
        } catch (error) {
            console.error('Failed to fetch collection:', error);
            setSnackbar({ show: true, message: 'Failed to load collection', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: collection?.title,
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
            setSnackbar({ show: true, message: 'Failed to delete collection', type: 'error' });
        }
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
                <Link to="/profile/me" className="back-link">
                    <ArrowLeft size={16} />
                    Back to Profile
                </Link>
            </div>
        );
    }

    const displayImage = collection.displayImageUrl?.startsWith('http')
        ? collection.displayImageUrl
        : API_CONFIG.BASE_URL + collection.displayImageUrl;

    return (
        <motion.div
            className="collection-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="collection-detail-container">
                <Link to="/profile/me" className="back-link">
                    <ArrowLeft size={16} />
                    Back to Profile
                </Link>

                <div className="collection-header">
                    <div className="collection-info">
                        <h1 className="collection-title">{collection.title}</h1>
                        {collection.desc && (
                            <p className="collection-description">{collection.desc}</p>
                        )}
                    </div>

                    <div className="collection-actions">
                        <button
                            className="action-btn share-btn"
                            onClick={handleShare}
                            aria-label="Share collection"
                        >
                            <Share2 size={20} />
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
                    </div>
                </div>

                <div className="collection-content">
                    <h3 className="section-title">Items</h3>

                    <div className="collection-grid">
                        {/* Show default image when no items */}
                        <div className="collection-item-card empty-state">
                            <img
                                src={displayImage}
                                alt={collection.title}
                                className="collection-default-image"
                            />
                            <div className="empty-state-overlay">
                                <p>No items yet</p>
                                <span>Add items to this collection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditCollectionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                collection={collection}
                onUpdate={handleUpdate}
            />

            {/* Snackbar */}
            {snackbar.show && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({ ...snackbar, show: false })}
                />
            )}
        </motion.div>
    );
};

export default CollectionDetailPage;
