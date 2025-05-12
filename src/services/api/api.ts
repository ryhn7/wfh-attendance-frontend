import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { ApiResponse } from './api.types';

// Create an axios instance with default configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized errors (401)
        if (error.response?.status === 401) {
            // Reset auth state and redirect to login
            useAuthStore.getState().auth.reset();
            window.location.href = '/sign-in';
        }
        return Promise.reject(error);
    }
);

// Wrapper functions for HTTP methods
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
        apiClient.get<ApiResponse<T>>(url, config),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
        apiClient.post<ApiResponse<T>>(url, data, config),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
        apiClient.put<ApiResponse<T>>(url, data, config),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
        apiClient.patch<ApiResponse<T>>(url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> =>
        apiClient.delete<ApiResponse<T>>(url, config),
};

export default api;
