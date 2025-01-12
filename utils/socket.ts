import { io } from 'socket.io-client';
import { toast } from './toast';


const SOCKET_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

interface SocketOptions {
    transports: string[];
    reconnectionAttempts: number;
    auth?: {
        user_id?: string;
        session?: string;
        department?: string;
    };
}

const createSocket = () => {
    const options: SocketOptions = {
        transports: ['websocket'],
        reconnectionAttempts: 3,
    };

    const socket = io(SOCKET_URL, options);

    socket.on('connect_error', (err) => {
        console.error('Connection Error:', err.message);
        toast('Unable to connect to the server.');
    });

    socket.on('reconnect_attempt', (attempt) => {
        console.log(`Reconnection attempt ${attempt}`);
    });

    return socket;
};

export default createSocket;