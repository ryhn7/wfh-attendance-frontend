import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from './user';
import { USER_QUERY_KEYS } from './user.keys';
import { AddUserRequest } from './user.types';

/**
 * Hook for adding a new user
 * @returns Mutation object for adding users
 */
export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: USER_QUERY_KEYS.add(),
        mutationFn: (data: AddUserRequest) => userService.addUser(data),
        onSuccess: () => {
            // Invalidate users list queries to refetch with new data
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
        },
        onError: (error) => {
            // Handle error (e.g., show a toast notification)
            console.error('Error adding user:', error);
        },
    });
};
