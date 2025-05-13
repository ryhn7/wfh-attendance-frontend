import { useQuery } from "@tanstack/react-query";
import { attendanceService } from "./attendance";
import { ATTENDANCE_QUERY_KEYS } from "./attendance.keys";

/**
 * Custom hook to fetch all attendance records
 * @returns Query result with attendance data
*/

export const useAttendances = () => {
    return useQuery({
        queryKey: ATTENDANCE_QUERY_KEYS.all,
        queryFn: attendanceService.getAllAttendances,
    });
};
