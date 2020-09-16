import io from 'socket.io-client';
import { config } from './config';

const socket = io(config.baseUrl, { transports: ['websocket'] });

export default socket

export function getUpdatedUser (existingUser, newData) {
    for (const key in newData) {
        if (existingUser[key] && (existingUser[key] !== newData[key])) {
            console.log("Updated", key);
            existingUser[key] = newData[key];
        }
    }
    return existingUser;
}
