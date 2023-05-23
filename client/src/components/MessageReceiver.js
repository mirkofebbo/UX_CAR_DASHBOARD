import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { io } from "socket.io-client";

let socket;

const MessageReceiver = () => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!socket) {
            socket = io("http://localhost:3000");
            socket.on('connect', () => {
                console.log('Connected to server, socket id:', socket.id);
            });
            socket.on('customMessage', (msg) => {
                console.log(`Message received: ${msg}`);
                setMessage(msg);
            });
            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }

        // clean up the effect
        return () => socket.disconnect();

    }, []);

    return (
        <Box>
            <Typography variant="h3">Received Message:</Typography>
            <Typography variant="h5">{message}</Typography>
        </Box>
    );
};

export default MessageReceiver;
