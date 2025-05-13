import { useQuery } from '@tanstack/react-query';
import { userService } from './user';
import { USER_QUERY_KEYS } from './user.keys';

/**
 * Hook for fetching a single user by ID
 * @param id The ID of the user to fetch
 * @param options Optional query options
 * @returns Query result containing user data
 */
export const useUser = (
    id: string,
    options?: {
        enabled?: boolean;
    }
) => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.user(id),
        queryFn: () => userService.getUserById(id),
        enabled: options?.enabled !== false && !!id,
    });
};
