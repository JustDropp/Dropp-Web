import UserRepository from '../repositories/UserRepository';

/**
 * UserService - Business logic layer for user operations
 */
class UserService {
    /**
     * Get user profile
     * @returns {Promise<UserProfile>}
     */
    async getUserProfile() {
        try {
            return await UserRepository.getUserProfile();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user profile
     * @param {FormData} formData
     * @returns {Promise<UserProfile>}
     */
    async updateProfile(formData) {
        try {
            return await UserRepository.updateProfile(formData);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
