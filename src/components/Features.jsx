import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Curated Collections",
            description: "Create moodboards of your lifestyle. Every item is tagged, every link is real.",
            icon: "✦"
        },
        {
            title: "Shop Instantly",
            description: "No more 'link in bio' hunting. Click the product, get the link, buy the look.",
            icon: "⚡"
        },
        {
            title: "Authentic Influence",
            description: "See what your favorite creators actually use in their daily lives.",
            icon: "★"
        }
    ];

    return (
        <section style={{ padding: 'var(--spacing-xl) 0', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--spacing-sm)' }}>
                        Not just a feed. <br /> A marketplace of taste.
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {features.map((feature, index) => (
                        <div key={index} style={{
                            padding: 'var(--spacing-md)',
                            backgroundColor: 'var(--bg-primary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{feature.icon}</div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '1.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
