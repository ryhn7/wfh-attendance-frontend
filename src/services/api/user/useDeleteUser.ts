import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from './user';
import { USER_QUERY_KEYS } from './user.keys';

/**
 * Hook for deleting a user
 * @returns Mutation object for deleting users
 */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => userService.deleteUser(id),
        onSuccess: () => {
            // Invalidate all user queries to refetch lists
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });
};
