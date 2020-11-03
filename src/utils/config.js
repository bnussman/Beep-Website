export const config = {
    apiUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/api' : 'https://dev.ridebeep.app/api'),
    baseUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/' : 'https://dev.ridebeep.app/')
};
