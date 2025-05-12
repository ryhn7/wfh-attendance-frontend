/**
 * User types based on API response
 */
export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

/**
 * Authentication response from the API
 */
export interface AuthResponse {
    token: string;
    user: User;
}

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}
