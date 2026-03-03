import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserService from '../core/services/UserService';
import '../styles/VerifyEmail.css';

const CheckIcon = () => (
    <svg viewBox="0 0 52 52" fill="none" className="ve-check-svg">
        <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" className="ve-check-circle" />
        <motion.path
            d="M14 26l9 9 15-17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        />
    </svg>
);

const ErrorIcon = () => (
    <svg viewBox="0 0 52 52" fill="none" className="ve-error-svg">
        <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
        <line x1="17" y1="17" x2="35" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="35" y1="17" x2="17" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const Spinner = () => (
    <svg viewBox="0 0 52 52" fill="none" className="ve-spinner-svg">
        <circle cx="26" cy="26" r="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="100 38" className="ve-spinner-arc" />
    </svg>
);

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setErrorMessage('No token was found in this link. Please use the link sent to your email.');
            return;
        }

        const verify = async () => {
            try {
                await UserService.verifyToken(token);
                setStatus('success');
            } catch (error) {
                setStatus('error');
                const msg = error?.response?.data?.message || error?.message || '';
                if (msg.toLowerCase().includes('expir') || msg.toLowerCase().includes('invalid')) {
                    setErrorMessage('This link has expired or is no longer valid. Please request a new verification email from Settings.');
                } else {
                    setErrorMessage(msg || 'Something went wrong. Please try again or request a new verification email.');
                }
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className="ve-root">
            {/* Ambient orbs */}
            <div className="ve-orb ve-orb-1" />
            <div className="ve-orb ve-orb-2" />

            {/* Logo */}
            <a href="https://ondropp.app" className="ve-logo">dropp</a>

            {/* Card */}
            <motion.div
                className="ve-card"
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <AnimatePresence mode="wait">
                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            className="ve-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="ve-icon-wrap ve-icon-loading">
                                <Spinner />
                            </div>
                            <h1 className="ve-title">Verifying your email</h1>
                            <p className="ve-subtitle">Just a moment…</p>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            key="success"
                            className="ve-state"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="ve-icon-wrap ve-icon-success">
                                <CheckIcon />
                            </div>
                            <h1 className="ve-title">Email verified!</h1>
                            <p className="ve-subtitle">
                                Your email address has been confirmed.<br />
                                You're all set.
                            </p>
                            <div className="ve-actions">
                                <button className="ve-btn-ghost" onClick={() => window.close()}>
                                    Close window
                                </button>
                                <a href="https://ondropp.app" className="ve-btn-primary">
                                    Continue to Dropp
                                </a>
                            </div>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            key="error"
                            className="ve-state"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="ve-icon-wrap ve-icon-error">
                                <ErrorIcon />
                            </div>
                            <h1 className="ve-title">Link expired</h1>
                            <p className="ve-subtitle">{errorMessage}</p>
                            <div className="ve-actions">
                                <a href="https://ondropp.app" className="ve-btn-primary">
                                    Go to Dropp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <p className="ve-footer-note">
                Need help? <a href="mailto:support@ondropp.app">support@ondropp.app</a>
            </p>
        </div>
    );
};

export default VerifyEmail;
