/**
 * Query keys for user feature
 */
export const USER_QUERY_KEYS = {
    all: ['users'] as const,
    detail: (id: string) => [...USER_QUERY_KEYS.all, 'user', id] as const,
    add: () => [...USER_QUERY_KEYS.all, 'add'] as const,
    update: (id: string) => [...USER_QUERY_KEYS.all, 'update', id] as const,
    delete: (id: string) => [...USER_QUERY_KEYS.all, 'delete', id] as const,
};
