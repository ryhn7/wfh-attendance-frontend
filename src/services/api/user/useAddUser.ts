import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
            toast.success('User added successfully');
        },
        onError: (error) => {
            toast.error('Failed to add user', {
                description: error instanceof Error ? error.message : 'Unknown error occurred',
            });
        },
    });
};
