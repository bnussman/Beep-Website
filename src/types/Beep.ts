interface Beep {
    id: string,
    beepersid: string,
    riderid: string,
    origin: string,
    destination: string,
    groupSize: number,
    isAccepted: boolean,
    state: number,
    timeEnteredQueue: number
    doneTime: number,
}

export default Beep;