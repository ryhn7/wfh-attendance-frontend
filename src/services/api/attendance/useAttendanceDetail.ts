import { useQuery } from '@tanstack/react-query';
import { attendanceService } from './attendance';
import { ATTENDANCE_QUERY_KEYS } from './attendance.keys';

/**
 * Hook for fetching attendance detail by ID
 * @param id The ID of the attendance record to fetch
 * @param options Optional query options
 * @returns Query result containing attendance detail data
 */
export const useAttendanceDetail = (
    id: string,
    options?: {
        enabled?: boolean;
    }
) => {
    return useQuery({
        queryKey: ATTENDANCE_QUERY_KEYS.detail(id),
        queryFn: () => attendanceService.getAttendanceById(id),
        enabled: options?.enabled !== false && !!id,
    });
};
