import { User } from './User';

export interface Report {
    id: string;
    reason: string;
    reportedId: string;
    reported: User;
    reporterId: string;
    reporter: User;
    handledBy: User | null;
    timestamp: number;
    notes: string | null;
    handled: boolean;
    beepEventId: string | undefined | null;
}
