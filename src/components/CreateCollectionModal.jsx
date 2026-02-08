import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CollectionService from '../core/services/CollectionService';
import Snackbar from './Snackbar';
import '../styles/CreateCollectionModal.css';

const CreateCollectionModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setSnackbar({ show: true, message: 'Collection name is required', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const response = await CollectionService.createCollection(name, desc);
            setSnackbar({ show: true, message: 'Collection created successfully!', type: 'success' });

            // Reset form
            setName('');
            setDesc('');

            // Close modal and navigate after a short delay
            setTimeout(() => {
                onClose();
                // Navigate to the collection detail page if we have the ID
                // For now, we'll just close and let the user see it in their profile
            }, 1000);
        } catch (error) {
            console.error('Failed to create collection:', error);
            setSnackbar({
                show: true,
                message: error.message || 'Failed to create collection. Please try again.',
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
                            <label htmlFor="collection-desc">Description</label>
                            <textarea
                                id="collection-desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Enter collection description (optional)"
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
