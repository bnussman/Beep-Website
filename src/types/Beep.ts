import User from '../types/User';
export interface BeepEntry {
    beep: Beep;
    rider: User;
    beeper: User;
}

export interface Beep {
    id: string;
    beeper: User;
    rider: User;
    origin: string;
    destination: string;
    groupSize: number;
    isAccepted: boolean;
    state: number;
    timeEnteredQueue: number;
    doneTime: number;
}
