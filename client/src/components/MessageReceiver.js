import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, CardHeader, Avatar, Snackbar } from '@mui/material';
import { SocketContext } from '../components/SocketContext';


const MessageReceiver = ({ size }) => {
    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [sender, setSender] = useState('AN'); // Set this to the sender's initials

    useEffect(() => {
        if (socket && socket.current) {
            try {
                socket.current.on('connect', () => {
                    console.log('Connected to server, socket id:', socket.current.id);
                });
                socket.current.on('customMessage', (msg) => {
                    console.log(`Message received: ${msg}`);
                    setMessage(msg);
                    setOpen(true);
                });
                socket.current.on('disconnect', () => {
                    console.log('Disconnected from server');
                });
            } catch (error) {
                console.log('Could not connect to server:', error);
            }
        }
    
        // clean up the effect
        return () => {
            console.log('Cleanup function in MessageReceiver');
            // socket.current.disconnect();
        };
    
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
                height: `${size}px`,    // IMG SIZE
                backgroundColor: 'none',
                left: `${-size / 2}px`,   // CENTERING 
                top: `${-size / 2}px`,    // CENTERING 
            }}
        >
            {message &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Card sx={{ width: 480, height: 120 }}>
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
