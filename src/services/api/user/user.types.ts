import { z } from 'zod';

/**
 * User role enum
 */
export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLOYEE = 'EMPLOYEE',
}

/**
 * User schema
 */
export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.nativeEnum(UserRole),
    createdAt: z.string().transform(str => new Date(str)),
    updatedAt: z.string().transform(str => new Date(str)),
});

/**
 * User list schema
 */
export const userListSchema = z.array(userSchema);

/**
 * Single user type
 */
export type User = z.infer<typeof userSchema>;

/**
 * User list type
 */
export type UserList = z.infer<typeof userListSchema>;

/**
 * Add user request
 */
export const addUserRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    role: z.nativeEnum(UserRole),
});

export type AddUserRequest = z.infer<typeof addUserRequestSchema>;

/**
 * Update user request
 */
export const updateUserRequestSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
