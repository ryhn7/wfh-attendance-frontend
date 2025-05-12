import { useMutation } from '@tanstack/react-query';
import { authService } from './auth';
import { LoginRequest } from './auth.types';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook for login functionality
 */
export const useAuth = () => {
    const { auth } = useAuthStore();

    /**
     * Login mutation for handling user authentication
     */
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (response) => {
            if (response.data) {
                const { token, user } = response.data;
                auth.setAccessToken(token);

                // Set user data in the store
                auth.setUser({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                });
            }
        },
    });

    /**
     * Logout function that clears authentication state
     */
    const logout = () => {
        authService.logout();
    };

    return {
        loginMutation,
        logout,
        isAuthenticated: !!auth.accessToken,
        user: auth.user
    };
};
