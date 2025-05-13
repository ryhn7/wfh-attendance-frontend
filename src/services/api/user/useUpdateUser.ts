import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { userService } from './user';
import { USER_QUERY_KEYS } from './user.keys';
import { UpdateUserRequest } from './user.types';

/**
 * Hook for updating an existing user
 * @param id User ID to update
 * @returns Mutation object for updating users
 */
export const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: USER_QUERY_KEYS.update(id),
        mutationFn: (data: UpdateUserRequest) => userService.updateUser(id, data),
        onSuccess: () => {
            // Invalidate specific queries
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.user(id) });
            toast.success('User updated successfully');
        },
        onError: (error) => {
            toast.error('Failed to update user', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        },
    });
};
