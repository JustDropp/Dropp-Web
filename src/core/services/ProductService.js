import ProductRepository from '../repositories/ProductRepository';

/**
 * ProductService - Business logic layer for product operations
 */
class ProductService {
    /**
     * Get explore products (public feed)
     * @returns {Promise<Array>}
     */
    async getExploreProducts() {
        try {
            const response = await ProductRepository.getExploreProducts();
            return response.result || [];
        } catch (error) {
            console.error('ProductService.getExploreProducts error:', error);
            throw error;
        }
    }
}

export default new ProductService();
