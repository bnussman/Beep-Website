export const config = {
    apiUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/v1' : 'https://dev.ridebeep.app/v1'),
    baseUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/' : 'https://dev.ridebeep.app/')
};
