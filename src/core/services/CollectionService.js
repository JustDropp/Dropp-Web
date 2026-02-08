import CollectionRepository from '../repositories/CollectionRepository';

/**
 * CollectionService - Business logic layer for collection operations
 */
class CollectionService {
    /**
     * Get all collections for the authenticated user
     * @returns {Promise<Array>}
     */
    async getCollections() {
        try {
            const response = await CollectionRepository.getCollections();
            return response.result || [];
        } catch (error) {
            console.error('CollectionService.getCollections error:', error);
            throw error;
        }
    }

    /**
     * Get a specific collection by ID
     * @param {string} id - Collection ID
     * @returns {Promise<Object>}
     */
    async getCollectionById(id) {
        try {
            return await CollectionRepository.getCollectionById(id);
        } catch (error) {
            console.error('CollectionService.getCollectionById error:', error);
            throw error;
        }
    }

    /**
     * Create a new collection
     * @param {string} name - Collection name
     * @param {string} desc - Collection description
     * @returns {Promise<Object>}
     */
    async createCollection(name, desc) {
        try {
            if (!name || !name.trim()) {
                throw new Error('Collection name is required');
            }

            const response = await CollectionRepository.createCollection({
                name: name.trim(),
                desc: desc?.trim() || ''
            });

            return response;
        } catch (error) {
            console.error('CollectionService.createCollection error:', error);
            throw error;
        }
    }

    /**
     * Update an existing collection
     * @param {string} id - Collection ID
     * @param {string} name - Updated collection name
     * @param {string} desc - Updated collection description
     * @returns {Promise<Object>}
     */
    async updateCollection(id, name, desc) {
        try {
            if (!name || !name.trim()) {
                throw new Error('Collection name is required');
            }

            const response = await CollectionRepository.updateCollection(id, {
                name: name.trim(),
                desc: desc?.trim() || ''
            });

            return response;
        } catch (error) {
            console.error('CollectionService.updateCollection error:', error);
            throw error;
        }
    }

    /**
     * Delete a collection
     * @param {string} id - Collection ID
     * @returns {Promise<Object>}
     */
    async deleteCollection(id) {
        try {
            return await CollectionRepository.deleteCollection(id);
        } catch (error) {
            console.error('CollectionService.deleteCollection error:', error);
            throw error;
        }
    }
}

export default new CollectionService();
