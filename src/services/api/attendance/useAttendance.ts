import { useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from './attendance';
import { CheckInRequest } from './attendance.types';

/**
 * Query keys for attendance feature
 */
export const ATTENDANCE_QUERY_KEYS = {
    all: ['attendance'] as const,
    checkIn: () => [...ATTENDANCE_QUERY_KEYS.all, 'check-in'] as const,
    detail: (id: string) => [...ATTENDANCE_QUERY_KEYS.all, 'detail', id] as const,
};

/**
 * Hook for attendance-related operations
 */
export const useAttendance = () => {
    const queryClient = useQueryClient();

    /**
     * Check-in mutation for handling user attendance check-in
     */
    const checkInMutation = useMutation({
        mutationKey: ATTENDANCE_QUERY_KEYS.checkIn(),
        mutationFn: (data: CheckInRequest) => attendanceService.checkIn(data),
        onSuccess: () => {
            // Invalidate relevant queries when check-in is successful
            queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.all });
        },
    });

    return {
        checkInMutation
    };
};
