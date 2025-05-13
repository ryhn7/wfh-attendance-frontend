import { useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from './attendance';
import { CheckInRequest } from './attendance.types';
import { ATTENDANCE_QUERY_KEYS } from './attendance.keys';

/**
 * Hook for attendance-related operations
 */
export const useCheckIn = () => {
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
            queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.today() });
        },
    });

    return {
        checkInMutation
    };
};
