import { api } from '../api';
import { AddUserRequest, UpdateUserRequest, User, UserList } from './user.types';

/**
 * API endpoints for user feature
 */
const ENDPOINTS = {
    USERS: '/users/',
    USER: (id: string) => `/users/${id}`,
    ADD: '/users/add',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
};

/**
 * User service for handling user-related API calls
 */
export const userService = {
    /**
     * Get all users
     * @returns API response with list of users
     */
    getUsers: async (): Promise<UserList> => {
        const response = await api.get<UserList>(ENDPOINTS.USERS);
        return response.data.data;
    },

    /**
     * Get user by ID
     * @param id - User ID
     * @returns API response with user details
     */
    getUserById: async (id: string): Promise<User> => {
        const response = await api.get<User>(ENDPOINTS.USER(id));
        return response.data.data;
    },

    /**
     * Add a new user
     * @param data - User data
     * @returns API response with new user details
     */
    addUser: async (data: AddUserRequest): Promise<User> => {
        const response = await api.post<User>(ENDPOINTS.ADD, data);
        return response.data.data;
    },

    /**
     * Update an existing user
     * @param id - User ID
     * @param data - Updated user data
     * @returns API response with updated user details
     */
    updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
        const response = await api.put<User>(ENDPOINTS.UPDATE(id), data);
        return response.data.data;
    },

    /**
     * Delete a user
     * @param id - User ID
     * @returns API response
     */
    deleteUser: async (id: string): Promise<void> => {
        await api.delete(ENDPOINTS.DELETE(id));
    }
};