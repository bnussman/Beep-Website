export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

export interface User {
    id?: string,
    first: string,
    last: string,
    username?: string,
    email?: string,
    isEmailVerified?: boolean,
    phone?: string,
    role: UserRole,
    capacity: number,
    isStudent: boolean,
    masksRequired: boolean,
    queueSize: number
    singlesRate: number,
    groupRate: number,
    venmo: string,
    isBeeping: boolean,
    photoUrl: string
}