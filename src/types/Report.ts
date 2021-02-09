import { User } from './User';

export interface Report {
    id: string;
    reason: string;
    reported: User;
    reporter: User;
    handledBy: User | null;
    timestamp: number;
    notes: string | null;
    handled: boolean;
    beep?: any;
}
