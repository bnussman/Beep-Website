export const config = {
    apiUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/api' : 'https://ridebeep.app/api'),
    baseUrl: (process.env.NODE_ENV === 'production' ? 'https://ridebeep.app/' : 'https://dev.ridebeep.app/')
};
