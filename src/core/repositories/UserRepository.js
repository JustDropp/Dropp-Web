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

    /**
     * Update user profile
     * @param {FormData} formData - Profile update data
     * @returns {Promise<UserProfile>}
     */
    async updateProfile(formData) {
        try {
            const response = await apiClient.patch(API_CONFIG.ENDPOINTS.PROFILE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return UserProfile.fromJSON(response.data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user password
     * @param {Object} data - Password update data { oldPassword, newPassword }
     * @returns {Promise<any>}
     */
    async updatePassword(data) {
        try {
            const response = await apiClient.patch(API_CONFIG.ENDPOINTS.UPDATE_PASSWORD, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Verify email
     * @returns {Promise<any>}
     */
    async verifyEmail() {
        console.log("UserRepository.verifyEmail called. Endpoint:", API_CONFIG.ENDPOINTS.VERIFY_EMAIL);
        try {
            const response = await apiClient.get(API_CONFIG.ENDPOINTS.VERIFY_EMAIL);
            console.log("UserRepository.verifyEmail response:", response);
            return response.data;
        } catch (error) {
            console.error("UserRepository.verifyEmail error:", error);
            throw error;
        }
    }

    /**
     * Delete user account
     * @returns {Promise<any>}
     */
    async deleteAccount() {
        try {
            const response = await apiClient.delete(API_CONFIG.ENDPOINTS.DELETE_ACCOUNT);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserRepository();
