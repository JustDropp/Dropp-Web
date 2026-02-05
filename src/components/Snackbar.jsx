import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import '../styles/Snackbar.css';

const Snackbar = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />;
            case 'error': return <XCircle size={20} />;
            case 'warning': return <AlertCircle size={20} />;
            default: return <Info size={20} />;
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`snackbar snackbar-${type}`}
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 50, x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    <span className="snackbar-icon">{getIcon()}</span>
                    <span className="snackbar-message">{message}</span>
                    <button className="snackbar-close" onClick={onClose}>&times;</button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Snackbar;
