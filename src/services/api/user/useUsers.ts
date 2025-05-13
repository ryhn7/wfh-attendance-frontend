import { useQuery } from '@tanstack/react-query';
import { userService } from './user';
import { USER_QUERY_KEYS } from './user.keys';

/**
 * Hook for fetching all users
 * @param options Optional query options
 * @returns Query result containing users list data
 */
export const useUsers = (
    options?: {
        enabled?: boolean;
    }
) => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.all,
        queryFn: () => userService.getUsers(),
        enabled: options?.enabled !== false,
    });
};
