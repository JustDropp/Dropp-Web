import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CollectionService from '../core/services/CollectionService';
import { useData } from '../contexts/DataContext';
import Snackbar from './Snackbar';
import '../styles/CreateCollectionModal.css';

const CreateCollectionModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();
    const { addCollection, fetchCollections } = useData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setSnackbar({ show: true, message: 'Collection name is required', type: 'error' });
            return;
        }

        if (!desc.trim()) {
            setSnackbar({ show: true, message: 'Collection description is required', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const response = await CollectionService.createCollection(name, desc);
            setSnackbar({ show: true, message: 'Collection created successfully!', type: 'success' });

            // Extract collection data from response
            const newCollection = response?.result || response;
            const collectionId = newCollection?._id || newCollection?.id;

            // Add to global state immediately for real-time update
            if (newCollection) {
                addCollection(newCollection);
            }

            // Reset form
            setName('');
            setDesc('');

            // Close modal and navigate
            setTimeout(() => {
                onClose();
                // Also refresh to ensure backend sync
                fetchCollections();
                if (collectionId) {
                    navigate(`/c/${collectionId}`);
                } else {
                    navigate('/profile/me');
                }
            }, 800);
        } catch (error) {
            console.error('Failed to create collection:', error);
            const errorMessage = error.response?.data?.message
                || error.response?.data?.error
                || error.message
                || 'Failed to create collection. Please try again.';
            setSnackbar({
                show: true,
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setName('');
            setDesc('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
            >
                <motion.div
                    className="create-collection-modal"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>Create Collection</h2>
                        <button
                            className="modal-close-btn"
                            onClick={handleClose}
                            disabled={loading}
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="modal-form">
                        <div className="form-group">
                            <label htmlFor="collection-name">Collection Name *</label>
                            <input
                                id="collection-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter collection name"
                                disabled={loading}
                                maxLength={100}
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="collection-desc">Description *</label>
                            <textarea
                                id="collection-desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Enter collection description"
                                disabled={loading}
                                rows={4}
                                maxLength={500}
                            />
                        </div>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader className="spinner" size={18} />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Collection'
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {snackbar.show && (
                    <Snackbar
                        message={snackbar.message}
                        type={snackbar.type}
                        onClose={() => setSnackbar({ ...snackbar, show: false })}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default CreateCollectionModal;
