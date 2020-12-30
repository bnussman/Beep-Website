import User from './User';
export interface Report {
    id: string,
    reason: string,
    reportedId: string,
    reported: User,
    reporterId: string,
    reporter: User,
    timestamp: number,
    adminNotes: string,
    handled: boolean
}