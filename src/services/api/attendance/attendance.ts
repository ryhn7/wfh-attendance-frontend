import { api } from '../index';
import { AttendanceRecord, CheckInRequest } from '../index';

/**
 * API endpoints for attendance feature
 */
const ENDPOINTS = {
    CHECK_IN: '/attendance/check-in',
    ATTENDANCE: '/attendance',
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
     * Get attendance record by ID
     * @param id Attendance ID
     * @returns API response with attendance record data
     */
    getAttendanceById: async (id: string) => {
        const response = await api.get<AttendanceRecord>(`${ENDPOINTS.ATTENDANCE}/${id}`);
        return response.data;
    }
};
