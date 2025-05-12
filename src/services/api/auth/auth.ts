import { api } from '../index';
import { useAuthStore } from '@/stores/authStore';
import { AuthResponse, LoginRequest } from './auth.types';

/**
 * Auth service for handling authentication-related API calls
 */
export const authService = {
    /**
     * Login user with email and password
     * @param data Login credentials
     * @returns API response with token and user data
     */
    login: async (data: LoginRequest) => {
        const response = await api.post<AuthResponse>('/users/login', data);
        return response.data;
    },

    /**
     * Logout the current user
     * This clears the authentication state from the store
     */
    logout: () => {
        useAuthStore.getState().auth.reset();
    }
};
