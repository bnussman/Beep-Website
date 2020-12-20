interface Beeper {
    id: string,
    first: string,
    last: string,
    photoUrl: string,
    capacity: number,
    queueSize: number,
    groupRate: number,
    queuSize: number,
    singlesRate: number,
    isStudent: boolean,
    masksRequired: boolean,
    userLevel: number
}

export default Beeper;