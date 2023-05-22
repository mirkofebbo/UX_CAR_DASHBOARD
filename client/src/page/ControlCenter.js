import React, { useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { io } from "socket.io-client";

let socket;

const ControlCenter = () => {

    const [message, setMessage] = React.useState('');

    const handleOpen = (path) => {
        window.open(path, '_blank');
    }

    useEffect(() => {
        socket = io("http://localhost:3000");
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        socket.emit('customMessage', message);
        setMessage('');
    }

    return (
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button onClick={() => handleOpen('/Dashboard')}>Dashboard</Button>
            <Button onClick={() => handleOpen('/SideMirror')}>SideMirror</Button>
            <Button onClick={() => handleOpen('/ViewSonic')}>ViewSonic</Button>
            <Button onClick={() => handleOpen('/Hud')}>Hud</Button>
            <TextField value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message..." />
            <Button onClick={handleSendMessage}>Send Message</Button>
        </Box>
    );
};

export default ControlCenter;
