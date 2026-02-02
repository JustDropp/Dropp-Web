import apiClient from '../config/apiClient';
import { API_CONFIG } from '../config/apiConfig';
import { UserProfile } from '../models/UserModels';

/**
 * UserRepository - Handles all user-related API calls
 */
class UserRepository {
    /**
     * Get user profile
     * @returns {Promise<UserProfile>}
     */
    async getUserProfile() {
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.PROFILE);
            return UserProfile.fromJSON(response.data);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();
