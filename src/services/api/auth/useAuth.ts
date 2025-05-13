import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from './auth';
import { LoginRequest } from './auth.types';
import { useAuthStore } from '@/stores/authStore';
import { ATTENDANCE_QUERY_KEYS } from '../attendance';
import { USER_QUERY_KEYS } from '../user';

/**
 * Hook for login functionality
 */
export const useAuth = () => {
    const { auth } = useAuthStore();
    const queryClient = useQueryClient();

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
        // Invalidate relevant queries when logging out
        queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.all });
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
        authService.logout();
    };

    return {
        loginMutation,
        logout,
        isAuthenticated: !!auth.accessToken,
        user: auth.user
    };
};
