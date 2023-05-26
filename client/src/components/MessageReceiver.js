import React, { useState, useEffect } from 'react';
import { Box, Card, CardHeader, Avatar, Snackbar } from '@mui/material';
import { io } from "socket.io-client";

let socket;

const MessageReceiver = ({size}) => {

    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [sender, setSender] = useState('AN'); // Set this to the sender's initials

    useEffect(() => {
        if (!socket) {
            try {
                socket = io("http://localhost:3000");
                socket.on('connect', () => {
                    console.log('Connected to server, socket id:', socket.id);
                });
                socket.on('customMessage', (msg) => {
                    console.log(`Message received: ${msg}`);
                    setMessage(msg);
                    setOpen(true);
                });
                socket.on('disconnect', () => {
                    console.log('Disconnected from server');
                });
            } catch (error) {
                console.log('Could not connect to server:', error);
            }
        }
        // clean up the effect
        return () => socket.disconnect();

    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: `${size}px`,     // IMG SIZE
                height: `${100}px`,    // IMG SIZE
                backgroundColor: 'none',
                left: `${-size / 2}px`,   // CENTERING 
                top: `${-100 / 2}px`,    // CENTERING 
            }}
        >
            {message &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Card  >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    {sender}
                                </Avatar>
                            }
                            title={message}
                            subheader="Received just now"
                        />
                    </Card>
                </Snackbar>
            }
        </Box>
    );
};

export default MessageReceiver;
