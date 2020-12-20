interface User {
    id?: string,
    first: string,
    last: string,
    username?: string,
    email?: string,
    isEmailVerified?: boolean,
    phone?: string,
    userLevel: number,
    capcity: number,
    isStudent: boolean,
    masksRequired: boolean,
    queueSize: number
    singlesRate: number,
    groupRate: number,
    venmo: string,
    isBeeping: boolean,
    photoUrl: string
}

export default User;