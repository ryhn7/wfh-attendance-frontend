/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Standard API response format for all endpoints
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

/**
 * API client interface defining all HTTP methods
 */
export interface ApiClient {
    get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<T>>>;
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<T>>>;
    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<T>>>;
    patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<T>>>;
    delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<ApiResponse<T>>>;
}
