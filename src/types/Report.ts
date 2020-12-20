interface Report {
    id: string,
    reason: string,
    reportedId: string,
    reporterId: string,
    timestamp: number,
    adminNotes: string,
    handled: boolean
}

export default Report;