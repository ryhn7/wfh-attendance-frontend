/**
 * Query keys for attendance feature
 */
export const ATTENDANCE_QUERY_KEYS = {
    all: ['attendance'] as const,
    checkIn: () => [...ATTENDANCE_QUERY_KEYS.all, 'check-in'] as const,
    checkOut: (id: string) => [...ATTENDANCE_QUERY_KEYS.all, 'check-out', id] as const,
    detail: (id: string) => [...ATTENDANCE_QUERY_KEYS.all, 'detail', id] as const,
    today: () => [...ATTENDANCE_QUERY_KEYS.all, 'today'] as const,
};