import apiClient from '../config/apiClient';
import { API_CONFIG } from '../config/apiConfig';

/**
 * CollectionRepository - Data access layer for collection operations
 */
class CollectionRepository {
    /**
     * Get all collections for the authenticated user
     * @returns {Promise<Array>}
     */
    async getCollections() {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.COLLECTIONS);
        return response.data;
    }

    /**
     * Get a specific collection by ID
     * @param {string} id - Collection ID
     * @returns {Promise<Object>}
     */
    async getCollectionById(id) {
        const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.COLLECTION_BY_ID}/${id}`);
        return response.data;
    }

    /**
     * Create a new collection
     * @param {Object} data - Collection data {name, desc}
     * @returns {Promise<Object>}
     */
    async createCollection(data) {
        const response = await apiClient.post(API_CONFIG.ENDPOINTS.COLLECTIONS, {
            name: data.name,
            desc: data.desc
        });
        return response.data;
    }

    /**
     * Update an existing collection
     * @param {string} id - Collection ID
     * @param {Object} data - Updated collection data {name, desc}
     * @returns {Promise<Object>}
     */
    async updateCollection(id, data) {
        const response = await apiClient.put(`${API_CONFIG.ENDPOINTS.COLLECTION_BY_ID}/${id}`, {
            name: data.name,
            desc: data.desc
        });
        return response.data;
    }

    /**
     * Delete a collection
     * @param {string} id - Collection ID
     * @returns {Promise<Object>}
     */
    async deleteCollection(id) {
        const response = await apiClient.delete(`${API_CONFIG.ENDPOINTS.COLLECTION_BY_ID}/${id}`);
        return response.data;
    }
}

export default new CollectionRepository();
