import { api, CheckOutRequest } from '../index';
import { AttendanceRecord, CheckInRequest } from '../index';

/**
 * API endpoints for attendance feature
 */
const ENDPOINTS = {
    CHECK_IN: '/attendance/check-in',
    ATTENDANCES: '/attendance/',
    ATTENDANCE: '/attendance',
    TODAY: '/attendance/today',
    CHECK_OUT: '/attendance/check-out',
    HISTORY: '/attendance/history',
};

/**
 * Attendance service for handling attendance-related API calls
 */
export const attendanceService = {
    /**
     * Check in with a photo
     * @param data Check-in request with photo
     * @returns API response with attendance record data
     */
    checkIn: async (data: CheckInRequest) => {
        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('photo', data.photo);

        // Configure axios to handle FormData
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await api.post<AttendanceRecord>(
            ENDPOINTS.CHECK_IN,
            formData,
            config
        );

        return response.data;
    },

    /**
     * Check out with a photo
     * @param data Check-out request with photo
     * @returns API response with attendance record data
     */
    checkOut: async (data: CheckOutRequest, id: string) => {
        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('photo', data.photo);

        // Configure axios to handle FormData
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = await api.post<AttendanceRecord>(
            `${ENDPOINTS.CHECK_OUT}/${id}`,
            formData,
            config
        );

        return response.data;
    },

    /**
     * Get attendance record by ID
     * @param id Attendance ID
     * @returns API response with attendance record data
     */
    getAttendanceById: async (id: string) => {
        const response = await api.get<AttendanceRecord>(`${ENDPOINTS.ATTENDANCE}/${id}`);
        return response.data;
    },

    /**
     * Get today's attendance record for the current user
     * @returns API response with today's attendance record data
     */
    getTodayAttendance: async () => {
        const response = await api.get<AttendanceRecord>(ENDPOINTS.TODAY);
        return response.data;
    },

    /**
     * Get all attendance records
     * @returns API response with list of attendance records
     */
    getAllAttendances: async (): Promise<AttendanceRecord[]> => {
        const response = await api.get<AttendanceRecord[]>(ENDPOINTS.ATTENDANCES);
        return response.data.data;
    },

    /**
     * Get attendance history for the current user
     * @returns API response with attendance history data
     */
    getAttendanceHistory: async () => {
        const response = await api.get<AttendanceRecord[]>(ENDPOINTS.HISTORY);
        return response.data.data;
    },
};
