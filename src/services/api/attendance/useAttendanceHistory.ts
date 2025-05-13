import { useQuery } from "@tanstack/react-query";
import { attendanceService } from "./attendance";
import { ATTENDANCE_QUERY_KEYS } from "./attendance.keys";


/**
 * Custom hook to fetch attendance history
 * @returns Query result with attendance history data
 */

export const useAttendanceHistory = () => {
    return useQuery({
        queryKey: ATTENDANCE_QUERY_KEYS.history(),
        queryFn: attendanceService.getAttendanceHistory,
    });
};