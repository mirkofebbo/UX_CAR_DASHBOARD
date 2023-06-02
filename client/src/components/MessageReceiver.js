import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, CardHeader, Avatar } from '@mui/material';
import { SocketContext } from '../components/SocketContext';

const MessageReceiver = ({ size }) => {
    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState('AN'); // Set this to the sender's initials
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (socket && socket.current) {
            try {
                socket.current.on('connect', () => {
                    console.log('Connected to server, socket id:', socket.current.id);
                });
                socket.current.on('customMessage', (msg) => {
                    console.log(`Message received: ${msg}`);
                    setMessage(msg);
                    setVisible(true);
                    // Set a timer to hide the message after 6 seconds
                    setTimeout(() => {
                        setVisible(false);
                    }, 6000);
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
            socket.current.disconnect();
        };

    }, []);

    return (
        <Box>
            {message && visible &&
                <Card sx={{ width: `${size}px`}} style={{backgroundColor: "black"}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                {sender}
                            </Avatar>
                        }
                        title={message}
                    />
                </Card>
            }
        </Box>
    );
};

export default MessageReceiver;
