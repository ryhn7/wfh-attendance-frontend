/**
 * Attendance API response types
 */

export interface AttendanceRecord {
    id: string;
    userId: string;
    user?: UserInfo
    date: string;
    checkInTime: string;
    checkOutTime: string | null;
    checkInPhotoUrl: string;
    checkOutPhotoUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Check-in request payload
 */
export interface CheckInRequest {
    photo: File;
}

/**
 * Check-out request payload
 */
export interface CheckOutRequest {
    photo: File;
}

/** 
 * User information interface
 */
export interface UserInfo {
    email: string;
    name: string;

}