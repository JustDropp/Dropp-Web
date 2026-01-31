import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Link as LinkIcon, Grid, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ProfileDemo = () => {
    const { username } = useParams();
    const { user, collections } = useData();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: 'var(--spacing-lg) 0' }}
        >
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Profile Header */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={user.avatar}
                        alt={user.name}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            marginBottom: 'var(--spacing-md)',
                            border: '4px solid var(--bg-secondary)'
                        }}
                    />
                    <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>{user.name}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>@{user.username}</p>
                    <p style={{ maxWidth: '500px', marginBottom: 'var(--spacing-md)' }}>{user.bio}</p>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={16} /> {user.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <LinkIcon size={16} /> <a href="#" style={{ textDecoration: 'underline' }}>{user.website}</a>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-lg)',
                        marginTop: 'var(--spacing-md)',
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: 'var(--spacing-md)'
                    }}>
                        <div className="text-center">
                            <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>{user.followers}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Followers</div>
                        </div>
                        <div className="text-center">
                            <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>{user.following}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Following</div>
                        </div>
                    </div>
                </div>

                {/* Collections Grid */}
                <h2 style={{ marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Grid size={24} /> Collections
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {collections.map((collection, index) => (
                        <Link to={`/collection/${collection.id}`} key={collection.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-panel"
                                style={{
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    height: '100%'
                                }}
                            >
                                <div style={{ height: '250px', overflow: 'hidden' }}>
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        className="hover-scale"
                                    />
                                </div>
                                <div style={{ padding: 'var(--spacing-sm)' }}>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>{collection.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{collection.items} items</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileDemo;
