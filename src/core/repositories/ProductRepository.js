import apiClient from '../config/apiClient';
import { API_CONFIG } from '../config/apiConfig';

/**
 * ProductRepository - Data access layer for product operations
 */
class ProductRepository {
    /**
     * Get explore products (public feed)
     * @returns {Promise<Array>}
     */
    async getExploreProducts() {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCT_EXPLORE);
        return response.data;
    }
}

export default new ProductRepository();
