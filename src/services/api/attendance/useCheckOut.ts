import { useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from './attendance';
import { CheckOutRequest } from './attendance.types';
import { ATTENDANCE_QUERY_KEYS } from './attendance.keys';

/**
 * Hook for attendance-related operations
 */

export const useCheckOut = (id: string) => {
    const queryClient = useQueryClient();

    /**
     * Check-out mutation for handling user attendance check-out
     */
    const checkOutMutation = useMutation({
        mutationKey: ATTENDANCE_QUERY_KEYS.checkOut(id),
        mutationFn: (data: CheckOutRequest) => {
            if (!id) throw new Error('Attendance ID is missing')
            return attendanceService.checkOut(data, id)
        },
        onSuccess: () => {
            // Invalidate relevant queries when check-out is successful
            queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.today() });
            queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEYS.detail(id) });
        },
    });

    return {
        checkOutMutation,
    };
}