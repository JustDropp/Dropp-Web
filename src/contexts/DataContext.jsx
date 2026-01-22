import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Mock User Data
    const [user] = useState({
        username: "alex_style",
        name: "Alex Morgan",
        bio: "Minimalist aesthetics | Tech & Lifestyle | NYC",
        avatar: "https://i.pravatar.cc/300?u=alex",
        followers: "12.4k",
        following: "450",
        location: "New York, NY",
        website: "alex.design"
    });

    // Mock Collections Data
    const [collections] = useState([
        { id: 1, title: "Desk Setup", items: 12, image: "https://picsum.photos/seed/desk/400/400" },
        { id: 2, title: "Summer Essentials", items: 8, image: "https://picsum.photos/seed/summer/400/400" },
        { id: 3, title: "Camera Gear", items: 5, image: "https://picsum.photos/seed/camera/400/400" },
        { id: 4, title: "Living Room", items: 15, image: "https://picsum.photos/seed/living/400/400" },
        { id: 5, title: "Everyday Carry", items: 6, image: "https://picsum.photos/seed/edc/400/400" },
        { id: 6, title: "Coffee Station", items: 9, image: "https://picsum.photos/seed/coffee/400/400" },
    ]);

    // Mock Products Data (Helper function to generate)
    const getProductsForCollection = (collectionId) => {
        return Array.from({ length: 8 }).map((_, i) => ({
            id: `${collectionId}-${i}`,
            name: `Product Item ${i + 1}`,
            brand: "Brand Name",
            price: "$129.00",
            image: `https://picsum.photos/seed/prod${i}${collectionId}/400/500`
        }));
    };

    const value = {
        user,
        collections,
        getProductsForCollection
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
