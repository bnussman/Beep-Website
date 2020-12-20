export interface Report {
    id: string,
    reason: string,
    reportedId: string,
    reporterId: string,
    timestamp: number,
    adminNotes: string,
    handled: boolean
}

export interface ReportData {
    report: Report;
    reported: User;
    reporter: User;
}

export interface User {
    id: string;
    first: string;
    last: string;
    username: string;
    photoUrl: string;
}
