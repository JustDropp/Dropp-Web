import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Link as LinkIcon, Image as ImageIcon, Type, FileText, Upload, Trash2 } from 'lucide-react';
import CollectionService from '../core/services/CollectionService';
import Snackbar from './Snackbar';
import '../styles/CreateCollectionModal.css';

const AddProductModal = ({ isOpen, onClose, collectionId, onProductAdded }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelection(file);
        }
    };

    const handleFileSelection = (file) => {
        // Validate file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            setSnackbar({ show: true, message: 'Please upload an image or video file', type: 'error' });
            return;
        }

        // Validate file size (e.g., 50MB limit for videos, 5MB for images)
        const isVideo = file.type.startsWith('video/');
        const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setSnackbar({ show: true, message: `File too large. Max size: ${isVideo ? '50MB' : '5MB'}`, type: 'error' });
            return;
        }

        setMediaFile(file);
        setMediaType(isVideo ? 'video' : 'image');

        const reader = new FileReader();
        reader.onloadend = () => {
            setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelection(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const removeMedia = () => {
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            setSnackbar({ show: true, message: 'Product name is required', type: 'error' });
            return;
        }
        if (!link.trim()) {
            setSnackbar({ show: true, message: 'Product link is required', type: 'error' });
            return;
        }
        if (!mediaFile) {
            setSnackbar({ show: true, message: 'Please upload an image or video', type: 'error' });
            return;
        }
        if (!description.trim()) {
            setSnackbar({ show: true, message: 'Description is required', type: 'error' });
            return;
        }

        try {
            new URL(link);
        } catch (_) {
            setSnackbar({ show: true, message: 'Please enter a valid product link URL', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            // Create FormData
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('link', link.trim());
            formData.append('description', description.trim());
            formData.append('media', mediaFile);

            await CollectionService.addProduct(collectionId, formData);

            setSnackbar({ show: true, message: 'Product added successfully!', type: 'success' });

            setTimeout(() => {
                resetForm();
                onProductAdded();
                onClose();
            }, 1000);

        } catch (error) {
            console.error('Failed to add product:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add product. Please try again.';
            setSnackbar({ show: true, message: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setLink('');
        setDescription('');
        removeMedia();
    };

    const handleClose = () => {
        if (!loading) {
            resetForm();
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
                    className="create-collection-modal modal-landscape"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2>Add Product</h2>
                        <button
                            className="modal-close-btn"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="modal-form landscape-layout">
                        {/* LEFT PANEL: MEDIA */}
                        <div className="form-left-panel">
                            <div className="form-group media-group">
                                <label style={{ marginBottom: '10px' }}>
                                    <ImageIcon size={16} />
                                    Media *
                                </label>

                                {mediaPreview ? (
                                    <div className="media-preview-container">
                                        {mediaType === 'video' ? (
                                            <video src={mediaPreview} controls className="media-preview" />
                                        ) : (
                                            <img src={mediaPreview} alt="Preview" className="media-preview" />
                                        )}
                                        <button
                                            type="button"
                                            className="remove-media-btn"
                                            onClick={removeMedia}
                                            disabled={loading}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="file-upload-area"
                                        onClick={() => fileInputRef.current.click()}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <Upload size={32} className="file-upload-icon" />
                                        <div className="file-upload-text-group">
                                            <span className="file-upload-text">Upload Media</span>
                                            <span className="file-upload-subtext">Drag & drop or clip</span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            accept="image/*,video/*"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT PANEL: DETAILS */}
                        <div className="form-right-panel">
                            <div className="form-fields-scroll">
                                <div className="form-group">
                                    <label htmlFor="product-name">
                                        <Type size={16} />
                                        Name *
                                    </label>
                                    <input
                                        id="product-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Product Name"
                                        disabled={loading}
                                        className="compact-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="product-link">
                                        <LinkIcon size={16} />
                                        Link *
                                    </label>
                                    <input
                                        id="product-link"
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder="Product URL"
                                        disabled={loading}
                                        className="compact-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="product-desc">
                                        <FileText size={16} />
                                        Description *
                                    </label>
                                    <textarea
                                        id="product-desc"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Why do you love this?"
                                        disabled={loading}
                                        rows={4}
                                        className="compact-input"
                                    />
                                </div>
                            </div>

                            <div className="modal-actions compact-actions">
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
                                            <Loader className="spinner" size={16} />
                                            Adding...
                                        </>
                                    ) : (
                                        'Add'
                                    )}
                                </button>
                            </div>
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

export default AddProductModal;
