import { useQuery } from "@tanstack/react-query";
import { attendanceService } from "./attendance";
import { ATTENDANCE_QUERY_KEYS } from "./attendance.keys";

/**
 * Custom hook to fetch today's attendance record for the current user
 * @returns Query result with today's attendance data
 */
export const useAttendanceToday = () => {
    return useQuery({
        queryKey: ATTENDANCE_QUERY_KEYS.today(),
        queryFn: async () => {
            const response = await attendanceService.getTodayAttendance();
            return response.data;
        },
    });
};

export default useAttendanceToday;
