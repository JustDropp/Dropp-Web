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

    /**
     * Update user password
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns {Promise<any>}
     */
    async updatePassword(oldPassword, newPassword) {
        try {
            return await UserRepository.updatePassword({ oldPassword, newPassword });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verify email
     * @returns {Promise<any>}
     */
    async verifyEmail() {
        console.log("UserService.verifyEmail called");
        try {
            return await UserRepository.verifyEmail();
        } catch (error) {
            console.error("UserService.verifyEmail error:", error);
            throw error;
        }
    }

    /**
     * Delete user account
     * @returns {Promise<any>}
     */
    async deleteAccount() {
        try {
            return await UserRepository.deleteAccount();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Search users by query
     * @param {string} query - Search query
     * @returns {Promise<Array>}
     */
    async searchUsers(query) {
        try {
            return await UserRepository.searchUsers(query);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get user profile by username
     * @param {string} username - Username to fetch
     * @returns {Promise<Object>}
     */
    async getUserByUsername(username) {
        try {
            return await UserRepository.getUserByUsername(username);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();
