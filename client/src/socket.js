import { io } from 'socket.io-client';
import { SERVER_IP } from './config';


const socket = io(`http://${SERVER_IP}:3000`); // Replace 'localhost:3000' with your server's address if needed
//158.223.47.108
export default socket;
