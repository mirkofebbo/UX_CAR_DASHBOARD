import React, { useState, useContext } from 'react';
import { SocketContext } from '../components/SocketContext';
import { io } from "socket.io-client";

import { Box, Button, TextField } from '@mui/material';
import FrameAnimation from '../components/FrameAnimation'

const ControlCenter = () => {

    const socket = useContext(SocketContext);
    const [message, setMessage] = useState("");
    const [saveData, setSaveData] = useState(false);

    const handleOpen = (path) => {
        window.open(path, '_blank');
    }

    // TRANSMITING MESSAGE
    const handleSend = () => {
        if (!socket.current) {
            socket.current = io('http://localhost:3000');
            socket.current.on('connect', () => {
                console.log('Connected to server, socket id:', socket.current.id);
            });
            socket.current.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        }
        socket.current.emit('customMessage', message); // Emit the message
        console.log('customMessage', message);
        setMessage('');  // clear the message input field
    }

    // DATA RECORDING  
    const handleSaveData = () => {
        setSaveData(true);
        socket.current.emit('startSaveData');
    }

    const handleStopSaveData = () => {
        setSaveData(false);
        socket.current.emit('stopSaveData');
    }

    return (
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Button onClick={() => handleOpen('/Dashboard')}>Dashboard</Button>
            <Button onClick={() => handleOpen('/LeftMirror')}>LeftMirror</Button>
            <Button onClick={() => handleOpen('/RightMirror')}>RightMirror</Button>
            <Button onClick={() => handleOpen('/ViewSonic')}>ViewSonic</Button>
            <Button onClick={() => handleOpen('/Hud')}>Hud</Button>
            <TextField value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter message..." />
            <Button onClick={handleSend}>Send Message</Button>
            {!saveData ? (
                <Button onClick={handleSaveData}>Start Saving Data</Button>
            ) : (
                <Button onClick={handleStopSaveData}>Stop Saving Data</Button>
            )}
            {/* <FrameAnimation size={100} animationName="animation_1" totalFrames={32} interval={100} /> */}
        </Box>
    );
};

export default ControlCenter;
