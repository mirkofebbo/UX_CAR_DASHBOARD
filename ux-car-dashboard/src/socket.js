import { io } from 'socket.io-client';


const socket = io('http://158.223.44.61:3000'); // Replace 'localhost:3000' with your server's address if needed

export default socket;
