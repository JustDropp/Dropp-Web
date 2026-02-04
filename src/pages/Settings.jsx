import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings as SettingsIcon, User, Lock, Moon, Globe, HelpCircle } from 'lucide-react';
import UpdatePasswordModal from '../components/UpdatePasswordModal';
import { AnimatePresence } from 'framer-motion';
import '../styles/Settings.css';

const Settings = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

    return (
        <motion.div
            className="settings-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>

                {/* Account Settings */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <User size={20} />
                        Account
                    </h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Profile Information</h3>
                            <p>Update your personal details and profile picture</p>
                        </div>
                        <button className="settings-btn">Edit</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Email Address</h3>
                            <p>user@example.com</p>
                        </div>
                        <button className="settings-btn">Change</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Username</h3>
                            <p>@username</p>
                        </div>
                        <button className="settings-btn">Change</button>
                    </div>
                </section>

                {/* Privacy & Security */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Lock size={20} />
                        Privacy & Security
                    </h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Password</h3>
                            <p>Change your password</p>
                        </div>
                        <button className="settings-btn" onClick={() => setIsPasswordModalOpen(true)}>Update</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Two-Factor Authentication</h3>
                            <p>Add an extra layer of security</p>
                        </div>
                        <button className="settings-btn">Enable</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Privacy Settings</h3>
                            <p>Control who can see your profile and collections</p>
                        </div>
                        <button className="settings-btn">Manage</button>
                    </div>
                </section>

                {/* Notifications */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <Bell size={20} />
                        Notifications
                    </h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Email Notifications</h3>
                            <p>Receive updates via email</p>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Push Notifications</h3>
                            <p>Get notified about new followers and likes</p>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Collection Updates</h3>
                            <p>Notifications when people you follow add collections</p>
                        </div>
                        <label className="settings-toggle">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </section>

                {/* Preferences */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <SettingsIcon size={20} />
                        Preferences
                    </h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Language</h3>
                            <p>English (US)</p>
                        </div>
                        <button className="settings-btn">Change</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Time Zone</h3>
                            <p>Automatic</p>
                        </div>
                        <button className="settings-btn">Change</button>
                    </div>
                </section>

                {/* Support */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <HelpCircle size={20} />
                        Support
                    </h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Help Center</h3>
                            <p>Get answers to your questions</p>
                        </div>
                        <button className="settings-btn">Visit</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Contact Support</h3>
                            <p>Reach out to our team</p>
                        </div>
                        <button className="settings-btn">Contact</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Terms of Service</h3>
                            <p>Read our terms and policies</p>
                        </div>
                        <button className="settings-btn">View</button>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="settings-section danger-section">
                    <h2 className="section-title">Danger Zone</h2>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Deactivate Account</h3>
                            <p>Temporarily disable your account</p>
                        </div>
                        <button className="settings-btn btn-danger">Deactivate</button>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-content">
                            <h3>Delete Account</h3>
                            <p>Permanently delete your account and all data</p>
                        </div>
                        <button className="settings-btn btn-danger">Delete</button>
                    </div>
                </section>
            </div>


            <AnimatePresence>
                {isPasswordModalOpen && (
                    <UpdatePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
                )}
            </AnimatePresence>
        </motion.div >
    );
};

export default Settings;
