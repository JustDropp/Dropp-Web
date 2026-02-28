import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CollectionService from '../core/services/CollectionService';
import { useData } from '../contexts/DataContext';
import Snackbar from './Snackbar';
import '../styles/CreateCollectionModal.css';

const CreateCollectionModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();
    const { addCollection, fetchCollections } = useData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setSnackbar({ show: true, message: 'Collection title is required', type: 'error' });
            return;
        }

        if (!desc.trim()) {
            setSnackbar({ show: true, message: 'Collection description is required', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const response = await CollectionService.createCollection(title, desc, isPrivate);

            // Try every possible shape the API might return the new collection in
            const newCollection =
                response?.result ||
                response?.collection ||
                response?.data ||
                response;

            const collectionId =
                newCollection?._id ||
                newCollection?.id ||
                response?._id ||
                response?.id;

            if (newCollection && typeof newCollection === 'object') {
                addCollection(newCollection);
            }

            // Navigate first, then close + refresh so nothing races
            onClose();
            fetchCollections();
            navigate(`/c/${collectionId}`);

        } catch (error) {
            console.error('Failed to create collection:', error);
            const errorMessage = error.response?.data?.message
                || error.response?.data?.error
                || error.message
                || 'Failed to create collection. Please try again.';
            setSnackbar({ show: true, message: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setTitle('');
            setDesc('');
            setIsPrivate(false);
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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

                        <div className="privacy-toggle-row">
                            <div className="privacy-toggle-info">
                                {isPrivate ? <Lock size={15} /> : <Globe size={15} />}
                                <div>
                                    <span className="privacy-toggle-title">{isPrivate ? 'Private' : 'Public'}</span>
                                    <span className="privacy-toggle-desc">
                                        {isPrivate ? 'Only you can see this collection' : 'Anyone on Dropp can see this'}
                                    </span>
                                </div>
                            </div>
                            <label className="toggle-switch" aria-label="Toggle privacy">
                                <input
                                    type="checkbox"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                    disabled={loading}
                                />
                                <span className="toggle-slider" />
                            </label>
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
